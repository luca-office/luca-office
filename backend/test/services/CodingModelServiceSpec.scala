package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class CodingModelServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "CodingModelServiceSpec.duplicate" should {

    "fail if the coding model does not exist" in {
      val codingModelService = inject[CodingModelService]

      val action = codingModelService.duplicate(UUID.randomUUID(), UUID.randomUUID())
      val result = intercept[ApiError](Await.result(action, Duration.Inf))

      result mustBe EntityNotFound
    }

    "duplicate a coding model and its dimensions" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingModelService = inject[CodingModelService]
      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, scenario2, _) = createScenarios(3, userAccount.id)
      val codingModel = createCodingModel(scenario1.id)
      val mainCodingDimensions = createCodingDimensions(codingModel.id, None, 3)
      val _ = createCodingDimensions(codingModel.id, Some(mainCodingDimensions.head.id), 2)

      val action = codingModelService.duplicate(codingModel.id, scenario2.id)
      val duplicatedCodingModel = Await.result(action, Duration.Inf)
      val duplicatedCodingDimensions = Await.result(codingDimensionService.all(duplicatedCodingModel.id), Duration.Inf)

      duplicatedCodingModel.title mustBe codingModel.title
      duplicatedCodingModel.description mustBe codingModel.description
      duplicatedCodingModel.scenarioId mustBe scenario2.id
      duplicatedCodingDimensions.length mustBe 5
      duplicatedCodingDimensions.flatMap(_.parentDimensionId).forall(mainCodingDimensions.map(_.id).contains)
    }
  }
}
