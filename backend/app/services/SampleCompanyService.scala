package services

import database.DatabaseContext
import database.generated.public.{SampleCompany, UserAccount}
import models.{DirectoryCreation, SampleCompanyCreation, SampleCompanyUpdate}
import services.Utils.defaultErrorHandler
import services.actions.{CreateSampleCompany, DuplicateSampleCompany}
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SampleCompanyService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends SampleCompanyServiceActions
    with DefaultUpdateSampleCompany
    with DefaultDeleteSampleCompany
    with CreateSampleCompany
    with DuplicateSampleCompany {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(userAccount: UserAccount): Future[Seq[SampleCompany]] =
    performIO(allSampleCompaniesAction(userAccount))

  def find(id: UUID, userAccount: UserAccount): Future[Option[SampleCompany]] =
    performIO(findSampleCompanyAction(id, userAccount))

  def findWithoutUserAccount(id: UUID): Future[Option[SampleCompany]] =
    performIO(findSampleCompanyWithoutUserAccountAction(id))

  def create(userAccountId: UUID)(creation: SampleCompanyCreation): Future[SampleCompany] = {
    val action = for {
      sampleCompany <- runIO(createSampleCompanyQuotation(userAccountId)(creation))
      _ <- runIO(
        createDirectoryQuotation(
          DirectoryCreation(
            name = "",
            parentDirectoryId = None,
            scenarioId = None,
            sampleCompanyId = Some(sampleCompany.id))))
    } yield sampleCompany

    performIO(action.transactional).recover(defaultErrorHandler)
  }

  def update(id: UUID, update: SampleCompanyUpdate): Future[SampleCompany] =
    performIO(updateSampleCompanyAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteSampleCompanyAction(id))

  def archive(id: UUID, userAccount: UserAccount): Future[SampleCompany] = {
    val action =
      findSampleCompanyAction(id, userAccount).flatMap {
        case Some(sampleCompany) =>
          if (!userAccount.mayArchive && !userAccount.isGlobalSuperAdmin && userAccount.id != sampleCompany.authorId)
            IO.failed(InsufficientRights)
          if (sampleCompany.publishedAt.isEmpty)
            IO.failed(EntityNotPublished)
          else if (sampleCompany.archivedAt.isDefined)
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
      findSampleCompanyQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(timestamp),
          _.archivedAt -> lift(Some(timestamp): Option[Instant])
        )
        .returning(sampleCompany => sampleCompany))
  }

  def publish(id: UUID, userAccount: UserAccount): Future[SampleCompany] =
    performIO(publishAction(id, userAccount))
      .recover(defaultErrorHandler)

  private def publishAction(id: UUID, userAccount: UserAccount) =
    findSampleCompanyAction(id, userAccount).flatMap {
      case Some(sampleCompany) =>
        if (sampleCompany.publishedAt.isDefined)
          IO.failed(EntityAlreadyPublished)
        else if (!isPublishingAllowed(sampleCompany))
          IO.failed(CustomError(publishingErrorMessage))
        else
          runIO(publishQuotation(id, userAccount))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def publishQuotation(id: UUID, userAccount: UserAccount) =
    quote(
      findSampleCompanyQuotation(id, userAccount)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.publishedAt -> lift(Some(DateUtils.now): Option[Instant])
        )
        .returning(sampleCompany => sampleCompany))

  def duplicate(userAccount: UserAccount)(id: UUID): Future[SampleCompany] =
    performIO(duplicateSampleCompanyAction(userAccount)(id))
      .recover(defaultErrorHandler)

  private def isPublishingAllowed(sampleCompany: SampleCompany) =
    Seq(sampleCompany.logoFileId, sampleCompany.profileFileId).forall(_.isDefined)

  private val publishingErrorMessage =
    "At least one of the required properties logoFileId or profileFileId is not defined"
}

trait SampleCompanyServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def sampleCompanyBaseQuotation(userAccount: UserAccount) =
    if (userAccount.isGlobalSuperAdmin)
      quote(query[SampleCompany])
    else
      quote(
        query[SampleCompany]
          .filter(row => row.authorId == lift(userAccount.id) || row.publishedAt.isDefined)
      )

  def allSampleCompaniesAction(userAccount: UserAccount): context.IO[Seq[SampleCompany], Effect.Read] =
    runIO(allSampleCompaniesQuotation(userAccount))

  def allSampleCompaniesQuotation(userAccount: UserAccount) = {
    val baseQuery =
      if (userAccount.isGlobalSuperAdmin)
        quote(query[SampleCompany])
      else
        sampleCompanyBaseQuotation(userAccount)

    quote(
      baseQuery
        .filter(row => row.archivedAt.isEmpty)
    )
  }

  def findSampleCompanyAction(id: UUID, userAccount: UserAccount): context.IO[Option[SampleCompany], Effect.Read] =
    runIO(findSampleCompanyQuotation(id, userAccount)).map(_.headOption)

  def findSampleCompanyQuotation(id: UUID, userAccount: UserAccount) =
    quote(sampleCompanyBaseQuotation(userAccount).filter(_.id == lift(id)))

  def findSampleCompanyWithoutUserAccountAction(id: UUID): context.IO[Option[SampleCompany], Effect.Read] =
    runIO(findSampleCompanyWithoutUserAccountQuotation(id)).map(_.headOption)

  def findSampleCompanyWithoutUserAccountQuotation(id: UUID) =
    quote(query[SampleCompany].filter(_.id == lift(id)))
}
