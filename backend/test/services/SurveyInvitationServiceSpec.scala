package services

import enums.ProjectModuleEndType.ByParticipant
import enums.ProjectModuleProgressType.{Completed, InProgress}
import enums.Relevance.Required
import enums.SurveyEventType
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

class SurveyInvitationServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "SurveyInvitationServiceSpec.find" should {

    "respond with an empty result if no invitation can be found for the specified token" in {
      val surveyInvitationService = inject[SurveyInvitationService]

      val result = Await.result(surveyInvitationService.find("12345"), Duration.Inf)

      result mustBe None
    }

    "find an existing invitation" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val result = Await.result(surveyInvitationService.find(surveyInvitation.token), Duration.Inf)

      result.value mustBe surveyInvitation
    }

    "respond with a specific error if an existing invitation has not started yet" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(
        project.id,
        startsAt = Some(DateUtils.now.plusSeconds(60 * 60)),
        endsAt = Some(DateUtils.now.plusSeconds(10 * 60 * 60)))
      val surveyInvitation = createSurveyInvitation(survey.id)
      val action = surveyInvitationService.find(surveyInvitation.token)
      val result = intercept[ApiError](Await.result(action, Duration.Inf))

      result mustBe SurveyNotStartedYet
    }

    "respond with a specific error if an existing invitation has already ended" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(
        project.id,
        startsAt = Some(DateUtils.now.minusSeconds(10 * 60 * 60)),
        endsAt = Some(DateUtils.now.minusSeconds(60 * 60)))
      val surveyInvitation = createSurveyInvitation(survey.id)
      val action = surveyInvitationService.find(surveyInvitation.token)
      val result = intercept[ApiError](Await.result(action, Duration.Inf))

      result mustBe SurveyAlreadyEnded
    }

    "respond with a specific error if the specified token has already been used" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val surveyEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartProject,
        index = 1,
        data = None
      )
      Await.result(surveyEventService.createBulk(Seq(surveyEventCreation)), Duration.Inf)
      val action = surveyInvitationService.find(surveyInvitation.token)
      val result = intercept[ApiError](Await.result(action, Duration.Inf))

      result mustBe TokenAlreadyUsed
    }

    "respond with empty progresses list if no events are present" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation) = createSurveyInvitations(survey.id, 1)
      val _ = createProjectModule(project.id, Some(scenario.id), None)

      val result =
        Await.result(surveyInvitationService.projectModuleProgresses(surveyInvitation.id, survey.id), Duration.Inf)

      result mustBe Nil
    }

    "respond with correct progresses if required emails are present" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyInvitationService = inject[SurveyInvitationService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val emails = createEmails(3, scenario.id, Required)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation) = createSurveyInvitations(survey.id, 1)
      val _ = createProjectModule(project.id, Some(scenario.id), None)
      val startScenarioEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.StartScenario,
        index = 1,
        data = Some(models.StartScenario(scenario.id).asJson.toString)
      )
      val endScenarioEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = SurveyEventType.EndScenario,
        index = 2,
        data = Some(models.EndScenario(scenario.id, ByParticipant).asJson.toString)
      )
      val showEmailEventCreations = emails
        .take(2)
        .zipWithIndex
        .map { case (email, index) =>
          SurveyEventCreation(
            surveyId = survey.id,
            invitationId = surveyInvitation.id,
            timestamp = DateUtils.now,
            eventType = SurveyEventType.ShowEmail,
            index = index + 3,
            data = Some(models.ShowEmail(scenario.id, email.id).asJson.toString)
          )
        }
      val eventCreations = Seq(startScenarioEventCreation) ++ showEmailEventCreations ++ Seq(endScenarioEventCreation)
      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result =
        Await.result(surveyInvitationService.projectModuleProgresses(surveyInvitation.id, survey.id), Duration.Inf)

      result.headOption.value mustBe ParticipantProjectModuleProgress(
        scenarioId = Some(scenario.id),
        questionnaireId = None,
        status = Completed,
        questionsInProgressCount = None,
        requiredDocumentsCount = Some(3),
        openedRequiredDocumentsCount = Some(2)
      )
    }

    "respond with correct progresses if required files are present" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val Seq(scenario1, scenario2, _) = createScenarios(3, userAccount.id)
      val directory1 = createDirectory(parentDirectoryId = None, Some(scenario1.id))
      val directory2 = createDirectory(parentDirectoryId = None, Some(scenario2.id))
      val binaryFile = createBinaryFile
      val files1 = createFiles(Some(directory1.id), emailId = None, binaryFile.id, 3)
      val _ = createFiles(Some(directory2.id), emailId = None, binaryFile.id, 3)

      val survey = createSurvey(project.id)
      val Seq(surveyInvitation) = createSurveyInvitations(survey.id, 1)
      val _ = createProjectModule(project.id, Some(scenario1.id), None)
      val _ = createProjectModule(project.id, Some(scenario2.id), None)

      val openImageBinaryData =
        OpenImageBinary(scenario1.id, Some(directory1.id), Some(files1.head.id), binaryFile.id, "", "")
      val eventCreationsDataItems = Seq(
        (SurveyEventType.StartScenario, StartScenario(scenario1.id).asJson),
        (SurveyEventType.OpenImageBinary, openImageBinaryData.asJson),
        (SurveyEventType.OpenImageBinary, openImageBinaryData.copy(fileId = Some(files1(1).id)).asJson),
        (SurveyEventType.EndScenario, EndScenario(scenario1.id, ByParticipant).asJson),
        (SurveyEventType.StartScenario, StartScenario(scenario2.id).asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result =
        Await.result(surveyInvitationService.projectModuleProgresses(surveyInvitation.id, survey.id), Duration.Inf)
      val expectedResult = Seq(
        ParticipantProjectModuleProgress(
          scenarioId = Some(scenario1.id),
          questionnaireId = None,
          status = Completed,
          questionsInProgressCount = None,
          requiredDocumentsCount = Some(3),
          openedRequiredDocumentsCount = Some(2)
        ),
        ParticipantProjectModuleProgress(
          scenarioId = Some(scenario2.id),
          questionnaireId = None,
          status = InProgress,
          questionsInProgressCount = None,
          requiredDocumentsCount = Some(3),
          openedRequiredDocumentsCount = Some(0)
        )
      )

      result.sortBy(_.scenarioId) mustBe expectedResult.sortBy(_.scenarioId)
    }
  }

  "SurveyInvitationsService.projectModuleProgresses" should {
    "respond with correct progresses for each project module" in {

      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val surveyInvitationService = inject[SurveyInvitationService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val Seq(runtimeQuestionnaire, projectModuleQuestionnaire) = createQuestionnaires(userAccount.id, 2)
      val _ = createScenarioQuestionnaire(scenario.id, runtimeQuestionnaire.id)
      val _ = createProjectModule(project.id, scenarioId = Some(scenario.id), questionnaireId = None)
      val _ = createProjectModule(project.id, scenarioId = None, questionnaireId = Some(projectModuleQuestionnaire.id))

      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val eventCreationsDataItems = Seq(
        (SurveyEventType.StartScenario, StartScenario(scenario.id).asJson),
        (SurveyEventType.StartQuestionnaire, StartQuestionnaire(runtimeQuestionnaire.id).asJson),
        (SurveyEventType.StartQuestionnaire, StartQuestionnaire(projectModuleQuestionnaire.id).asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result =
        Await.result(surveyInvitationService.projectModuleProgresses(surveyInvitation.id, survey.id), Duration.Inf)
      val expectedResult = Seq(
        ParticipantProjectModuleProgress(
          scenarioId = Some(scenario.id),
          questionnaireId = None,
          status = InProgress,
          questionsInProgressCount = None,
          requiredDocumentsCount = Some(0),
          openedRequiredDocumentsCount = Some(0)
        ),
        ParticipantProjectModuleProgress(
          scenarioId = None,
          questionnaireId = Some(projectModuleQuestionnaire.id),
          status = InProgress,
          questionsInProgressCount = Some(0),
          requiredDocumentsCount = None,
          openedRequiredDocumentsCount = None
        )
      )
      result.sortBy(_.scenarioId) mustBe expectedResult.sortBy(_.scenarioId)
    }
  }
}
