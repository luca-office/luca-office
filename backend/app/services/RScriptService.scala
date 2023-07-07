package services

import database.DatabaseContext
import database.generated.public.{RScript, ScenarioCodingAutomatedCriterion, UserAccount}
import models.{RScriptCreation, RScriptUpdate}
import services.Utils.defaultErrorHandler
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class RScriptService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllRScript
    with DefaultFindRScript
    with DefaultCreateRScript
    with DefaultUpdateRScript
    with DefaultDeleteRScript {
  val context = databaseContext

  import context._
  import database.Encoders._

  def all: Future[Seq[RScript]] =
    performIO(allRScriptsAction)

  def find(id: UUID): Future[Option[RScript]] =
    performIO(findRScriptAction(id))

  def create(userAccount: UserAccount)(creation: RScriptCreation): Future[RScript] =
    performIO(runIfAuthorized(userAccount)(createRScriptAction(creation)))
      .recover(defaultErrorHandler)

  def update(userAccount: UserAccount)(id: UUID, update: RScriptUpdate): Future[RScript] =
    performIO(runIfAuthorized(userAccount)(runIfIsEditable(id, updateRScriptAction(id, update))))
      .recover(defaultErrorHandler)

  def delete(userAccount: UserAccount)(id: UUID): Future[UUID] =
    performIO(runIfAuthorized(userAccount)(runIfIsEditable(id, deleteRScriptAction(id))))

  private def runIfAuthorized[T](userAccount: UserAccount)(action: IO[T, Effect.Read with Effect.Write]) =
    if (userAccount.mayAdministrateRScripts || userAccount.isGlobalSuperAdmin)
      action
    else
      IO.failed(InsufficientRights)

  private def runIfIsEditable[T](id: UUID, action: IO[T, Effect.Write]) =
    isEditableAction(id).flatMap(isEditable =>
      if (isEditable) action
      else IO.failed(EntityIsInUse))

  def archive(userAccount: UserAccount)(id: UUID): Future[RScript] = {
    val action = findRScriptAction(id).flatMap {
      case Some(rScript) =>
        if (rScript.archivedAt.isDefined)
          IO.failed(EntityAlreadyArchived)
        else
          runIO(archiveQuotation(id))
      case _ =>
        IO.failed(EntityNotFound)
    }

    if ((userAccount.mayAdministrateRScripts && userAccount.mayArchive) || userAccount.isGlobalSuperAdmin)
      performIO(action).recover(defaultErrorHandler)
    else
      Future.failed(InsufficientRights)
  }

  private def archiveQuotation(id: UUID) = {
    val timestamp = DateUtils.now
    quote(
      findRScriptQuotation(id)
        .update(
          _.modifiedAt -> lift(timestamp),
          _.archivedAt -> lift(Some(timestamp): Option[Instant])
        )
        .returning(rScript => rScript))
  }

  def isEditable(id: UUID): Future[Boolean] =
    performIO(isEditableAction(id))

  private def isEditableAction(id: UUID): IO[Boolean, Effect.Read] =
    runIO(query[ScenarioCodingAutomatedCriterion].filter(_.rScriptId.contains(lift(id))).isEmpty)
}
