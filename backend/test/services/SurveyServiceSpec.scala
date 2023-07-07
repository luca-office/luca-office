package services

import enums.ProjectModuleEndType.ByParticipant
import enums.SurveyEventType.{EndQuestionnaire, EndScenario, StartQuestionnaire, StartScenario}
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models.SurveyEventCreation
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import utils.DateUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class SurveyServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "SurveyServiceSpec.projectModuleProgresses" should {

    "respond with correct progress for one event" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val projectModule = createProjectModule(project.id, Some(scenario.id), None)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val eventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = StartScenario,
        index = 1,
        data = Some(models.StartScenario(scenario.id).asJson.toString)
      )
      Await.result(surveyEventService.createBulk(Seq(eventCreation)), Duration.Inf)

      val result = Await.result(surveyService.projectModuleProgresses(survey.id), Duration.Inf)

      result.head.projectModuleId mustBe projectModule.id
      result.head.inProgressParticipationsCount mustBe 1
      result.head.completedParticipationsCount mustBe 0
    }

    "respond with correct progress for two events" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val projectModule = createProjectModule(project.id, Some(scenario.id), None)
      val survey = createSurvey(project.id)
      val surveyInvitation = createSurveyInvitation(survey.id)
      val startEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = StartScenario,
        index = 1,
        data = Some(models.StartScenario(scenario.id).asJson.toString)
      )
      val endEventCreation = SurveyEventCreation(
        surveyId = survey.id,
        invitationId = surveyInvitation.id,
        timestamp = DateUtils.now,
        eventType = EndScenario,
        index = 2,
        data = Some(models.EndScenario(scenario.id, ByParticipant).asJson.toString)
      )
      Await.result(surveyEventService.createBulk(Seq(startEventCreation, endEventCreation)), Duration.Inf)

      val result = Await.result(surveyService.projectModuleProgresses(survey.id), Duration.Inf)

      result.head.projectModuleId mustBe projectModule.id
      result.head.inProgressParticipationsCount mustBe 0
      result.head.completedParticipationsCount mustBe 1
    }

    "respond with correct progress for multiple events" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val projectModule = createProjectModule(project.id, Some(scenario.id), None)
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)
      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            SurveyEventCreation(
              surveyId = survey.id,
              invitationId = surveyInvitation.id,
              timestamp = DateUtils.now,
              eventType = StartScenario,
              index = 1,
              data = Some(models.StartScenario(scenario.id).asJson.toString)
            ),
            SurveyEventCreation(
              surveyId = survey.id,
              invitationId = surveyInvitation.id,
              timestamp = DateUtils.now,
              eventType = EndScenario,
              index = 2,
              data = Some(models.EndScenario(scenario.id, ByParticipant).asJson.toString)
            )
          ))
        .dropRight(1)
      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(surveyService.projectModuleProgresses(survey.id), Duration.Inf)

      result.head.projectModuleId mustBe projectModule.id
      result.head.inProgressParticipationsCount mustBe 1
      result.head.completedParticipationsCount mustBe 2
    }

    "respond with correct progress for multiple questionnaire events" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val surveyEventService = inject[SurveyEventService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val questionnaire = createQuestionnaire(userAccount.id)
      val projectModule = createProjectModule(project.id, None, Some(questionnaire.id))
      val survey = createSurvey(project.id)
      val surveyInvitations = createSurveyInvitations(survey.id, 3)
      val eventCreations = surveyInvitations
        .flatMap(surveyInvitation =>
          Seq(
            SurveyEventCreation(
              surveyId = survey.id,
              invitationId = surveyInvitation.id,
              timestamp = DateUtils.now,
              eventType = StartQuestionnaire,
              index = 1,
              data = Some(models.StartQuestionnaire(questionnaire.id).asJson.toString)
            ),
            SurveyEventCreation(
              surveyId = survey.id,
              invitationId = surveyInvitation.id,
              timestamp = DateUtils.now,
              eventType = EndQuestionnaire,
              index = 2,
              data = Some(models.EndQuestionnaire(questionnaire.id, ByParticipant).asJson.toString)
            )
          ))
        .dropRight(1)
      Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val result = Await.result(surveyService.projectModuleProgresses(survey.id), Duration.Inf)

      result.head.projectModuleId mustBe projectModule.id
      result.head.inProgressParticipationsCount mustBe 1
      result.head.completedParticipationsCount mustBe 2
    }
  }

  "SurveyService.find" should {
    "return correct survey for surveyId if authorId matches userAccountId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val action = surveyService.find(survey.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(survey)
    }

    "return correct survey for surveyId if userAccountId is contributor to project" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val projectService = inject[ProjectService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      Await.result(projectService.inviteContributors(project.id, Seq(otherUserAccount.email)), Duration.Inf)

      val action = surveyService.find(survey.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(survey)
    }

    "return correct survey for surveyId if userAccountId is rater on survey" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      Await.result(surveyService.inviteRaters(survey.id, Seq(otherUserAccount.email)), Duration.Inf)

      val action = surveyService.find(survey.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(survey)
    }

    "return no survey for surveyId if authorId doesn't match userAccountId" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val action = surveyService.find(survey.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }
  }

  "SurveyService.all" should {
    "return all surveys for projectId if userAccountId is invited to project" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]
      val projectService = inject[ProjectService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val otherProject = createProject(otherUserAccount.id)
      val Seq(survey1, survey2, survey3) = createSurveys(otherProject.id, None, None, 3)

      Await.result(projectService.inviteContributors(otherProject.id, Seq(userAccount.email)), Duration.Inf)

      val action = surveyService.all(otherProject.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result.sortBy(_.id) mustBe Seq(survey1, survey2, survey3).sortBy(_.id)
    }

    "return no surveys for projectId if userAccountId isn't invited to project" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyService = inject[SurveyService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val otherProject = createProject(otherUserAccount.id)
      val Seq(_, _, _) = createSurveys(otherProject.id, None, None, 3)

      val action = surveyService.all(otherProject.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Seq()
    }
  }
}
