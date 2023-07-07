package services

import database.DatabaseContext
import database.generated.public._
import enums.SurveyEventType
import models._
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SurveyResultsService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends QuestionnaireSurveyResultsServiceActions
    with ScenarioSurveyResultsServiceActions
    with SurveyServiceActions
    with DefaultAllSurveyInvitation
    with DefaultAllProjectModule
    with DefaultFindProjectModule
    with ProjectModuleServiceActions {
  val context = databaseContext

  import context._

  def overview(surveyId: UUID): Future[SurveyResultsOverview] =
    performIO(resultsForSurveyAction(surveyId)).map { participantScores =>
      val scoresSum = participantScores.map(ps => ps.projectModuleScores.map(_.score).sum).sum
      val averageScore =
        if (participantScores.nonEmpty) Some(BigDecimal(scoresSum) / participantScores.length)
        else None
      val maximumScoresSum = participantScores.headOption
        .map(_.projectModuleScores.map(_.maximumScore).sum)
        .getOrElse(0)
      val participantResults = participantScores.map { participantScore =>
        val score = participantScore.projectModuleScores.map(_.score).sum
        ParticipantResult(
          surveyInvitationId = participantScore.surveyInvitationId,
          participantName = participantScore.participantName,
          score = score,
          isComplete = participantScore.isComplete
        )
      }
      val projectModuleScores = participantScores.flatMap(_.projectModuleScores)
      val scenarioScores = projectModuleScores.collect { case score: ScenarioScore => score }
      val questionnaireScores = projectModuleScores.collect { case score: QuestionnaireScore => score }
      val scenarioScoresPerScenario = scenarioScores.groupBy(_.scenarioId)
      val questionnaireScoresPerQuestionnaire = questionnaireScores.groupBy(_.questionnaireId)

      val projectModuleResults = (scenarioScoresPerScenario ++ questionnaireScoresPerQuestionnaire).values.map {
        projectModuleScoresPerProjectModule =>
          val maximumScore = projectModuleScoresPerProjectModule.head.maximumScore
          val scores = projectModuleScoresPerProjectModule.map(_.score)
          val averageScore =
            if (scores.nonEmpty) BigDecimal(scores.sum) / scores.length
            else BigDecimal(0)
          val (scenarioId, questionnaireId) = projectModuleScoresPerProjectModule.head match {
            case score: ScenarioScore => (Some(score.scenarioId), None)
            case score: QuestionnaireScore => (None, Some(score.questionnaireId))
          }

          ProjectModuleResult(
            scenarioId = scenarioId,
            questionnaireId = questionnaireId,
            averageScore = averageScore,
            maximumScore = maximumScore,
            isComplete = projectModuleScoresPerProjectModule.forall(_.isComplete)
          )
      }.toSeq

      SurveyResultsOverview(
        surveyId = surveyId,
        participantResults = participantResults,
        projectModuleResults = projectModuleResults,
        averageScore = averageScore,
        maximumScore = maximumScoresSum,
        areResultsComplete = projectModuleResults.forall(_.isComplete)
      )
    }

  def resultsForSurveyAction(surveyId: UUID): IO[Seq[ParticipantScore], Effect.Read] =
    (for {
      survey <- findSurveyWithoutUserAccountAction(surveyId).flatMap(liftIOOrFail(EntityNotFound))
      projectModules <- allProjectModulesAction(survey.projectId)
      surveyInvitations <- allSurveyInvitationsAction(surveyId)
      surveyEvents <- allSurveyEventsForSurveyAction(surveyId)
    } yield {
      val participantNames = retrieveParticipantNames(surveyEvents)

      IO
        .sequence(surveyInvitations.map { invitation =>
          val projectModuleScoresAction = projectModules.map(pm =>
            (pm.scenarioId, pm.questionnaireId) match {
              case (Some(scenarioId), _) =>
                scenarioFinalScoreAction(surveyId, invitation.id, scenarioId)
              case (_, Some(questionnaireId)) =>
                questionnaireFinaleScoreAction(surveyId, invitation.id, questionnaireId)
              case _ =>
                IO.failed(new Throwable("Unsupported project module"))
            })
          IO.sequence(projectModuleScoresAction)
            .map { projectModuleScores =>
              ParticipantScore(
                invitation.id,
                participantNames.get(invitation.id),
                isComplete = projectModuleScores.forall(_.isComplete),
                projectModuleScores
              )
            }
        })
    }).flatMap(identity)

  def projectModuleResults(surveyId: UUID, projectModuleId: UUID): Future[ProjectModuleResults] =
    performIO(projectModuleResultsAction(surveyId, projectModuleId))

  def projectModuleResultsAction(surveyId: UUID, projectModuleId: UUID): IO[ProjectModuleResults, Effect.Read] =
    for {
      projectModule <- findProjectModuleAction(projectModuleId).flatMap(liftIOOrFail(EntityNotFound))
      surveyInvitations <- allSurveyInvitationsAction(surveyId)
      surveyEvents <- allSurveyEventsForSurveyAction(surveyId)
      projectModuleScores <- IO.sequence(
        surveyInvitations
          .map { invitation =>
            ((projectModule.scenarioId, projectModule.questionnaireId) match {
              case (Some(scenarioId), _) =>
                scenarioFinalScoreAction(surveyId, invitation.id, scenarioId)
              case (_, Some(questionnaireId)) =>
                questionnaireFinaleScoreAction(surveyId, invitation.id, questionnaireId)
              case _ =>
                IO.failed(new Throwable("Unsupported project module"))
            }).map((invitation.id, _))
          })
    } yield {
      val participantNames = retrieveParticipantNames(surveyEvents)
      val participantResults = projectModuleScores
        .map { case (invitationId, projectModuleScore) =>
          ParticipantProjectModuleResult(
            surveyInvitationId = invitationId,
            participantName = participantNames.get(invitationId),
            score = Some(projectModuleScore.score)
          )
        }
      val scores = projectModuleScores.map { case (_, projectModuleScore) => projectModuleScore.score }
      val averageScore =
        if (scores.nonEmpty) Some(BigDecimal(scores.sum) / scores.length)
        else None
      val maximumScore = projectModuleScores.headOption
        .map { case (_, projectModuleScore) => projectModuleScore.maximumScore }
        .getOrElse(0) // TODO: maximum score should always be available

      ProjectModuleResults(
        projectModuleId = projectModuleId,
        participantResults = participantResults,
        averageScore = averageScore,
        maximumScore = maximumScore
      )
    }

  def participantResults(surveyId: UUID, invitationId: UUID): Future[ParticipantResults] =
    performIO(participantResultsAction(surveyId, invitationId))

  def participantResultsAction(surveyId: UUID, invitationId: UUID): IO[ParticipantResults, Effect.Read] =
    allProjectModulesForSurveyInvitationAction(invitationId)
      .flatMap(projectModules =>
        IO.sequence(projectModules.map(pm =>
          (pm.scenarioId, pm.questionnaireId) match {
            case (Some(scenarioId), _) =>
              scenarioFinalScoreAction(surveyId, invitationId, scenarioId)
            case (_, Some(questionnaireId)) =>
              questionnaireFinaleScoreAction(surveyId, invitationId, questionnaireId)
            case _ =>
              IO.failed(new Throwable("Unsupported project module"))
          })))
      .map(projectModuleScores => ParticipantResults(invitationId, projectModuleScores))

  private def retrieveParticipantNames(surveyEvents: Seq[SurveyEvent]) =
    surveyEvents
      .filter(_.eventType == SurveyEventType.StoreParticipantData)
      .collect { case SurveyEvent(_, eventType, Some(data), _, _, Some(invitationId)) =>
        SurveyEventService.decodeData(data, eventType).map(data => (invitationId, data))
      }
      .collect { case Right((invitationId, eventData: StoreParticipantData)) => (invitationId, eventData) }
      .toMap
      .view
      .mapValues(eventData => s"${eventData.firstName} ${eventData.lastName}")
}
