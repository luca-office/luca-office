package services

import enums.OfficeTool.EmailClient
import enums.ProjectModuleEndType.ByParticipant
import enums.SurveyEventType
import io.circe.Json
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models._
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import services.helpers.Factories.surveyEventCreationFactory
import utils.DateUtils

import java.util.UUID
import java.util.concurrent.CompletionException
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class SurveyEventServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "SurveyEventService.allForScenario" should {

    "return all events for scenario" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val Seq(survey, otherSurvey, _) = createSurveys(project.id, None, None, 3)
      val Seq(surveyInvitation, otherSurveyInvitation, _) = createSurveyInvitations(survey.id, 3)

      val scenarioId = UUID.randomUUID()
      val otherScenarioId = UUID.randomUUID()
      val eventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartScenario,
        index = 1,
        data = Some(StartScenario(scenarioId).asJson.toString)
      )
      val eventCreations = Seq(
        eventCreation,
        eventCreation.copy(data = Some(StartScenario(otherScenarioId).asJson.toString), index = 3),
        eventCreation.copy(invitationId = otherSurveyInvitation.id, index = 4),
        eventCreation.copy(surveyId = otherSurvey.id, invitationId = otherSurveyInvitation.id, index = 5)
      )

      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result =
        Await.result(surveyEventService.allForParticipantForScenario(surveyInvitation.id, scenarioId), Duration.Inf)

      result.length mustBe 1
    }
  }

  "SurveyEventService.createSendSupervisorChatMessageEvent" should {
    "create multiple events wit unique indices" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitations = Seq(createSurveyInvitation(survey.id), createSurveyInvitation(survey.id))
      Await.ready(
        surveyEventService.createSendSupervisorChatMessageEvent(
          survey.id,
          userAccount.id,
          surveyInvitations.map(_.id),
          "test message"),
        Duration.Inf)
      val result = Await.result(
        surveyEventService.allForSurvey(survey.id),
        Duration.Inf
      )

      result.length mustBe 2
      result(0).index mustBe 1
      result(1).index mustBe 2
    }
  }

  "SurveyEventService.createBulk" should {

    "create a single event of type 'StartProject'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val creation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartProject,
        index = 1,
        data = None
      )
      val result = Await.result(surveyEventService.createBulk(Seq(creation)), Duration.Inf)

      result mustBe ""
    }

    "create a single event of type 'StartScenario'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val data = StartScenario(UUID.randomUUID()).asJson
      val creation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartScenario,
        index = 1,
        data = Some(data.toString)
      )
      val result = Await.result(surveyEventService.createBulk(Seq(creation)), Duration.Inf)

      result mustBe ""
    }

    "reject a single event of type 'StartScenario' with invalid payload" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val data = Json.obj(("id", Json.fromString(UUID.randomUUID().toString)))
      val creation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartScenario,
        index = 1,
        data = Some(data.toString)
      )
      val action = surveyEventService.createBulk(Seq(creation))
      val result = Await.result(action, Duration.Inf)

      result.contains("StartScenario") mustBe true
      result.contains("scenarioId") mustBe true
    }

    "create a two events" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val dataOpenTool = OpenTool(UUID.randomUUID(), EmailClient).asJson
      val dataCloseTool = CloseTool(UUID.randomUUID(), EmailClient).asJson
      val creationOpenTool = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.OpenTool,
        index = 1,
        data = Some(dataOpenTool.toString)
      )
      val creationCloseTool = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.CloseTool,
        index = 2,
        data = Some(dataCloseTool.toString)
      )
      val creations = Seq(creationOpenTool, creationCloseTool)
      val result = Await.result(surveyEventService.createBulk(creations), Duration.Inf)

      result mustBe ""
    }

    "create multiple events" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val data = OpenTool(UUID.randomUUID(), EmailClient).asJson
      val creation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.OpenTool,
        index = 1,
        data = Some(data.toString)
      )
      val count = 1000
      val creations = (1 to count).zipWithIndex.map { case (_, index) => creation.copy(index = index + 1) }
      val result = Await.result(surveyEventService.createBulk(creations), Duration.Inf)

      result mustBe ""
    }
  }

  "SurveyEventService.createStartSurveyCommandEvent" should {
    "create a single event of type 'StartSurvey'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val result = Await.result(
        surveyEventService.createStartSurveyCommandEvent(
          survey.id,
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "create a single event of type 'StartSurvey' if an unrelated event of this type exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val otherSurvey = createSurvey(project.id)
      val survey = createSurvey(project.id)

      Await.ready(
        surveyEventService.createStartSurveyCommandEvent(
          otherSurvey.id,
          userAccount.id
        ),
        Duration.Inf)
      val result = Await.result(
        surveyEventService.createStartSurveyCommandEvent(
          survey.id,
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "reject if a 'StartSurvey'-event for the survey already exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val action = () =>
        surveyEventService
          .createStartSurveyCommandEvent(
            survey.id,
            userAccount.id
          )

      Await.result(action(), Duration.Inf)

      val throwable = intercept[CompletionException](Await.result(action(), Duration.Inf))
      throwable.getCause.isInstanceOf[DataValidationError] mustBe true
    }
  }

  "SurveyEventService.createEndSurveyCommandEvent" should {
    "create a single event of type 'EndSurvey'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val result = Await.result(
        surveyEventService.createEndSurveyCommandEvent(
          survey.id,
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "create a single event of type 'EndSurvey' if an unrelated event of this type exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val otherSurvey = createSurvey(project.id)
      val survey = createSurvey(project.id)

      Await.ready(
        surveyEventService.createEndSurveyCommandEvent(
          otherSurvey.id,
          userAccount.id
        ),
        Duration.Inf)
      val result = Await.result(
        surveyEventService.createEndSurveyCommandEvent(
          survey.id,
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "reject if a 'EndSurvey'-event for the survey already exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val action = () =>
        surveyEventService
          .createEndSurveyCommandEvent(
            survey.id,
            userAccount.id
          )

      Await.result(action(), Duration.Inf)

      val throwable = intercept[CompletionException](Await.result(action(), Duration.Inf))
      throwable.getCause.isInstanceOf[DataValidationError] mustBe true
    }
  }

  "SurveyEventService.createStartScenarioCommandEvent" should {
    "create a single event of type 'StartScenario'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val result = Await.result(
        surveyEventService.createStartScenarioCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "create a single event of type 'StartScenario' if an unrelated event of this type exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      Await.ready(
        surveyEventService.createStartScenarioCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      val result = Await.result(
        surveyEventService.createStartScenarioCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "reject if a 'StartScenario'-event for the survey and scenario already exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val scenarioId = UUID.randomUUID()

      val action = () =>
        surveyEventService
          .createStartScenarioCommandEvent(
            survey.id,
            scenarioId,
            userAccount.id
          )

      Await.result(action(), Duration.Inf)

      val throwable = intercept[CompletionException](Await.result(action(), Duration.Inf))
      throwable.getCause.isInstanceOf[DataValidationError] mustBe true
    }
  }

  "SurveyEventService.createStartQuestionnaireCommandEvent" should {
    "create a single event of type 'StartQuestionnaire'" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val result = Await.result(
        surveyEventService.createStartQuestionnaireCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "create a single event of type 'StartQuestionnaire' if an unrelated event of this type exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      Await.ready(
        surveyEventService.createStartQuestionnaireCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      val result = Await.result(
        surveyEventService.createStartQuestionnaireCommandEvent(
          survey.id,
          UUID.randomUUID(),
          userAccount.id
        ),
        Duration.Inf)

      result mustBe ""
    }

    "reject if a 'StartQuestionnaire'-event for the survey and questionnaire already exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val questionnaireId = UUID.randomUUID()

      val action = () =>
        surveyEventService
          .createStartQuestionnaireCommandEvent(
            survey.id,
            questionnaireId,
            userAccount.id
          )

      Await.result(action(), Duration.Inf)

      val throwable = intercept[CompletionException](Await.result(action(), Duration.Inf))
      throwable.getCause.isInstanceOf[DataValidationError] mustBe true
    }
  }

  "SurveyEventService.findInProgressProjectModuleId" should {

    "find the latest in progress project module" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val Seq(survey, _, _) = createSurveys(project.id, None, None, 3)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val scenarioId1 = UUID.randomUUID()
      val scenarioId2 = UUID.randomUUID()
      val scenarioId3 = UUID.randomUUID()
      val questionnaireId1 = UUID.randomUUID()
      val eventCreationsDataItems = Seq(
        (SurveyEventType.StartScenario, StartScenario(scenarioId1).asJson),
        (SurveyEventType.EndScenario, EndScenario(scenarioId1, ByParticipant).asJson),
        (SurveyEventType.StartQuestionnaire, StartQuestionnaire(questionnaireId1).asJson),
        (SurveyEventType.EndQuestionnaire, EndQuestionnaire(questionnaireId1, ByParticipant).asJson),
        (SurveyEventType.StartScenario, StartScenario(scenarioId2).asJson),
        (SurveyEventType.EndScenario, EndScenario(scenarioId2, ByParticipant).asJson),
        (SurveyEventType.StartScenario, StartScenario(scenarioId3).asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)
      val surveyEvents = Await.result(surveyEventService.allForSurvey(survey.id), Duration.Inf)

      val result = surveyEventService.findInProgressProjectModuleId(surveyEvents)

      result mustBe ScenarioIdOrQuestionnaireId(Some(scenarioId3), None)
    }

    "find the latest in progress project module for incomplete or corrupted data" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val Seq(survey, _, _) = createSurveys(project.id, None, None, 3)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val scenarioId1 = UUID.randomUUID()
      val scenarioId2 = UUID.randomUUID()
      val scenarioId3 = UUID.randomUUID()
      val questionnaireId1 = UUID.randomUUID()
      val questionnaireId2 = UUID.randomUUID()
      val eventCreationsDataItems = Seq(
        (SurveyEventType.StartScenario, StartScenario(scenarioId1).asJson),
        (SurveyEventType.StartQuestionnaire, StartQuestionnaire(questionnaireId1).asJson),
        (SurveyEventType.EndQuestionnaire, EndQuestionnaire(questionnaireId1, ByParticipant).asJson),
        (SurveyEventType.StartScenario, StartScenario(scenarioId2).asJson),
        (SurveyEventType.EndScenario, EndScenario(scenarioId2, ByParticipant).asJson),
        (SurveyEventType.StartQuestionnaire, StartQuestionnaire(questionnaireId2).asJson),
        (SurveyEventType.StartScenario, StartScenario(scenarioId3).asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)
      val surveyEvents = Await.result(surveyEventService.allForSurvey(survey.id), Duration.Inf)

      val result = surveyEventService.findInProgressProjectModuleId(surveyEvents)

      result mustBe ScenarioIdOrQuestionnaireId(Some(scenarioId3), None)
    }
  }
}
