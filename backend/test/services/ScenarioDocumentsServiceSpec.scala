package services

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

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ScenarioDocumentsServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ScenarioDocumentsServiceSpec.openedRequiredDocumentsCount" should {

    "return empty result if no required documents exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioDocumentsService = inject[ScenarioDocumentsService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val action = scenarioDocumentsService.openedRequiredDocumentsCount(surveyInvitation.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe 0
    }

    "calculate the required documents count for emails" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val scenarioDocumentsService = inject[ScenarioDocumentsService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)
      val requiredEmails = createEmails(5, scenario.id, Required)
      val otherEmails = createEmails(5, scenario.id)
      val eventCreationsDataItems = Seq(
        (SurveyEventType.ShowEmail, ShowEmail(scenario.id, requiredEmails.head.id).asJson),
        (SurveyEventType.ShowEmail, ShowEmail(scenario.id, requiredEmails(1).id).asJson),
        (SurveyEventType.ShowEmail, ShowEmail(scenario.id, requiredEmails(2).id).asJson),
        (SurveyEventType.ShowEmail, ShowEmail(scenario.id, otherEmails.head.id).asJson),
        (SurveyEventType.ShowEmail, ShowEmail(scenario.id, otherEmails(3).id).asJson)
      )

      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = scenarioDocumentsService.openedRequiredDocumentsCount(surveyInvitation.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe 3
    }
  }
}
