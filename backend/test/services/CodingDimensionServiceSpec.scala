package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class CodingDimensionServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "CodingDimensionService.reposition" should {

    "fail if the item does not exist" in {
      val codingDimensionService = inject[CodingDimensionService]

      val action = codingDimensionService.reposition(UUID.randomUUID(), None)

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "fail if the predecessor does not exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val Seq(codingModel1, _, _) = createCodingModels(scenario1.id, 3)
      val codingDimension1 = createCodingDimension(codingModel1.id, None)

      val action = codingDimensionService.reposition(codingDimension1.id, Some(UUID.randomUUID()))

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "move first item to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val Seq(codingModel1, _, _) = createCodingModels(scenario1.id, 3)
      val codingDimension1 = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)

      val action = codingDimensionService.reposition(codingDimension1.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an item to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val Seq(codingModel1, _, _) = createCodingModels(scenario1.id, 3)
      val _ = createCodingDimension(codingModel1.id, None)
      val codingDimension2 = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)

      val action = codingDimensionService.reposition(codingDimension2.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an item to the last position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val Seq(codingModel1, _, _) = createCodingModels(scenario1.id, 3)
      val _ = createCodingDimension(codingModel1.id, None)
      val codingDimension2 = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val codingDimension5 = createCodingDimension(codingModel1.id, None)

      val action = codingDimensionService.reposition(codingDimension2.id, Some(codingDimension5.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(6)
    }

    "move an item between two others" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val codingDimensionService = inject[CodingDimensionService]

      val userAccount = createUserAccount
      val Seq(scenario1, _, _) = createScenarios(3, userAccount.id)
      val Seq(codingModel1, _, _) = createCodingModels(scenario1.id, 3)
      val codingDimension1 = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val codingDimension4 = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)
      val _ = createCodingDimension(codingModel1.id, None)

      val action = codingDimensionService.reposition(codingDimension4.id, Some(codingDimension1.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(1.5)
    }
  }
}
