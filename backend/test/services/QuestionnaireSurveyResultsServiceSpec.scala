package services

import enums.QuestionType.{FreeText, SingleChoice}
import enums.{QuestionType, SurveyEventType}
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models._
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import services.helpers.Factories.surveyEventCreationFactory
import utils.DateUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class QuestionnaireSurveyResultsServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "QuestionnaireSurveyResultsServiceSpec.freetextAnswersForQuestionnaire" should {

    "return freetext answers for freetext questions" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val surveyEventService = inject[SurveyEventService]

      val (survey, surveyInvitation, questionnaire, _, _, _, _, _) = questionnaireSingleChoiceSetup
      val freetextQuestions = createQuestionnaireQuestions(3, questionnaire.id, QuestionType.FreeText)

      val data = UpdateQuestionnaireFreeTextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = freetextQuestions.head.id,
        questionPosition = 1,
        answerPosition = None,
        value = "abc")
      val eventCreationsDataItems = Seq(
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcd").asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(questionId = freetextQuestions(1).id).asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcde").asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = questionnaireSurveyResultsService.freetextAnswersForQuestionnaire(questionnaire.id, survey.id)
      val expectedResult = Seq(
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions.head.id, "abcde"),
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions(1).id, "abc")
      )
      val result = Await.result(action, Duration.Inf)

      result.sortBy(_.questionId) mustBe expectedResult.sortBy(_.questionId)
    }

    "return freetext answers for freetext questions and single choice questions" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val surveyEventService = inject[SurveyEventService]
      val questionnaireQuestionService = inject[QuestionnaireQuestionService]

      val (survey, surveyInvitation, questionnaire, singleChoiceQuestion, _, _, _, _) = questionnaireSingleChoiceSetup
      val freetextQuestions = createQuestionnaireQuestions(3, questionnaire.id, QuestionType.FreeText)

      val data = UpdateQuestionnaireFreeTextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = freetextQuestions.head.id,
        questionPosition = freetextQuestions.head.position,
        answerPosition = None,
        value = "abc"
      )
      val dataSelectAnswer = SelectQuestionnaireFreetextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = singleChoiceQuestion.id,
        questionPosition = singleChoiceQuestion.position,
        answerPosition = None,
        value = ""
      )
      val eventCreationsDataItems = Seq(
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcd").asJson),
        (SurveyEventType.SelectQuestionnaireFreetextAnswer, dataSelectAnswer.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(questionId = freetextQuestions(1).id).asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(questionId = singleChoiceQuestion.id).asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcde").asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val questionUpdate = QuestionnaireQuestionUpdate(
        text = singleChoiceQuestion.text,
        questionType = singleChoiceQuestion.questionType,
        isAdditionalTextAnswerAllowed = true,
        binaryFileId = singleChoiceQuestion.binaryFileId,
        scoringType = singleChoiceQuestion.scoringType,
        score = singleChoiceQuestion.score
      )
      val _ = Await.result(questionnaireQuestionService.update(singleChoiceQuestion.id, questionUpdate), Duration.Inf)

      val action = questionnaireSurveyResultsService.freetextAnswersForQuestionnaire(questionnaire.id, survey.id)
      val expectedResult = Seq(
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions.head.id, "abcde"),
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions(1).id, "abc"),
        FreetextAnswer(surveyInvitation.id, questionnaire.id, singleChoiceQuestion.id, "abc")
      )
      val result = Await.result(action, Duration.Inf)

      result.sortBy(_.questionId) mustBe expectedResult.sortBy(_.questionId)
    }

    "not return unselected freetext answers for single choice questions" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val surveyEventService = inject[SurveyEventService]
      val questionnaireQuestionService = inject[QuestionnaireQuestionService]

      val (survey, surveyInvitation, questionnaire, singleChoiceQuestion, _, _, _, _) = questionnaireSingleChoiceSetup
      val freetextQuestions = createQuestionnaireQuestions(3, questionnaire.id, QuestionType.FreeText)

      val data = UpdateQuestionnaireFreeTextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = freetextQuestions.head.id,
        questionPosition = 1,
        answerPosition = None,
        value = "abc")
      val dataSelectAnswer = SelectQuestionnaireFreetextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = singleChoiceQuestion.id,
        questionPosition = singleChoiceQuestion.position,
        answerPosition = None,
        value = ""
      )
      val dataDeselectAnswer = DeselectQuestionnaireFreetextAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = singleChoiceQuestion.id,
        questionPosition = singleChoiceQuestion.position,
        answerPosition = None,
        value = ""
      )
      val eventCreationsDataItems = Seq(
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcd").asJson),
        (SurveyEventType.SelectQuestionnaireFreetextAnswer, dataSelectAnswer.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(questionId = freetextQuestions(1).id).asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(questionId = singleChoiceQuestion.id).asJson),
        (SurveyEventType.DeselectQuestionnaireFreetextAnswer, dataDeselectAnswer.asJson),
        (SurveyEventType.UpdateQuestionnaireFreeTextAnswer, data.copy(value = "abcde").asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val questionUpdate = QuestionnaireQuestionUpdate(
        text = singleChoiceQuestion.text,
        questionType = singleChoiceQuestion.questionType,
        isAdditionalTextAnswerAllowed = true,
        binaryFileId = singleChoiceQuestion.binaryFileId,
        scoringType = singleChoiceQuestion.scoringType,
        score = singleChoiceQuestion.score
      )
      val _ = Await.result(questionnaireQuestionService.update(singleChoiceQuestion.id, questionUpdate), Duration.Inf)

      val action = questionnaireSurveyResultsService.freetextAnswersForQuestionnaire(questionnaire.id, survey.id)
      val expectedResult = Seq(
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions.head.id, "abcde"),
        FreetextAnswer(surveyInvitation.id, questionnaire.id, freetextQuestions(1).id, "abc")
      )
      val result = Await.result(action, Duration.Inf)

      result.sortBy(_.questionId) mustBe expectedResult.sortBy(_.questionId)
    }
  }

  "QuestionnaireSurveyResultsServiceSpec.questionnaireQuestionFinalScore" should {

    "calculate the final score for a single choice question without selected answers" in {
      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]

      val (survey, surveyInvitation, _, question, _, _, _, _) = questionnaireSingleChoiceSetup

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(Some(0), 5)
    }

    "calculate the final score for a single choice question with wrong answer selection" in {
      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val surveyEventService = inject[SurveyEventService]

      val (survey, surveyInvitation, questionnaire, question, correctAnswer, wrongAnswers, _, _) =
        questionnaireSingleChoiceSetup
      val eventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.SelectQuestionnaireAnswer,
        index = 1,
        data = None
      )
      val selectAnswerEventData = SelectQuestionnaireAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = question.id,
        questionPosition = 1,
        answerId = correctAnswer.id,
        answerPosition = correctAnswer.position,
        value = correctAnswer.text
      )
      val eventCreationsDataItems = Seq(
        selectAnswerEventData.copy(answerId = correctAnswer.id),
        selectAnswerEventData.copy(answerId = wrongAnswers(1).id),
        selectAnswerEventData.copy(answerId = wrongAnswers(2).id),
        selectAnswerEventData.copy(answerId = correctAnswer.id),
        selectAnswerEventData.copy(answerId = wrongAnswers.head.id)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case (dataItem, index) => eventCreation.copy(data = Some(dataItem.asJson.toString), index = index + 1) }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(Some(0), 5)
    }

    "calculate the final score for a single choice question with correct answer selection" in {
      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val surveyEventService = inject[SurveyEventService]

      val (
        survey,
        surveyInvitation,
        questionnaire,
        question,
        correctAnswer,
        wrongAnswers,
        otherQuestion,
        otherAnswers) = questionnaireSingleChoiceSetup
      val eventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.SelectQuestionnaireAnswer,
        index = 1,
        data = None
      )
      val selectAnswerEventData = SelectQuestionnaireAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = None,
        questionId = question.id,
        questionPosition = 1,
        answerId = correctAnswer.id,
        answerPosition = correctAnswer.position,
        value = correctAnswer.text
      )
      val eventCreationsDataItems = Seq(
        selectAnswerEventData.copy(answerId = correctAnswer.id),
        selectAnswerEventData.copy(answerId = wrongAnswers(1).id),
        selectAnswerEventData.copy(answerId = wrongAnswers(2).id),
        selectAnswerEventData.copy(answerId = correctAnswer.id),
        selectAnswerEventData.copy(questionId = otherQuestion.id, answerId = otherAnswers(2).id),
        selectAnswerEventData.copy(questionId = otherQuestion.id, answerId = otherAnswers(1).id),
        selectAnswerEventData.copy(questionId = otherQuestion.id, answerId = otherAnswers.head.id)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case (dataItem, index) =>
          eventCreation.copy(data = Some(dataItem.asJson.toString), index = index + 1)
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(Some(5), 5)
    }

    "calculate the final score for a freetext question without score" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val ratingService = inject[RatingService]
      val defaultCriteriaScore = 1

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, FreeText)
      val _ = createFreetextQuestionCodingCriterion(question.id, score = 5)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)
      val rating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get
      val _ = createFreetextQuestionRating(rating.id, question.id, surveyInvitation.id)

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(None, defaultCriteriaScore + 5)
    }

    "calculate the final score for a freetext question with score set to zero" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val ratingService = inject[RatingService]
      val defaultCriteriaScore = 1

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, FreeText)
      val _ = createFreetextQuestionCodingCriterion(question.id, score = 5)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)
      val rating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get
      val _ = createFreetextQuestionRating(rating.id, question.id, surveyInvitation.id, noCriterionFulfilled = true)

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(Some(0), defaultCriteriaScore + 5)
    }

    "calculate the final score for a freetext question with selected criterion" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val ratingService = inject[RatingService]
      val defaultCriteriaScore = 1

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, FreeText)
      val criterion = createFreetextQuestionCodingCriterion(question.id, score = 5)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)
      val rating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get
      val freetextQuestionRating = createFreetextQuestionRating(rating.id, question.id, surveyInvitation.id)
      val _ = createFreetextQuestionRatingCriterionSelection(freetextQuestionRating.id, criterion.id)

      val action =
        questionnaireSurveyResultsService.questionnaireQuestionFinalScore(survey.id, surveyInvitation.id, question)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScoreTuple(Some(5), defaultCriteriaScore + 5)
    }

    "calculate  correct participants questionnaire survey result for a questionnaire" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireSurveyResultsService = inject[QuestionnaireSurveyResultsService]
      val ratingService = inject[RatingService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)

      val Seq(question1, question2, question3) = createQuestionnaireQuestions(3, questionnaire.id, FreeText)
      val criterion1 = createFreetextQuestionCodingCriterion(question1.id, score = 3)
      val criterion2 = createFreetextQuestionCodingCriterion(question2.id, score = 3)
      val criterion3 = createFreetextQuestionCodingCriterion(question3.id, score = 3)

      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val rating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get

      val freetextQuestionRating = createFreetextQuestionRating(rating.id, question1.id, surveyInvitation.id)
      val _ = createFreetextQuestionRatingCriterionSelection(freetextQuestionRating.id, criterion1.id)

      val multiQuestionRating = createFreetextQuestionRating(rating.id, question2.id, surveyInvitation.id)
      val _ = createFreetextQuestionRatingCriterionSelection(multiQuestionRating.id, criterion2.id)

      val singleQuestionRating = createFreetextQuestionRating(rating.id, question3.id, surveyInvitation.id)
      val _ = createFreetextQuestionRatingCriterionSelection(singleQuestionRating.id, criterion3.id)

      val action = questionnaireSurveyResultsService.participantsQuestionnaireResult(survey.id, questionnaire.id)
      val result = Await.result(action, Duration.Inf)

      result.map(_.questionResults.map(_.score)) mustBe Seq(Seq(3, 3, 3), Seq(0, 0, 0), Seq(0, 0, 0))
      result.map(_.questionResults.map(_.averageScore)) mustBe Seq(Seq(1, 1, 1), Seq(1, 1, 1), Seq(1, 1, 1))
    }
  }

  private def questionnaireSingleChoiceSetup = {
    val creationUtils = inject[CreationUtils]

    import creationUtils._

    val userAccount = createUserAccount
    val project = createProject(userAccount.id)
    val questionnaire = createQuestionnaire(userAccount.id)
    val question = createQuestionnaireQuestion(questionnaire.id, SingleChoice, 5)
    val otherQuestion = createQuestionnaireQuestion(questionnaire.id, SingleChoice, 5)
    val correctAnswer = createQuestionnaireAnswer(question.id, isCorrect = true)
    val wrongAnswers = createQuestionnaireAnswers(3, question.id)
    val otherAnswers = createQuestionnaireAnswers(3, otherQuestion.id)
    val _ = createProjectModule(project.id, None, Some(questionnaire.id))
    val survey = createSurvey(project.id)
    val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

    (survey, surveyInvitation, questionnaire, question, correctAnswer, wrongAnswers, otherQuestion, otherAnswers)
  }

}
