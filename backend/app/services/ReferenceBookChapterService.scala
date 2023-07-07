package services

import database.DatabaseContext
import database.generated.public.{ReferenceBookChapter, UserAccount}
import models.{ReferenceBookChapterCreation, ReferenceBookChapterUpdate}
import services.Utils.defaultErrorHandler
import services.converters.ReferenceBookArticleConverter.toReferenceBookArticleCreation
import services.converters.ReferenceBookChapterConverter.{toReferenceBookChapter, toReferenceBookChapterCreation}
import services.converters.ReferenceBookContentConverter.toReferenceBookContentCreation
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ReferenceBookChapterService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends ReferenceBookChapterServiceActions
    with DefaultUpdateReferenceBookChapter
    with DefaultAllReferenceBookArticle
    with CreateBulkReferenceBookArticle
    with DefaultAllReferenceBookContent
    with CreateBulkReferenceBookContent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(userAccount: UserAccount): Future[Seq[ReferenceBookChapter]] =
    performIO(allReferenceBookChaptersAction(userAccount))

  def find(id: UUID, userAccount: UserAccount): Future[Option[ReferenceBookChapter]] =
    performIO(findReferenceBookChapterAction(id, userAccount))

  def create(userAccountId: UUID)(creation: ReferenceBookChapterCreation): Future[ReferenceBookChapter] =
    run(createQuotation(userAccountId)(creation))
      .recover(defaultErrorHandler)

  private def createQuotation(userAccountId: UUID)(creation: ReferenceBookChapterCreation) =
    quote(
      query[ReferenceBookChapter]
        .insert(lift(toReferenceBookChapter(creation, userAccountId)))
        .returning(referenceBookChapter => referenceBookChapter))

  def update(id: UUID, update: ReferenceBookChapterUpdate): Future[ReferenceBookChapter] =
    performIO(updateReferenceBookChapterAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID, userAccount: UserAccount): Future[UUID] =
    performIO(deleteAction(id, userAccount))

  private def deleteAction(id: UUID, userAccount: UserAccount) =
    findReferenceBookChapterAction(id, userAccount).flatMap {
      case Some(referenceBookChapter) if referenceBookChapter.publishedAt.isEmpty =>
        runIO(deleteQuotation(id))
      case Some(_) =>
        IO.failed(EntityAlreadyPublished)
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def deleteQuotation(id: UUID) =
    quote(
      query[ReferenceBookChapter]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))

  def publish(id: UUID, userAccount: UserAccount): Future[ReferenceBookChapter] =
    performIO(publishAction(id, userAccount))
      .recover(defaultErrorHandler)

  private def publishAction(id: UUID, userAccount: UserAccount) =
    findReferenceBookChapterAction(id, userAccount).flatMap {
      case Some(referenceBookChapter) =>
        if (referenceBookChapter.publishedAt.isDefined)
          IO.failed(EntityAlreadyPublished)
        else
          runIO(publishQuotation(id, userAccount))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def publishQuotation(id: UUID, userAccount: UserAccount) = {
    val now = DateUtils.now
    quote(
      findReferenceBookChapterQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(now),
          _.publishedAt -> lift(Some(now): Option[Instant])
        )
        .returning(referenceBookChapter => referenceBookChapter))
  }

  def archive(id: UUID, userAccount: UserAccount): Future[ReferenceBookChapter] = {
    val action =
      findReferenceBookChapterAction(id, userAccount).flatMap {
        case Some(referenceBookChapter) =>
          if (!userAccount.mayArchive && !userAccount.isGlobalSuperAdmin && userAccount.id != referenceBookChapter.authorId)
            IO.failed(InsufficientRights)
          if (referenceBookChapter.publishedAt.isEmpty)
            IO.failed(EntityNotPublished)
          else if (referenceBookChapter.archivedAt.isDefined)
            IO.failed(EntityAlreadyArchived)
          else
            runIO(archiveQuotation(id, userAccount))
        case _ =>
          IO.failed(EntityNotFound)
      }

    performIO(action).recover(defaultErrorHandler)
  }

  private def archiveQuotation(id: UUID, userAccount: UserAccount) = {
    val timestamp = DateUtils.now
    quote(
      findReferenceBookChapterQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(timestamp),
          _.archivedAt -> lift(Some(timestamp): Option[Instant])
        )
        .returning(referenceBookChapter => referenceBookChapter))
  }

  def duplicate(id: UUID, userAccount: UserAccount): Future[ReferenceBookChapter] =
    performIO(duplicateAction(id, userAccount).transactional).recover(defaultErrorHandler)

  private def duplicateAction(id: UUID, userAccount: UserAccount) =
    findReferenceBookChapterAction(id, userAccount).flatMap {
      case Some(referenceBookChapter) =>
        for {
          duplicatedReferenceBookChapter <-
            runIO(createQuotation(userAccount.id)(toReferenceBookChapterCreation(referenceBookChapter)))
          _ <- duplicateArticlesAction(id, duplicatedReferenceBookChapter.id)
        } yield duplicatedReferenceBookChapter
      case None =>
        IO.failed(EntityNotFound)
    }

  private def duplicateArticlesAction(referenceBookChapterId: UUID, duplicatedReferenceBookChapterId: UUID) =
    for {
      articles <- runIO(allReferenceBookArticlesQuotation(referenceBookChapterId))
      duplicatedArticles <- runIO(
        createBulkReferenceBookArticleQuotation(
          articles.map(article =>
            (
              toReferenceBookArticleCreation(article).copy(referenceBookChapterId = duplicatedReferenceBookChapterId),
              article.position))))
      articlePairs = articles.sortBy(_.position).zip(duplicatedArticles.sortBy(_.position))
      _ <- IO.sequence(articlePairs.map { case (article, duplicatedArticle) =>
        duplicateContentsAction(article.id, duplicatedArticle.id)
      })
    } yield ()

  private def duplicateContentsAction(articleId: UUID, duplicatedArticleId: UUID) =
    runIO(allReferenceBookContentsQuotation(articleId)).flatMap(contents =>
      runIO(
        createBulkReferenceBookContentQuotation(
          contents.map(content =>
            (
              toReferenceBookContentCreation(content).copy(referenceBookArticleId = duplicatedArticleId),
              content.position)))))
}

trait ReferenceBookChapterServiceActions {

  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def referenceBookChapterBaseQuotation(userAccount: UserAccount) =
    if (userAccount.isGlobalSuperAdmin)
      quote(query[ReferenceBookChapter])
    else
      quote(
        query[ReferenceBookChapter]
          .filter(row => row.authorId == lift(userAccount.id) || row.publishedAt.isDefined)
      )

  def allReferenceBookChaptersAction(userAccount: UserAccount): context.IO[Seq[ReferenceBookChapter], Effect.Read] =
    if (userAccount.isGlobalSuperAdmin)
      runIO(quote(query[ReferenceBookChapter]))
    else
      runIO(allReferenceBookChaptersQuotation(userAccount))

  def allReferenceBookChaptersQuotation(userAccount: UserAccount) =
    quote(
      referenceBookChapterBaseQuotation(userAccount)
        .filter(row => row.archivedAt.isEmpty)
    )

  def findReferenceBookChapterAction(
      id: UUID,
      userAccount: UserAccount): context.IO[Option[ReferenceBookChapter], Effect.Read] =
    runIO(findReferenceBookChapterQuotation(id, userAccount)).map(_.headOption)

  def findReferenceBookChapterQuotation(id: UUID, userAccount: UserAccount) =
    quote(referenceBookChapterBaseQuotation(userAccount).filter(_.id == lift(id)))
}
