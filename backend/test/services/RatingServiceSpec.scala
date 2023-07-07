package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class RatingServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "RatingServiceSpec.finalize" should {

    "finalize all not finalized ratings of the survey if called for final score rating" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val ratingService = inject[RatingService]

      val userAccounts = createUserAccounts(10)
      val userAccount = userAccounts.head
      val project = createProject(userAccount.id)
      val survey = createSurvey(project.id)

      val finalScoreRating = Await.result(ratingService.all(survey.id), Duration.Inf).find(_.isFinalScore).get
      val rating1 = createRating(userAccount.id, survey.id)
      val rating2 = createRating(userAccounts(2).id, survey.id)
      val rating3 = createRating(userAccounts(3).id, survey.id)
      val rating4 = createRating(userAccounts(4).id, survey.id)
      val rating5 = createRating(userAccounts(5).id, survey.id)

      Await.result(ratingService.finalize(userAccount.id)(rating1.id), Duration.Inf)
      Await.result(ratingService.finalize(userAccounts(3).id)(rating3.id), Duration.Inf)

      val finalizedFinalScoreRating =
        Await.result(ratingService.finalize(userAccount.id)(finalScoreRating.id), Duration.Inf)
      val finalizedRatings = Await.result(ratingService.all(survey.id), Duration.Inf).sortBy(_.id)

      finalizedRatings.foreach(resultRating => resultRating.finalizedAt mustBe defined)

      finalizedRatings.find(_.id == rating1.id).get.finalizedAt must not be finalizedFinalScoreRating.finalizedAt
      finalizedRatings.find(_.id == rating2.id).get.finalizedAt mustBe finalizedFinalScoreRating.finalizedAt
      finalizedRatings.find(_.id == rating3.id).get.finalizedAt must not be finalizedFinalScoreRating.finalizedAt
      finalizedRatings.find(_.id == rating4.id).get.finalizedAt mustBe finalizedFinalScoreRating.finalizedAt
      finalizedRatings.find(_.id == rating5.id).get.finalizedAt mustBe finalizedFinalScoreRating.finalizedAt
    }
  }
}
