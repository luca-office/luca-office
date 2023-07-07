package services

import enums.QuestionType.SingleChoice
import enums.SurveyEventType
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models._
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import utils.DateUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class RuntimeSurveyResultsServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "RuntimeSurveyResultsServiceSpec.overview" should {

    "return empty results if no answers were selected" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val runtimeSurveyResultsService = inject[RuntimeSurveyResultsService]
      val questionnaireAnswerService = inject[QuestionnaireAnswerService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)
      val scenario = createScenario(userAccount.id)
      val _ = createProjectModule(project.id, Some(scenario.id), None)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, SingleChoice)
      val defaultAnswers = Await.result(questionnaireAnswerService.all(question.id), Duration.Inf)
      val answer = createQuestionnaireAnswer(question.id, isCorrect = true)
      val _ = createScenarioQuestionnaire(scenario.id, questionnaire.id)

      val action = runtimeSurveyResultsService.overview(survey.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Seq(
        RuntimeSurveyResult(
          questionnaireId = questionnaire.id,
          participantIds = surveyInvitations.map(_.id),
          completedParticipantIds = Nil,
          questionResults = Seq(RuntimeSurveyQuestionResult(
            questionId = question.id,
            answerSelections = Seq(
              RuntimeSurveyAnswerSelection(
                answerId = Some(defaultAnswers.head.id),
                isFreetextAnswer = false,
                selectionsCount = 0,
                selectionsAsPercent = 0.0),
              RuntimeSurveyAnswerSelection(
                answerId = Some(defaultAnswers(1).id),
                isFreetextAnswer = false,
                selectionsCount = 0,
                selectionsAsPercent = 0.0),
              RuntimeSurveyAnswerSelection(
                answerId = Some(answer.id),
                isFreetextAnswer = false,
                selectionsCount = 0,
                selectionsAsPercent = 0.0),
              RuntimeSurveyAnswerSelection(
                answerId = None,
                isFreetextAnswer = true,
                selectionsCount = 0,
                selectionsAsPercent = 0.0)
            ),
            participantResults = surveyInvitations.map(invitation =>
              RuntimeSurveyParticipantResult(invitation.id, Nil, wasFreetextAnswerSelected = false))
          ))
        ))
    }

    "return correct results if some answers were selected" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val runtimeSurveyResultsService = inject[RuntimeSurveyResultsService]
      val questionnaireAnswerService = inject[QuestionnaireAnswerService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)
      val scenario = createScenario(userAccount.id)
      val _ = createProjectModule(project.id, Some(scenario.id), None)
      val questionnaire = createQuestionnaire(userAccount.id)
      val question = createQuestionnaireQuestion(questionnaire.id, SingleChoice)
      val defaultAnswers = Await.result(questionnaireAnswerService.all(question.id), Duration.Inf)
      val answer = createQuestionnaireAnswer(question.id, isCorrect = true)
      val answers = defaultAnswers :+ answer
      val _ = createScenarioQuestionnaire(scenario.id, questionnaire.id)

      val selectAnswerData = SelectQuestionnaireAnswer(
        questionnaireId = questionnaire.id,
        scenarioId = Some(scenario.id),
        questionId = question.id,
        questionPosition = question.position,
        answerId = answers.head.id,
        answerPosition = answers.head.position,
        value = answers.head.text
      )
      val selectAnswerEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitations.head.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.SelectQuestionnaireAnswer,
        index = 1,
        data = Some(selectAnswerData.asJson.toString)
      )
      val endEventData = EndEvent(questionnaireId = questionnaire.id, scenarioId = scenario.id)
      val endEventEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitations.head.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.EndEvent,
        index = 2,
        data = Some(endEventData.asJson.toString)
      )
      val eventCreations = Seq(
        selectAnswerEventCreation,
        endEventEventCreation,
        selectAnswerEventCreation.copy(invitationId = surveyInvitations(1).id, index = 3),
        endEventEventCreation.copy(invitationId = surveyInvitations(1).id, index = 4)
      )
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = runtimeSurveyResultsService.overview(survey.id, scenario.id)
      val results = Await.result(action, Duration.Inf)

      results.foreach { result =>
        result.questionnaireId mustBe questionnaire.id
        result.participantIds mustBe surveyInvitations.map(_.id)
        result.completedParticipantIds mustBe Seq(surveyInvitations.head.id, surveyInvitations(1).id)

        result.questionResults.foreach { questionResult =>
          val expectedAnswerSelections = Seq(
            RuntimeSurveyAnswerSelection(
              answerId = Some(answers.head.id),
              isFreetextAnswer = false,
              selectionsCount = 2,
              selectionsAsPercent = 2.0 / 3),
            RuntimeSurveyAnswerSelection(
              answerId = Some(answers(1).id),
              isFreetextAnswer = false,
              selectionsCount = 0,
              selectionsAsPercent = 0.0),
            RuntimeSurveyAnswerSelection(
              answerId = Some(answers(2).id),
              isFreetextAnswer = false,
              selectionsCount = 0,
              selectionsAsPercent = 0.0),
            RuntimeSurveyAnswerSelection(
              answerId = None,
              isFreetextAnswer = true,
              selectionsCount = 0,
              selectionsAsPercent = 0.0)
          )
          val expectedParticipantResults = Seq(
            RuntimeSurveyParticipantResult(
              surveyInvitations.head.id,
              Seq(answers.head.id),
              wasFreetextAnswerSelected = false),
            RuntimeSurveyParticipantResult(
              surveyInvitations(1).id,
              Seq(answers.head.id),
              wasFreetextAnswerSelected = false),
            RuntimeSurveyParticipantResult(surveyInvitations(2).id, Nil, wasFreetextAnswerSelected = false)
          )

          questionResult.questionId mustEqual question.id
          questionResult.participantResults.sortBy(_.invitationId) mustEqual expectedParticipantResults
            .sortBy(_.invitationId)
          questionResult.answerSelections.sortBy(_.answerId) mustEqual expectedAnswerSelections.sortBy(_.answerId)
        }
      }
    }
  }
}
