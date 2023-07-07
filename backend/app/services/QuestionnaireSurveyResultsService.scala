package services

import database.DatabaseContext
import database.generated.public._
import enums.QuestionType.{FreeText, MultipleChoice, SingleChoice}
import enums.{QuestionScoringType, QuestionType, SurveyEventType}
import models._
import services.SurveyEventService.toDecodedSurveyEvent
import services.actions.AllSurveyEvent
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class QuestionnaireSurveyResultsService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends QuillUtils
    with QuestionnaireSurveyResultsServiceActions {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def answeredQuestionsForQuestionnaire(questionnaireId: UUID, surveyInvitationId: UUID): Future[Seq[UUID]] =
    performIO(for {
      closedQuestions <- runIO(
        allQuestionnaireQuestionsQuotation(questionnaireId)
          .filter(_.questionType != lift(QuestionType.FreeText: QuestionType)))
      answeredClosedQuestionIds <- IO
        .sequence(closedQuestions.map(question =>
          selectedAnswersForParticipantAndQuestionAction(question, surveyInvitationId).map(answerSelection =>
            (question.id, answerSelection.selectedAnswerIds.nonEmpty || answerSelection.wasFreetextAnswerSelected))))
        .map(_.collect { case (questionId, hasSelectedAnswers) if hasSelectedAnswers => questionId })
      answeredFreetextQuestionIds <- runIO(freeTextAnswerForParticipantQuotation(surveyInvitationId))
        .map(surveyEvents =>
          surveyEvents
            .flatMap(toDecodedSurveyEvent(_).toOption.map(_.data))
            .collect { case data: UpdateQuestionnaireFreeTextAnswer => data.questionId }
            .distinct)
    } yield answeredClosedQuestionIds ++ answeredFreetextQuestionIds)

  def freetextAnswersForQuestionnaire(questionnaireId: UUID, surveyId: UUID): Future[Seq[FreetextAnswer]] =
    performIO(
      for {
        questions <- allQuestionnaireQuestionsAction(questionnaireId)
        surveyEvents <- allSurveyEventsForQuestionnaireAction(surveyId, questionnaireId)
      } yield createFreetextAnswersForQuestionnaire(
        questions,
        filterQuestionnaireSurveyEventsForFreetextAnswer(surveyEvents)))

  def questionnaireFinaleScore(surveyId: UUID, invitationId: UUID, questionnaireId: UUID): Future[QuestionnaireScore] =
    performIO(questionnaireFinaleScoreAction(surveyId, invitationId, questionnaireId))

  def intermediateQuestionScore(
      question: QuestionnaireQuestion,
      allAnswersForQuestion: Seq[QuestionnaireAnswer],
      participantSelectedAnswers: Seq[UUID],
      freeTextQuestionRatingOption: Option[FreetextQuestionRating],
      criteria: Seq[FreetextQuestionCodingCriterion],
      criterionSelection: Seq[FreetextQuestionRatingCriterionSelection]) =
    if (question.scoringType == QuestionScoringType.None)
      if (question.questionType == QuestionType.FreeText)
        QuestionIntermediateScoreFreeText(ScoreTuple(Some(0), 0), Nil, noCriterionFulfilled = false)
      else
        QuestionIntermediateScoreClosed(ScoreTuple(Some(0), 0), Nil)
    else
      question.questionType match {
        case SingleChoice | MultipleChoice =>
          val score =
            calculateSingleOrMultipleChoiceQuestionScore(question, allAnswersForQuestion, participantSelectedAnswers)
          val maximumScore = calculateSingleOrMultipleChoiceQuestionMaximumScore(question)
          val scoreTuple = ScoreTuple(score = Some(score), maximumSore = maximumScore)
          QuestionIntermediateScoreClosed(scoreTuple, participantSelectedAnswers)

        case FreeText =>
          val score = freeTextQuestionRatingOption
            .flatMap(calculateFreetextQuestionScore(_, criteria, criterionSelection))
          val maximumScore = calculateFreetextQuestionMaximumScore(criteria, question.scoringType)
          val scoreTuple = ScoreTuple(score = score, maximumSore = maximumScore)
          QuestionIntermediateScoreFreeText(
            scoreTuple = scoreTuple,
            selectedCriteriaIds = criterionSelection.map(_.criterionId),
            noCriterionFulfilled = freeTextQuestionRatingOption.exists(_.noCriterionFulfilled)
          )
      }

  def participantsQuestionnaireResult(
      surveyId: UUID,
      questionnaireId: UUID): Future[Seq[ParticipantQuestionnaireSurveyResult]] =
    performIO(for {
      invitationIds <- runIO(allSurveyInvitationsQuotation(surveyId).map(_.id))
      questions <- allQuestionnaireQuestionsAction(questionnaireId)
      answers <- allAnswersForQuestionnaireAction(questionIds = questions.map(_.id))
      selectedAnswerEvents <- selectedAnswersForSurveyAction(surveyId)
      freeTextCriterion <- allFreetextQuestionnaireCodingCriteriaAction(questionIds = questions.map(_.id))
      rating <- findFinalScoreRatingAction(surveyId)
      allFreeTextRatings <- allFreetextQuestionRatingsAction(rating.get.id)
      criterionSelections <- runIO(
        query[FreetextQuestionRatingCriterionSelection]
          .filter(selection => liftQuery(allFreeTextRatings.map(_.id)).contains(selection.freetextQuestionRatingId)))
      surveyEvents <-
        allSurveyEventsForQuestionnaireAction(surveyId, questionnaireId)
    } yield {
      val freeTextAnswers =
        createFreetextAnswersForQuestionnaire(questions, filterQuestionnaireSurveyEventsForFreetextAnswer(surveyEvents))
      val intermediateResults = invitationIds.map { invitationId =>
        invitationId -> questions.map { question =>
          val allAnswersForQuestion = answers.filter(_.questionId == question.id)
          val participantSelectedAnswers = selectedAnswersForParticipant(
            question,
            selectedAnswerEvents.filter(_.invitationId.get == invitationId).sortBy(_.index)).selectedAnswerIds

          val criteria = freeTextCriterion.filter(_.questionId == question.id)
          val freeTextQuestionRatingOption = allFreeTextRatings.find(rating =>
            rating.surveyInvitationId == invitationId && rating.questionId == question.id)
          val criterionSelection =
            criterionSelections.filter(criterion =>
              freeTextQuestionRatingOption.map(_.id).contains(criterion.freetextQuestionRatingId))

          val intermediateScore = intermediateQuestionScore(
            question = question,
            allAnswersForQuestion = allAnswersForQuestion,
            participantSelectedAnswers = participantSelectedAnswers,
            freeTextQuestionRatingOption = freeTextQuestionRatingOption,
            criteria = criteria,
            criterionSelection = criterionSelection
          )

          question.id -> ParticipantQuestionSurveyResult(
            questionId = question.id,
            score = intermediateScore.scoreTuple.score.getOrElse(0),
            maximumScore = intermediateScore.scoreTuple.maximumSore,
            averageScore = -1,
            selectedAnswerIds = participantSelectedAnswers,
            selectedCriteriaIds = criterionSelection.map(_.criterionId),
            noCriterionFulfilled = freeTextQuestionRatingOption.exists(_.noCriterionFulfilled),
            freetextAnswer = freeTextAnswers
              .find(freeTextAnswer =>
                freeTextAnswer.questionId == question.id && freeTextAnswer.surveyInvitationId == invitationId)
              .map(_.text)
              .getOrElse("")
          )
        }.toMap
      }.toMap

      val averageScores = questions
        .map(question =>
          question.id -> BigDecimal(
            invitationIds.map(invitationId => intermediateResults(invitationId)(question.id).score).sum) / BigDecimal(
            invitationIds.length))
        .toMap

      invitationIds.map(invitationId =>
        ParticipantQuestionnaireSurveyResult(
          surveyInvitationId = invitationId,
          questionnaireId = questionnaireId,
          questionResults = questions.map { question =>
            val result = intermediateResults(invitationId)(question.id)
            ParticipantQuestionSurveyResult(
              questionId = question.id,
              score = result.score,
              maximumScore = result.maximumScore,
              averageScore = averageScores(question.id),
              selectedAnswerIds = result.selectedAnswerIds,
              selectedCriteriaIds = result.selectedCriteriaIds,
              noCriterionFulfilled = result.noCriterionFulfilled,
              freetextAnswer = result.freetextAnswer
            )
          }
        ))
    })
}

trait QuestionnaireSurveyResultsServiceActions
    extends DefaultAllQuestionnaireQuestion
    with DefaultAllQuestionnaireAnswer
    with QuestionnaireQuestionServiceActions
    with RatingServiceActions
    with FreetextQuestionRatingCriterionSelectionServiceActions
    with DefaultAllFreetextQuestionCodingCriterion
    with AllSurveyEvent
    with DefaultAllSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createFreetextAnswersForQuestionnaire(questions: Seq[QuestionnaireQuestion], surveyEvents: Seq[SurveyEvent]) = {
    case class Item(invitationId: UUID, questionId: UUID, index: Int, data: UpdateQuestionnaireFreeTextAnswer)

    val decodedEvents = surveyEvents.flatMap(toDecodedSurveyEvent(_).toOption)
    val updateTextEvents = decodedEvents.filter(_.eventType == SurveyEventType.UpdateQuestionnaireFreeTextAnswer)
    val selectionEvents = decodedEvents.diff(updateTextEvents)
    val items = updateTextEvents.collect {
      case DecodedSurveyEvent(_, _, data: UpdateQuestionnaireFreeTextAnswer, _, index, Some(invitationId)) =>
        Item(invitationId, data.questionId, index, data)
    }
    val questionsMap = questions.groupBy(_.id).view.mapValues(_.head)

    def isFreetextQuestion(questionId: UUID) = questionsMap.get(questionId).exists(_.questionType == FreeText)

    val wasAdditionalFreetextAnswerSelected: Map[UUID, Map[UUID, Boolean]] = selectionEvents
      .groupBy(_.invitationId)
      .collect { case (Some(invitationId), events) => invitationId -> events }
      .view
      .mapValues(eventsPerParticipant =>
        eventsPerParticipant
          .groupBy(event =>
            event.data match {
              case data: HasQuestionId => data.questionId
              case _ => throw new Throwable("Unexpected event data type")
            })
          .view
          .mapValues(eventsPerParticipantPerQuestion =>
            eventsPerParticipantPerQuestion.maxBy(_.index).eventType match {
              case SurveyEventType.SelectQuestionnaireFreetextAnswer => true
              case _ => false
            })
          .toMap)
      .toMap

    items
      .groupBy(_.invitationId)
      .flatMap { case (_, eventsPerParticipant) =>
        eventsPerParticipant
          .groupBy(_.data.questionId)
          .map { case (_, eventsPerParticipantPerQuestion) => eventsPerParticipantPerQuestion.maxBy(_.index) }
      }
      .filter(item =>
        isFreetextQuestion(item.questionId) || wasAdditionalFreetextAnswerSelected
          .getOrElse(item.invitationId, Map.empty)
          .getOrElse(item.questionId, false))
      .map(item => FreetextAnswer(item.invitationId, item.data.questionnaireId, item.data.questionId, item.data.value))
      .toSeq
  }

  def filterQuestionnaireSurveyEventsForFreetextAnswer(surveyEvents: Seq[SurveyEvent]): Seq[SurveyEvent] =
    surveyEvents.filter(event =>
      event.eventType == SurveyEventType.UpdateQuestionnaireFreeTextAnswer
        || event.eventType == SurveyEventType.SelectQuestionnaireFreetextAnswer
        || event.eventType == SurveyEventType.DeselectQuestionnaireFreetextAnswer)

  def participantQuestionnaireResult(
      surveyId: UUID,
      invitationId: UUID,
      questionnaireId: UUID): Future[ParticipantQuestionnaireSurveyResult] =
    performIO(participantQuestionnaireResultAction(surveyId, invitationId, questionnaireId))

  private def participantQuestionnaireResultAction(
      surveyId: UUID,
      invitationId: UUID,
      questionnaireId: UUID): IO[ParticipantQuestionnaireSurveyResult, Effect.Read] = {
    def questionResultAction(question: QuestionnaireQuestion, otherInvitationIds: Seq[UUID]) =
      for {
        intermediateScore <- questionnaireQuestionFinalScoreAction(surveyId, invitationId, question)
        otherIntermediateScores <- IO
          .traverse(otherInvitationIds)(questionnaireQuestionFinalScoreAction(surveyId, _, question))
        freetextAnswer <-
          if (question.questionType == QuestionType.FreeText)
            freeTextAnswerForParticipantAction(question.id, invitationId)
          else
            IO.successful(None)
      } yield {
        val (selectedAnswerIds, selectedCriteriaIds, noCriterionFulfilled) = intermediateScore match {
          case score: QuestionIntermediateScoreClosed =>
            (score.selectedAnswerIds, Nil, false)
          case score: QuestionIntermediateScoreFreeText =>
            (Nil, score.selectedCriteriaIds, score.noCriterionFulfilled)
        }
        val intermediateScores = intermediateScore +: otherIntermediateScores
        val scoresSum = intermediateScores.map(_.scoreTuple.score.getOrElse(0)).sum
        val averageScore =
          if (intermediateScores.nonEmpty) BigDecimal(scoresSum) / intermediateScores.length else BigDecimal(0)

        ParticipantQuestionSurveyResult(
          questionId = question.id,
          score = intermediateScore.scoreTuple.score.getOrElse(0),
          maximumScore = intermediateScore.scoreTuple.maximumSore,
          averageScore = averageScore,
          selectedAnswerIds = selectedAnswerIds,
          selectedCriteriaIds = selectedCriteriaIds,
          noCriterionFulfilled = noCriterionFulfilled,
          freetextAnswer = freetextAnswer.getOrElse("")
        )
      }

    for {
      invitationIds <- runIO(allSurveyInvitationsQuotation(surveyId).map(_.id))
      otherInvitationIds = invitationIds.filter(_ != invitationId)
      questions <- allQuestionnaireQuestionsAction(questionnaireId)
      questionResults <- IO.traverse(questions)(questionResultAction(_, otherInvitationIds))
    } yield ParticipantQuestionnaireSurveyResult(
      surveyInvitationId = invitationId,
      questionnaireId = questionnaireId,
      questionResults = questionResults)
  }

  def questionnaireFinaleScoreAction(
      surveyId: UUID,
      invitationId: UUID,
      questionnaireId: UUID): IO[QuestionnaireScore, Effect.Read] =
    allQuestionnaireQuestionsAction(questionnaireId)
      .flatMap(questions =>
        IO
          .sequence(questions.map(questionnaireQuestionFinalScoreAction(surveyId, invitationId, _).map(_.scoreTuple)))
          .map { questionScoreTuples =>
            val questionScores = questionScoreTuples.map(_.score)
            val definedScores = questionScores.flatten
            val score = definedScores.sum
            val maximumScore = questionScoreTuples.map(_.maximumSore).sum
            val isComplete = questionScores.length == definedScores.length

            QuestionnaireScore(questionnaireId, score, maximumScore, isComplete)
          })

  def questionnaireQuestionFinalScore(
      surveyId: UUID,
      surveyInvitationId: UUID,
      question: QuestionnaireQuestion): Future[ScoreTuple] =
    performIO(questionnaireQuestionFinalScoreAction(surveyId, surveyInvitationId, question).map(_.scoreTuple))

  def questionnaireQuestionScoreForRatingAction(
      surveyId: UUID,
      ratingId: UUID,
      surveyInvitationId: UUID,
      question: QuestionnaireQuestion): IO[QuestionIntermediateScore, Effect.Read] =
    if (question.scoringType == QuestionScoringType.None)
      if (question.questionType == QuestionType.FreeText)
        IO.successful(QuestionIntermediateScoreFreeText(ScoreTuple(Some(0), 0), Nil, noCriterionFulfilled = false))
      else {
        for {
          selectedAnswerIds <- selectedAnswersForParticipantAndQuestionAction(question, surveyInvitationId)
            .map(_.selectedAnswerIds)
        } yield QuestionIntermediateScoreClosed(ScoreTuple(Some(0), 0), selectedAnswerIds)
      }
    else
      question.questionType match {
        case SingleChoice | MultipleChoice =>
          for {
            answers <- allQuestionnaireAnswersAction(question.id)
            selectedAnswerIds <- selectedAnswersForParticipantAndQuestionAction(question, surveyInvitationId)
              .map(_.selectedAnswerIds)
          } yield {
            val score = calculateSingleOrMultipleChoiceQuestionScore(question, answers, selectedAnswerIds)
            val maximumScore = calculateSingleOrMultipleChoiceQuestionMaximumScore(question)
            val scoreTuple = ScoreTuple(score = Some(score), maximumSore = maximumScore)
            QuestionIntermediateScoreClosed(scoreTuple, selectedAnswerIds)
          }

        case FreeText =>
          for {
            criteria <- allFreetextQuestionCodingCriteriaAction(question.id)
            ratingOption <- findRatingAction(ratingId)
            freetextQuestionRatingOption <- ratingOption match {
              case Some(rating) =>
                runIO(
                  allFreetextQuestionRatingsQuotation(rating.id)
                    .filter(row =>
                      row.surveyInvitationId == lift(surveyInvitationId)
                        && row.questionId == lift(question.id)))
                  .map(_.headOption)
              case _ =>
                IO.successful(None)
            }
            criterionSelections <- freetextQuestionRatingOption match {
              case Some(freetextQuestionRating) =>
                runIO(
                  query[FreetextQuestionRatingCriterionSelection]
                    .filter(_.freetextQuestionRatingId == lift(freetextQuestionRating.id)))
              case _ =>
                IO.successful(Nil)
            }
          } yield {
            val score = freetextQuestionRatingOption
              .flatMap(calculateFreetextQuestionScore(_, criteria, criterionSelections))
            val maximumScore = calculateFreetextQuestionMaximumScore(criteria, question.scoringType)
            val scoreTuple = ScoreTuple(score = score, maximumSore = maximumScore)
            QuestionIntermediateScoreFreeText(
              scoreTuple = scoreTuple,
              selectedCriteriaIds = criterionSelections.map(_.criterionId),
              noCriterionFulfilled = freetextQuestionRatingOption.exists(_.noCriterionFulfilled)
            )
          }
      }

  def questionnaireQuestionFinalScoreAction(
      surveyId: UUID,
      surveyInvitationId: UUID,
      question: QuestionnaireQuestion): IO[QuestionIntermediateScore, Effect.Read] =
    for {
      rating <- findFinalScoreRatingAction(surveyId).flatMap(liftIOOrFail(EntityNotFound))
      ratingId = rating.id
      intermediateScore <- questionnaireQuestionScoreForRatingAction(
        surveyId = surveyId,
        surveyInvitationId = surveyInvitationId,
        ratingId = ratingId,
        question = question
      )
    } yield intermediateScore

  def calculateSingleOrMultipleChoiceQuestionScore(
      question: QuestionnaireQuestion,
      answers: Seq[QuestionnaireAnswer],
      selectedAnswerIds: Seq[UUID]): Int = {
    val isAnswerSelectionCorrect = answers
      .map { answer =>
        val isAnswerSelected = selectedAnswerIds.contains(answer.id)
        (answer.isCorrect && isAnswerSelected) || (!answer.isCorrect && !isAnswerSelected)
      }
      .forall(identity)

    if (isAnswerSelectionCorrect) question.score else 0
  }

  def calculateSingleOrMultipleChoiceQuestionMaximumScore(question: QuestionnaireQuestion): Int =
    question.score

  def calculateFreetextQuestionScore(
      freetextQuestionRating: FreetextQuestionRating,
      criteria: Seq[FreetextQuestionCodingCriterion],
      criterionSelections: Seq[FreetextQuestionRatingCriterionSelection]): Option[Int] =
    (freetextQuestionRating.noCriterionFulfilled, criterionSelections.map(_.criterionId)) match {
      case (true, _) =>
        Some(0)
      case (false, Nil) =>
        None
      case (false, selectedCriterionIds) =>
        Some(criteria.filter(criterion => selectedCriterionIds.contains(criterion.id)).map(_.score).sum)
    }

  def calculateFreetextQuestionMaximumScore(
      criteria: Seq[FreetextQuestionCodingCriterion],
      scoringType: QuestionScoringType): Int =
    scoringType match {
      case QuestionScoringType.Analytical => criteria.map(_.score).sum
      case QuestionScoringType.Holistic => criteria.map(_.score).max
      case QuestionScoringType.None => 0
    }

  sealed trait QuestionIntermediateScore {
    def scoreTuple: ScoreTuple
  }

  case class QuestionIntermediateScoreClosed(
      scoreTuple: ScoreTuple,
      selectedAnswerIds: Seq[UUID]
  ) extends QuestionIntermediateScore

  case class QuestionIntermediateScoreFreeText(
      scoreTuple: ScoreTuple,
      selectedCriteriaIds: Seq[UUID],
      noCriterionFulfilled: Boolean
  ) extends QuestionIntermediateScore
}
