package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils

import java.util.UUID
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ReferenceBookChapterServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ReferenceBookChapterService.duplicate" should {

    "fail if the reference book chapter does not exist" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]

      val userAccount = createUserAccount

      val action = referenceBookChapterService.duplicate(UUID.randomUUID(), userAccount)

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "duplicate an empty reference book chapter" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      referenceBookChapterService.publish(referenceBookChapter.id, userAccount)

      val action = referenceBookChapterService.duplicate(referenceBookChapter.id, userAccount)
      val result = Await.result(action, Duration.Inf)

      result mustBe referenceBookChapter.copy(
        id = result.id,
        createdAt = result.createdAt,
        modifiedAt = result.modifiedAt,
        publishedAt = None,
        authorId = userAccount.id
      )
    }

    "duplicate a reference book chapter with articles and contents" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]
      val referenceBookArticleService = inject[ReferenceBookArticleService]
      val referenceBookContentService = inject[ReferenceBookContentService]

      val userAccount = createUserAccount
      val referenceBookChapter = createReferenceBookChapter(userAccount.id)
      val articles = createReferenceBookArticles(referenceBookChapter.id, 2)
      val Seq(article1, article2) = articles
      val contents1 = createReferenceBookContents(article1.id, 2)
      val contents2 = createReferenceBookContents(article2.id, 2)

      val duplicatedReferenceBookChapter =
        Await.result(referenceBookChapterService.duplicate(referenceBookChapter.id, userAccount), Duration.Inf)
      val duplicatedArticles =
        Await.result(
          referenceBookArticleService.allReferenceBookArticles(duplicatedReferenceBookChapter.id),
          Duration.Inf)
      val Seq(duplicatedArticle1, duplicatedArticle2) = duplicatedArticles
      val duplicatedContents1 =
        Await.result(referenceBookContentService.allReferenceBookContents(duplicatedArticle1.id), Duration.Inf)
      val duplicatedContents2 =
        Await.result(referenceBookContentService.allReferenceBookContents(duplicatedArticle2.id), Duration.Inf)

      duplicatedReferenceBookChapter mustBe referenceBookChapter.copy(
        id = duplicatedReferenceBookChapter.id,
        createdAt = duplicatedReferenceBookChapter.createdAt,
        modifiedAt = duplicatedReferenceBookChapter.modifiedAt,
        publishedAt = None,
        authorId = userAccount.id
      )

      articles.length mustBe duplicatedArticles.length

      Seq(article1, article2)
        .sortBy(_.position)
        .zip(Seq(duplicatedArticle1, duplicatedArticle2).sortBy(_.position))
        .foreach { case (article, duplicatedArticle) =>
          duplicatedArticle mustBe article.copy(
            id = duplicatedArticle.id,
            createdAt = duplicatedArticle.createdAt,
            modifiedAt = duplicatedArticle.modifiedAt,
            referenceBookChapterId = duplicatedArticle.referenceBookChapterId
          )
        }

      (contents1 ++ contents2)
        .sortBy(_.position)
        .zip((duplicatedContents1 ++ duplicatedContents2).sortBy(_.position))
        .foreach { case (content, duplicatedContent) =>
          duplicatedContent mustBe content.copy(
            id = duplicatedContent.id,
            createdAt = duplicatedContent.createdAt,
            modifiedAt = duplicatedContent.modifiedAt,
            referenceBookArticleId = duplicatedContent.referenceBookArticleId
          )
        }
    }
  }

  "ReferenceBookChapterService.find" should {
    "return correct chapter for chapterId if authorId and userAccountId match" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]

      val Seq(userAccount, _) = createUserAccounts(2)
      val Seq(referenceBookChapter, _) = createReferenceBookChapters(userAccount.id, 2)

      val action = referenceBookChapterService.find(referenceBookChapter.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(referenceBookChapter)
    }

    "return no chapter for chapterId if authorId and userAccountId don't match" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val Seq(referenceBookChapter, _) = createReferenceBookChapters(userAccount.id, 2)

      val action = referenceBookChapterService.find(referenceBookChapter.id, otherUserAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe None
    }

    "return chapter for chapterId if authorId and userAccountId don't match if chapter is published" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]

      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val Seq(referenceBookChapter, _) = createReferenceBookChapters(otherUserAccount.id, 2)

      val publish = referenceBookChapterService.publish(referenceBookChapter.id, otherUserAccount)
      val publishedChapter = Await.result(publish, Duration.Inf)

      val action = referenceBookChapterService.find(publishedChapter.id, userAccount)
      val result = Await.result(action, Duration.Inf)
      result mustBe Some(publishedChapter)
    }
  }

  "ReferenceBookChapterService.all" should {
    "return all reference book chapters that are published or userAccount has created" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val referenceBookChapterService = inject[ReferenceBookChapterService]
      val Seq(userAccount, otherUserAccount) = createUserAccounts(2)
      val Seq(referenceBookChapter, referenceBookChapter2) = createReferenceBookChapters(userAccount.id, 2)
      val Seq(otherReferenceBookChapter, _) = createReferenceBookChapters(otherUserAccount.id, 2)

      val publish = referenceBookChapterService.publish(otherReferenceBookChapter.id, otherUserAccount)
      val publishedChapter = Await.result(publish, Duration.Inf)

      val action = referenceBookChapterService.all(userAccount)
      val result = Await.result(action, Duration.Inf)
      result.sortBy(_.id) mustBe Seq(referenceBookChapter, referenceBookChapter2, publishedChapter).sortBy(_.id)
    }
  }
}
