package services

import database.DatabaseContext
import database.generated.public.{QuestionnaireAnswer, QuestionnaireQuestion, SurveyEvent}
import enums.SurveyEventType
import models._
import services.SurveyEventService.toDecodedSurveyEvent
import services.actions.AllSurveyEvent
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class RuntimeSurveyResultsService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends ScenarioQuestionnaireServiceActions
    with DefaultAllQuestionnaireQuestion
    with DefaultAllQuestionnaireAnswer
    with QuestionnaireQuestionServiceActions
    with DefaultAllSurveyInvitation
    with AllSurveyEvent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def overview(surveyId: UUID, scenarioId: UUID): Future[Seq[RuntimeSurveyResult]] = {
    val dataAction = for {
      questionnaireIds <- runIO(runtimeSurveyQuestionnairesForScenarioQuotation(scenarioId).map(_.id))
      questions <- IO.traverse(questionnaireIds)(allQuestionnaireQuestionsAction).map(_.flatten)
      answers <- IO.traverse(questions.map(_.id))(allQuestionnaireAnswersAction).map(_.flatten)
      surveyInvitationIds <- runIO(allSurveyInvitationsQuotation(surveyId).map(_.id))
      answerSurveyEvents <- runIO(selectedAnswersSurveyEventsForScenarioQuotation(surveyId, scenarioId))
      endEventSurveyEvents <- endEventSurveyEventsAction(surveyId, scenarioId)
    } yield (questionnaireIds, questions, answers, surveyInvitationIds, answerSurveyEvents, endEventSurveyEvents)

    val action = dataAction.map {
      case (questionnaireIds, questions, answers, surveyInvitationIds, answerSurveyEvents, endEventSurveyEvents) =>
        val questionsByQuestionnaire = questions.groupBy(_.questionnaireId)
        val answersByQuestion = answers.groupBy(_.questionId)
        val answerSurveyEventsByParticipant = answerSurveyEvents
          .groupBy(_.invitationId)
          .collect { case (Some(invitationId), events) => invitationId -> events }
        val decodedEndEventSurveyEvents = endEventSurveyEvents.flatMap(toDecodedSurveyEvent(_).toOption)

        questionnaireIds.map { questionnaireId =>
          val completedParticipantIds = decodedEndEventSurveyEvents.collect {
            case DecodedSurveyEvent(_, _, data: EndEvent, _, _, Some(invitationId))
                if data.questionnaireId == questionnaireId =>
              invitationId
          }
          val questionResults = questionsByQuestionnaire
            .getOrElse(questionnaireId, Nil)
            .map(question =>
              createClosedQuestionResult(
                surveyInvitationIds,
                answerSurveyEventsByParticipant,
                answersByQuestion.getOrElse(question.id, Nil),
                question))

          RuntimeSurveyResult(
            questionnaireId = questionnaireId,
            participantIds = surveyInvitationIds,
            completedParticipantIds = completedParticipantIds,
            questionResults = questionResults
          )
        }
    }

    performIO(action)
  }

  private def createClosedQuestionResult(
      surveyInvitationIds: Seq[UUID],
      answerSurveyEventsByParticipant: Map[UUID, Seq[SurveyEvent]],
      answers: Seq[QuestionnaireAnswer],
      question: QuestionnaireQuestion) = {
    val answerSelectionsPerParticipant = surveyInvitationIds
      .map(surveyInvitationId =>
        surveyInvitationId ->
          selectedAnswersForParticipant(
            question,
            answerSurveyEventsByParticipant.getOrElse(surveyInvitationId, Nil).sortBy(_.index)))
      .toMap

    val allAnswerSelections = answerSelectionsPerParticipant.values
    val answerIdSelectionCounts =
      allAnswerSelections.flatMap(_.selectedAnswerIds).groupBy(identity).view.mapValues(_.size).toMap
    val freetextAnswerSelectionCount = allAnswerSelections.count(_.wasFreetextAnswerSelected == true)
    val closedAnswerSelections = answers
      .map { answer =>
        val selectionsCount = answerIdSelectionCounts.getOrElse(answer.id, 0)
        RuntimeSurveyAnswerSelection(
          answerId = Some(answer.id),
          isFreetextAnswer = false,
          selectionsCount = selectionsCount,
          selectionsAsPercent =
            if (surveyInvitationIds.nonEmpty) selectionsCount.toDouble / surveyInvitationIds.length else 0
        )
      }
    val freetextAnswerSelection = RuntimeSurveyAnswerSelection(
      answerId = None,
      isFreetextAnswer = true,
      selectionsCount = freetextAnswerSelectionCount,
      selectionsAsPercent =
        if (surveyInvitationIds.nonEmpty) freetextAnswerSelectionCount.toDouble / surveyInvitationIds.length else 0
    )
    val answerSelections = closedAnswerSelections :+ freetextAnswerSelection

    val participantResults = surveyInvitationIds.map { surveyInvitationId =>
      val answerSelection = answerSelectionsPerParticipant.get(surveyInvitationId)
      RuntimeSurveyParticipantResult(
        invitationId = surveyInvitationId,
        selectedAnswerIds = answerSelection.map(_.selectedAnswerIds).getOrElse(Nil),
        wasFreetextAnswerSelected = answerSelection.exists(_.wasFreetextAnswerSelected)
      )
    }

    RuntimeSurveyQuestionResult(
      questionId = question.id,
      answerSelections = answerSelections,
      participantResults = participantResults
    )
  }

  private def selectedAnswersSurveyEventsForScenarioQuotation(surveyId: UUID, scenarioId: UUID) =
    quote(
      allSurveyEventsForScenarioQuotation(surveyId, scenarioId)
        .filter(surveyEvent =>
          liftQuery(selectedAnswersForParticipantSurveyEventTypes).contains(surveyEvent.eventType)))

  private def endEventSurveyEventsAction(surveyId: UUID, scenarioId: UUID) =
    runIO(
      allSurveyEventsForScenarioQuotation(surveyId, scenarioId)
        .filter(_.eventType == lift(SurveyEventType.EndEvent: SurveyEventType)))
}
