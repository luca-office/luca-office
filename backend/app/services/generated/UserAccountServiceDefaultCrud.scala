package services.generated

import database.DatabaseContext
import database.generated.public.UserAccount
import models.UserAccountUpdate
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allUserAccountsAction =
    runIO(allUserAccountsQuotation)

  def allUserAccountsQuotation =
    quote(query[UserAccount])
}

trait DefaultFindUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findUserAccountAction(id: UUID) =
    runIO(findUserAccountQuotation(id)).map(_.headOption)

  def findUserAccountQuotation(id: UUID) =
    quote(query[UserAccount].filter(_.id == lift(id)))
}

trait DefaultUpdateUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateUserAccountAction(id: UUID, update: UserAccountUpdate) =
    runIO(updateUserAccountQuotation(id, update))

  def updateUserAccountQuotation(id: UUID, update: UserAccountUpdate) =
    quote(
      query[UserAccount]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.firstName -> lift(update.firstName),
          _.lastName -> lift(update.lastName),
          _.organization -> lift(update.organization),
          _.salutation -> lift(update.salutation),
          _.mayAdministrateUserAccounts -> lift(update.mayAdministrateUserAccounts),
          _.mayArchive -> lift(update.mayArchive),
          _.mayFinalizeWithoutPublishing -> lift(update.mayFinalizeWithoutPublishing),
          _.mayAdministrateRScripts -> lift(update.mayAdministrateRScripts)
        )
        .returning(userAccount => userAccount))
}

trait DefaultDeleteUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteUserAccountAction(id: UUID) =
    runIO(deleteUserAccountQuotation(id))

  def deleteUserAccountQuotation(id: UUID) =
    quote(
      query[UserAccount]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}