package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ReferenceBookArticleServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ReferenceBookArticleService.reposition" should {

    "fail if the article does not exist" in {
      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val action = referenceBookArticleService.reposition(UUID.randomUUID(), None)

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "fail if the predecessor does not exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val Seq(_, article2, _) = createReferenceBookArticles(referenceBookChapter.id, 3)

      val action = referenceBookArticleService.reposition(article2.id, Some(UUID.randomUUID()))

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "move first article to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val Seq(article1, _, _) = createReferenceBookArticles(referenceBookChapter.id, 3)

      val action = referenceBookArticleService.reposition(article1.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an article to the first position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val Seq(_, article2, _) = createReferenceBookArticles(referenceBookChapter.id, 3)

      val action = referenceBookArticleService.reposition(article2.id, None)
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(0.5)
    }

    "move an article to the last position" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val Seq(_, article2, _, _, article5) = createReferenceBookArticles(referenceBookChapter.id, 5)

      val action = referenceBookArticleService.reposition(article2.id, Some(article5.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(6)
    }

    "move an article between two others" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookArticleService = inject[ReferenceBookArticleService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val Seq(article1, _, _, article4, _) = createReferenceBookArticles(referenceBookChapter.id, 5)

      val action = referenceBookArticleService.reposition(article4.id, Some(article1.id))
      val result = Await.result(action, Duration.Inf)

      result.position mustBe BigDecimal(1.5)
    }
  }
}
