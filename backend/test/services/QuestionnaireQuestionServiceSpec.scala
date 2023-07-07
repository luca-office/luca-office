package services

import enums.ProjectModuleEndType.ByParticipant
import enums.QuestionType.{FreeText, MultipleChoice, SingleChoice}
import enums.SurveyEventType.{
  DeselectQuestionnaireAnswer,
  EndQuestionnaire,
  SelectQuestionnaireAnswer,
  StartQuestionnaire,
  UpdateQuestionnaireFreeTextAnswer
}
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models.{QuestionAnswerSelection, SurveyEventCreation}
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import services.helpers.Factories.{deselectQuestionnaireAnswerFactory, selectQuestionnaireAnswerFactory}
import utils.DateUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class QuestionnaireQuestionServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "QuestionnaireQuestionServiceSpec.selectedAnswersForParticipant" should {

    "respond with an empty list if question is of type FreeText" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireQuestionService = inject[QuestionnaireQuestionService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, FreeText)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      val action = questionnaireQuestionService.selectedAnswersForParticipant(question.id, surveyInvitations.head.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe QuestionAnswerSelection(selectedAnswerIds = Nil, wasFreetextAnswerSelected = false)
    }

    "find the selected answer id for a single choice question" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val questionnaireQuestionService = inject[QuestionnaireQuestionService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, SingleChoice)
      val Seq(answer1, answer2, _) = createQuestionnaireAnswers(3, question.id)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      def answerEventData(answerId: UUID) = models
        .SelectQuestionnaireAnswer(
          questionnaireId = questionnaire.id,
          scenarioId = None,
          questionId = question.id,
          questionPosition = question.position,
          answerId = answerId,
          answerPosition = 1,
          value = ""
        )
        .asJson

      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            (StartQuestionnaire, Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)),
            (SelectQuestionnaireAnswer, Some(answerEventData(answer1.id).toString)),
            (SelectQuestionnaireAnswer, Some(answerEventData(answer2.id).toString)),
            (SelectQuestionnaireAnswer, Some(answerEventData(answer1.id).toString)),
            (EndQuestionnaire, Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString))
          ).zipWithIndex
            .map { case ((eventType, data), index) =>
              SurveyEventCreation(
                surveyId = survey.id,
                invitationId = surveyInvitation.id,
                timestamp = DateUtils.now.plusSeconds(index),
                eventType = eventType,
                index = index + 1,
                data = data)
            })

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.selectedAnswersForParticipant(question.id, surveyInvitations.head.id),
        Duration.Inf)

      result mustBe QuestionAnswerSelection(selectedAnswerIds = Seq(answer1.id), wasFreetextAnswerSelected = false)
    }

    "respond with empty list if no answer was selected for a single choice question" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val questionnaireQuestionService = inject[QuestionnaireQuestionService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, SingleChoice)
      val _ = createQuestionnaireAnswers(3, question.id)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            (StartQuestionnaire, Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)),
            (EndQuestionnaire, Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString))
          ).zipWithIndex
            .map { case ((eventType, data), index) =>
              SurveyEventCreation(
                surveyId = survey.id,
                invitationId = surveyInvitation.id,
                timestamp = DateUtils.now.plusSeconds(index),
                eventType = eventType,
                index = index + 1,
                data = data)
            })

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.selectedAnswersForParticipant(question.id, surveyInvitations.head.id),
        Duration.Inf)

      result mustBe QuestionAnswerSelection(selectedAnswerIds = Nil, wasFreetextAnswerSelected = false)
    }

    "find the selected answer ids for a multiple choice question" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireQuestionService = inject[QuestionnaireQuestionService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, MultipleChoice)
      val Seq(answer1, answer2, _) = createQuestionnaireAnswers(3, question.id)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      def selectAnswerData(answerId: UUID) = selectQuestionnaireAnswerFactory
        .copy(
          questionnaireId = questionnaire.id,
          questionId = question.id,
          answerId = answerId
        )
        .asJson

      def deselectAnswerData(answerId: UUID) = deselectQuestionnaireAnswerFactory
        .copy(
          questionnaireId = questionnaire.id,
          questionId = question.id,
          answerId = answerId
        )
        .asJson

      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            (StartQuestionnaire, Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer1.id).toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer2.id).toString)),
            (DeselectQuestionnaireAnswer, Some(deselectAnswerData(answer1.id).toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer1.id).toString)),
            (DeselectQuestionnaireAnswer, Some(deselectAnswerData(answer2.id).toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer2.id).toString)),
            (EndQuestionnaire, Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString))
          ).zipWithIndex
            .map { case ((eventType, data), index) =>
              SurveyEventCreation(
                surveyId = survey.id,
                invitationId = surveyInvitation.id,
                timestamp = DateUtils.now.plusSeconds(index),
                eventType = eventType,
                index = index + 1,
                data = data)
            })

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.selectedAnswersForParticipant(question.id, surveyInvitations.head.id),
        Duration.Inf)
      val expectedResult = QuestionAnswerSelection(
        selectedAnswerIds = Seq(answer1.id, answer2.id).sortBy(_.toString),
        wasFreetextAnswerSelected = false)

      result.copy(selectedAnswerIds = result.selectedAnswerIds.sortBy(_.toString)) mustBe expectedResult
    }

    "respond with empty list if no answer was selected for a multiple choice question" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireQuestionService = inject[QuestionnaireQuestionService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, MultipleChoice)
      val Seq(answer1, answer2, _) = createQuestionnaireAnswers(3, question.id)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      def selectAnswerData(answerId: UUID) = selectQuestionnaireAnswerFactory
        .copy(
          questionnaireId = questionnaire.id,
          questionId = question.id,
          answerId = answerId
        )
        .asJson

      def deselectAnswerData(answerId: UUID) = deselectQuestionnaireAnswerFactory
        .copy(
          questionnaireId = questionnaire.id,
          questionId = question.id,
          answerId = answerId
        )
        .asJson

      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            (StartQuestionnaire, Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer1.id).toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer2.id).toString)),
            (DeselectQuestionnaireAnswer, Some(deselectAnswerData(answer1.id).toString)),
            (SelectQuestionnaireAnswer, Some(selectAnswerData(answer1.id).toString)),
            (DeselectQuestionnaireAnswer, Some(deselectAnswerData(answer1.id).toString)),
            (DeselectQuestionnaireAnswer, Some(deselectAnswerData(answer2.id).toString)),
            (EndQuestionnaire, Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString))
          ).zipWithIndex
            .map { case ((eventType, data), index) =>
              SurveyEventCreation(
                surveyId = survey.id,
                invitationId = surveyInvitation.id,
                timestamp = DateUtils.now.plusSeconds(index),
                eventType = eventType,
                index = index + 1,
                data = data)
            })

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.selectedAnswersForParticipant(question.id, surveyInvitations.head.id),
        Duration.Inf)

      result mustBe QuestionAnswerSelection(selectedAnswerIds = Nil, wasFreetextAnswerSelected = false)
    }
  }

  "QuestionnaireQuestionServiceSpec.freeTextAnswerForParticipant" should {

    "respond with the latest value" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireQuestionService = inject[QuestionnaireQuestionService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val Seq(question1, question2, _) = createQuestionnaireQuestions(3, questionnaire.id, FreeText)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      def updateAnswerData(questionId: UUID, value: String) = models
        .UpdateQuestionnaireFreeTextAnswer(
          questionnaireId = questionnaire.id,
          scenarioId = None,
          questionId = questionId,
          questionPosition = question1.position,
          answerPosition = None,
          value = value
        )
        .asJson

      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            (StartQuestionnaire, Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)),
            (UpdateQuestionnaireFreeTextAnswer, Some(updateAnswerData(question1.id, "a").toString)),
            (UpdateQuestionnaireFreeTextAnswer, Some(updateAnswerData(question2.id, "b").toString)),
            (UpdateQuestionnaireFreeTextAnswer, Some(updateAnswerData(question1.id, "ab").toString)),
            (UpdateQuestionnaireFreeTextAnswer, Some(updateAnswerData(question1.id, "abcde").toString)),
            (UpdateQuestionnaireFreeTextAnswer, Some(updateAnswerData(question2.id, "bc").toString)),
            (EndQuestionnaire, Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString))
          ).zipWithIndex
            .map { case ((eventType, data), index) =>
              SurveyEventCreation(
                surveyId = survey.id,
                invitationId = surveyInvitation.id,
                timestamp = DateUtils.now.plusSeconds(index),
                eventType = eventType,
                index = index + 1,
                data = data)
            })

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.freeTextAnswerForParticipant(question1.id, surveyInvitations.head.id),
        Duration.Inf)

      result mustBe Some("abcde")
    }

    "respond with empty value if no answer was given yet" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val questionnaireQuestionService = inject[QuestionnaireQuestionService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, FreeText)
      val _ = createQuestionnaireAnswers(3, question.id)
      val _ = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)

      val eventCreations = surveyInvitations.map(surveyInvitation =>
        SurveyEventCreation(
          surveyId = survey.id,
          invitationId = surveyInvitation.id,
          timestamp = DateUtils.now,
          eventType = StartQuestionnaire,
          index = 1,
          data = Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)
        ))

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(
        questionnaireQuestionService.freeTextAnswerForParticipant(question.id, surveyInvitations.head.id),
        Duration.Inf)

      result mustBe None
    }
  }
}
