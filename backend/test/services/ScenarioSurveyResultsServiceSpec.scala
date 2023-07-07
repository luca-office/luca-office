package services

import enums.SurveyEventType
import io.circe.generic.auto._
import io.circe.syntax.EncoderOps
import models._
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import services.helpers.Factories.surveyEventCreationFactory

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ScenarioSurveyResultsServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ScenarioSurveyResultsServiceSpec.completionEmailWordCount" should {

    "return empty result if no completion email exists" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val action = scenarioSurveyResultsService.completionEmailWordCount(surveyInvitation.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Nil
    }

    "calculate the word count of a sent completion email" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val completionEmailAddress = "recipient@test.de"
      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id, Some(completionEmailAddress))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val texts = Seq(
        "At vero eos et accusam et justo duo dolores et ea rebum.",
        "At vero eos et accusam et justo duo dolores et ea rebum. S",
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita k",
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ta",
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      )
      val emailId = UUID.randomUUID()
      val otherEmailId = UUID.randomUUID()
      val eventCreationsDataItems = Seq(
        (SurveyEventType.CreateEmail, CreateEmail(scenario.id, emailId).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, emailId, completionEmailAddress, Nil, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(1)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(2)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(3)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts(2)).asJson),
        (SurveyEventType.SendEmail, SendEmail(scenario.id, otherEmailId, isCompletionEmail = false, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(4)).asJson),
        (SurveyEventType.SendEmail, SendEmail(scenario.id, emailId, isCompletionEmail = true, "").asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = scenarioSurveyResultsService.completionEmailWordCount(survey.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Seq(CompletionEmailWordCount(surveyInvitation.id, Some(26)))
    }

    "calculate the word count of a draft completion email" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val completionEmailAddress = "recipient@test.de"
      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id, Some(completionEmailAddress))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val previousEmailText =
        """> At vero eos et accusam et justo duo dolores et ea rebum.
          |> At vero eos et accusam et justo duo dolores et ea rebum.
          |> At vero eos et accusam et justo duo dolores et ea rebum.
          |
          |""".stripMargin
      val texts = Seq(
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum.",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. S",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita k",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ta",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      )
      val emailId = UUID.randomUUID()
      val otherEmailId = UUID.randomUUID()
      val eventCreationsDataItems = Seq(
        (SurveyEventType.CreateEmail, CreateEmail(scenario.id, emailId).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, emailId, completionEmailAddress, Nil, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(1)).asJson),
        (SurveyEventType.CreateEmail, CreateEmail(scenario.id, otherEmailId).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, otherEmailId, completionEmailAddress, Nil, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(2)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(3)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts(1)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(4)).asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = scenarioSurveyResultsService.completionEmailWordCount(survey.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Seq(CompletionEmailWordCount(surveyInvitation.id, Some(26)))
    }

    "calculate the word count of a draft completion email after recipient changes recipient address" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val surveyEventService = inject[SurveyEventService]
      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val completionEmailAddress = "recipient@test.de"
      val otherEmailAddress = "peterpetersen@test.de"
      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id, Some(completionEmailAddress))
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val previousEmailText =
        """> At vero eos et accusam et justo duo dolores et ea rebum.
          |> At vero eos et accusam et justo duo dolores et ea rebum.
          |> At vero eos et accusam et justo duo dolores et ea rebum.
          |
          |""".stripMargin
      val texts = Seq(
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum.",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. S",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita k",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea ta",
        previousEmailText ++ "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      )
      val emailId = UUID.randomUUID()
      val otherEmailId = UUID.randomUUID()
      val eventCreationsDataItems = Seq(
        (SurveyEventType.CreateEmail, CreateEmail(scenario.id, emailId).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, emailId, completionEmailAddress, Nil, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(1)).asJson),
        (SurveyEventType.CreateEmail, CreateEmail(scenario.id, otherEmailId).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, otherEmailId, completionEmailAddress, Nil, "").asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts.head).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(2)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(3)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, otherEmailId, texts(1)).asJson),
        (SurveyEventType.UpdateEmailText, UpdateEmailText(scenario.id, emailId, texts(4)).asJson),
        (SurveyEventType.UpdateEmail, UpdateEmail(scenario.id, emailId, otherEmailAddress, Nil, "").asJson)
      )
      val eventCreations = eventCreationsDataItems.zipWithIndex
        .map { case ((eventType, eventData), index) =>
          surveyEventCreationFactory(survey.id, surveyInvitation.id, eventType, index + 1, Some(eventData.toString))
        }
      val _ = Await.result(surveyEventService.createBulk(eventCreations), Duration.Inf)

      val action = scenarioSurveyResultsService.completionEmailWordCount(survey.id, scenario.id)
      val result = Await.result(action, Duration.Inf)
      /*
        email contains 13 words, otherEmail includes 26 words. Initially both have completionEmailAddress as receiver
        but a surveyEvent changes completionEmailAddress for otherEmail. So finalWordCount must be 13.
       */
      result mustBe Seq(CompletionEmailWordCount(surveyInvitation.id, Some(13)))
    }
  }

  "ScenarioSurveyResultsServiceSpec.scenarioFinalScore" should {

    "calculate the final score for a scenario without coding model" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val userAccount = createUserAccount
      val project = createProject(userAccount.id)
      val scenario = createScenario(userAccount.id)
      val survey = createSurvey(project.id)
      val Seq(surveyInvitation, _, _) = createSurveyInvitations(survey.id, 3)

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitation.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 0, 0, isComplete = false)
    }

    "calculate the final score for a scenario with coding model" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, _, _) = scenarioSetup()
      val _ = createManualCodingCriteria(3, manualCodingItems.head.id, 5)

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 0, 15, isComplete = false)
    }

    "calculate the final score for a scenario with score set to zero" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, _, rating) =
        scenarioSetup(manualCodingItemsCount = 1, automatedCodingItemsCount = 0)
      val _ = createManualCodingCriteria(3, manualCodingItems.head.id, 5)
      val _ = createScenarioCodingItemRating(
        rating.id,
        manualCodingItems.head.id,
        surveyInvitations.head.id,
        noCriterionFulfilled = true)

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 0, 15, isComplete = true)
    }

    "calculate the final score for a scenario with one selected manual criterion" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, _, rating) =
        scenarioSetup(manualCodingItemsCount = 1, automatedCodingItemsCount = 0)
      val criteria = createManualCodingCriteria(3, manualCodingItems.head.id, 5)
      val scenarioCodingItemRating =
        createScenarioCodingItemRating(rating.id, manualCodingItems.head.id, surveyInvitations.head.id)
      val _ = createScenarioRatingCriterionSelection(scenarioCodingItemRating.id, Some(criteria.head.id), None)

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 5, 15, isComplete = true)
    }

    "calculate the final score for a scenario with three manual coding items and one selected manual criterion" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, _, rating) = scenarioSetup()
      val criteria = createManualCodingCriteria(3, manualCodingItems.head.id, 5)
      val scenarioCodingItemRating =
        createScenarioCodingItemRating(rating.id, manualCodingItems.head.id, surveyInvitations.head.id)
      val _ = createScenarioRatingCriterionSelection(scenarioCodingItemRating.id, Some(criteria.head.id), None)

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 5, 15, isComplete = false)
    }

    "calculate the final score for a scenario with one selected automated criterion" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, _, automatedCodingItems, rating) =
        scenarioSetup(manualCodingItemsCount = 0, automatedCodingItemsCount = 1)
      val criteria = createScenarioCodingAutomatedCodingCriteria(3, automatedCodingItems.head.id, 3)
      val scenarioCodingItemRating =
        createScenarioCodingItemRating(rating.id, automatedCodingItems.head.id, surveyInvitations.head.id)
      val _ = createScenarioRatingCriterionSelection(scenarioCodingItemRating.id, None, Some(criteria.head.id))

      val action = scenarioSurveyResultsService.scenarioFinalScore(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe ScenarioScore(scenario.id, 3, 9, isComplete = true)
    }

    "return correct selected criteria ids for manual item" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, _, rating) =
        scenarioSetup(automatedCodingItemsCount = 0)
      val manualCriteria = createManualCodingCriteria(3, manualCodingItems.head.id, 5)
      val scenarioManualCodingItemRating =
        createScenarioCodingItemRating(rating.id, manualCodingItems.head.id, surveyInvitations.head.id)
      val _ =
        createScenarioRatingCriterionSelection(scenarioManualCodingItemRating.id, Some(manualCriteria.head.id), None)
      val scenarioManualCodingItemRating2 =
        createScenarioCodingItemRating(rating.id, manualCodingItems.head.id, surveyInvitations(2).id)
      val _ =
        createScenarioRatingCriterionSelection(scenarioManualCodingItemRating2.id, Some(manualCriteria.head.id), None)

      val action = scenarioSurveyResultsService
        .participantScenarioResult(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result.codingItemResults
        .map(_.selectedCriteriaIds) mustBe Seq(Seq(manualCriteria.head.id), Nil, Nil)
    }

    "return correct selected criteria ids for automated item" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, _, automatedCodingItems, rating) =
        scenarioSetup(manualCodingItemsCount = 0)
      val automatedCriteria = createScenarioCodingAutomatedCodingCriteria(3, automatedCodingItems.head.id, 7)
      val scenarioAutomatedCodingItemRating1 =
        createScenarioCodingItemRating(rating.id, automatedCodingItems.head.id, surveyInvitations.head.id)
      val _ = createScenarioRatingCriterionSelection(
        scenarioAutomatedCodingItemRating1.id,
        None,
        Some(automatedCriteria.head.id))
      val scenarioAutomatedCodingItemRating2 =
        createScenarioCodingItemRating(rating.id, automatedCodingItems.head.id, surveyInvitations(2).id)
      val _ = createScenarioRatingCriterionSelection(
        scenarioAutomatedCodingItemRating2.id,
        None,
        Some(automatedCriteria.head.id))

      val action = scenarioSurveyResultsService
        .participantScenarioResult(survey.id, surveyInvitations.head.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result.codingItemResults
        .map(_.selectedCriteriaIds) mustBe Seq(Seq(automatedCriteria.head.id), Nil, Nil)
    }

    "calculate correct participants scenario survey result for scenario" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val scenarioSurveyResultsService = inject[ScenarioSurveyResultsService]

      val (survey, surveyInvitations, scenario, manualCodingItems, automatedCodingItems, rating) =
        scenarioSetup(manualCodingItemsCount = 1, automatedCodingItemsCount = 1)
      val automatedCriterion = createScenarioCodingAutomatedCodingCriterion(automatedCodingItems.head.id, 6)
      val scenarioAutomatedCodingItemRating1 =
        createScenarioCodingItemRating(rating.id, automatedCodingItems.head.id, surveyInvitations.head.id)
      val _ = createScenarioRatingCriterionSelection(
        scenarioCodingItemRatingId = scenarioAutomatedCodingItemRating1.id,
        manualCriterionId = None,
        automatedCriterionId = Some(automatedCriterion.id))
      val scenarioAutomatedCodingItemRating2 =
        createScenarioCodingItemRating(rating.id, automatedCodingItems.head.id, surveyInvitations(2).id)
      val _ = createScenarioRatingCriterionSelection(
        scenarioCodingItemRatingId = scenarioAutomatedCodingItemRating2.id,
        manualCriterionId = None,
        automatedCriterionId = Some(automatedCriterion.id))
      val manualCriterion = createManualCodingCriterion(manualCodingItems.head.id, 6)
      val scenarioManualCodingItemRating =
        createScenarioCodingItemRating(rating.id, manualCodingItems.head.id, surveyInvitations(2).id)
      val _ =
        createScenarioRatingCriterionSelection(scenarioManualCodingItemRating.id, Some(manualCriterion.id), None)

      val action = scenarioSurveyResultsService.participantsScenarioResult(survey.id, scenario.id)
      val result = Await.result(action, Duration.Inf)

      result mustBe Seq(
        ParticipantScenarioSurveyResult(
          surveyInvitationId = surveyInvitations.head.id,
          scenarioId = scenario.id,
          codingItemResults = Seq(
            ParticipantCodingItemSurveyResult(
              itemId = scenarioManualCodingItemRating.codingItemId,
              score = 0,
              maximumScore = 6,
              averageScore = 2,
              selectedCriteriaIds = Seq(),
              noCriterionFulfilled = false),
            ParticipantCodingItemSurveyResult(
              itemId = scenarioAutomatedCodingItemRating1.codingItemId,
              score = 6,
              maximumScore = 6,
              averageScore = 4,
              selectedCriteriaIds = Seq(automatedCriterion.id),
              noCriterionFulfilled = false
            )
          )
        ),
        ParticipantScenarioSurveyResult(
          surveyInvitationId = surveyInvitations(1).id,
          scenarioId = scenario.id,
          codingItemResults = Seq(
            ParticipantCodingItemSurveyResult(
              itemId = scenarioManualCodingItemRating.codingItemId,
              score = 0,
              maximumScore = 6,
              averageScore = 2,
              selectedCriteriaIds = Seq(),
              noCriterionFulfilled = false),
            ParticipantCodingItemSurveyResult(
              itemId = scenarioAutomatedCodingItemRating1.codingItemId,
              score = 0,
              maximumScore = 6,
              averageScore = 4,
              selectedCriteriaIds = Seq(),
              noCriterionFulfilled = false)
          )
        ),
        ParticipantScenarioSurveyResult(
          surveyInvitationId = surveyInvitations(2).id,
          scenarioId = scenario.id,
          codingItemResults = Seq(
            ParticipantCodingItemSurveyResult(
              itemId = scenarioManualCodingItemRating.codingItemId,
              score = 6,
              maximumScore = 6,
              averageScore = 2,
              selectedCriteriaIds = Seq(manualCriterion.id),
              noCriterionFulfilled = false
            ),
            ParticipantCodingItemSurveyResult(
              itemId = scenarioAutomatedCodingItemRating1.codingItemId,
              score = 6,
              maximumScore = 6,
              averageScore = 4,
              selectedCriteriaIds = Seq(automatedCriterion.id),
              noCriterionFulfilled = false
            )
          )
        )
      )
    }
  }

  private def scenarioSetup(manualCodingItemsCount: Int = 3, automatedCodingItemsCount: Int = 3) = {
    val creationUtils = inject[CreationUtils]

    import creationUtils._

    val ratingService = inject[RatingService]

    val userAccount = createUserAccount
    val project = createProject(userAccount.id)
    val scenario = createScenario(userAccount.id)
    val _ = createProjectModule(project.id, Some(scenario.id), None)
    val codingModel = createCodingModel(scenario.id)
    val codingDimensions = createCodingDimensions(codingModel.id, None, 3)
    val manualCodingItems = createManualCodingItems(manualCodingItemsCount, codingDimensions.head.id)
    val automatedCodingItems = createAutomatedCodingItems(automatedCodingItemsCount, codingDimensions.head.id)
    val survey = createSurvey(project.id)
    val surveyInvitations = createSurveyInvitations(survey.id, 3)
    val rating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get

    (survey, surveyInvitations, scenario, manualCodingItems, automatedCodingItems, rating)
  }
}
