package services

import com.github.jasync.sql.db.postgresql.exceptions.GenericDatabaseException
import database.DatabaseContext
import database.generated.public.UserAccount
import enums.Salutation.Mr
import models.{UserAccountCreation, UserAccountUpdate}
import org.mindrot.jbcrypt.BCrypt
import play.api.Logging
import services.Utils.{defaultErrorHandler, isUniqueConstraintViolation}
import services.converters.UserAccountConverter.toUserAccount
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class UserAccountService @Inject()(databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
  extends DefaultAllUserAccount
    with Logging
    with DefaultFindUserAccount
    with DefaultUpdateUserAccount
    with DefaultDeleteUserAccount
    with UserAccountServiceActions
    with ConfirmBackofficeTermsAndConditionsUserAccount {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all: Future[Seq[UserAccount]] =
    performIO(allUserAccountsAction)

  def find(id: UUID): Future[Option[UserAccount]] =
    run(findUserAccountQuotation(id)).map(_.headOption)

  def doesUserAdministrationAccountExist: Future[Boolean] =
    run(query[UserAccount].filter(_.mayAdministrateUserAccounts == lift(true)).nonEmpty)

  def create(creation: UserAccountCreation): Future[UserAccount] =
    if (!creation.hasConfirmedBackofficeTermsAndConditions)
      Future.failed(BackofficeTermsAndConditionsNotConfirmed)
    else {
      val userAccount = toUserAccount(creation, createPasswordHash(creation.password))

      run(createQuotation(userAccount))
        .recover { case throwable =>
          throwable.getCause match {
            case exception: GenericDatabaseException if isUniqueConstraintViolation(exception) =>
              throw EmailAddressAlreadyRegistered
            case _ =>
              defaultErrorHandler(throwable)
          }
        }
    }

  def createUserAdministrationSeedAccount: Future[UserAccount] = {
    val password = UUID.randomUUID().toString
    val userAccountCreation = UserAccountCreation(
      email = "change.me@test.de",
      password = password,
      firstName = "Seed",
      lastName = "Admin",
      organization = "",
      salutation = Mr,
      hasConfirmedBackofficeTermsAndConditions = true
    )
    val userAccount = toUserAccount(userAccountCreation, createPasswordHash(password))
      .copy(mayAdministrateUserAccounts = true, isGlobalSuperAdmin = true)

    run(createQuotation(userAccount))
  }

  private def createQuotation(userAccount: UserAccount) =
    quote(
      query[UserAccount]
        .insert(lift(userAccount))
        .returning(userAccount => userAccount))

  private def createPasswordHash(password: String) =
    BCrypt.hashpw(password, BCrypt.gensalt())

  def authenticate(email: String, password: String): Future[UserAccount] =
    performIO(authenticateUserAccountAction(email, password))

  def confirmBackofficeTermsAndConditions(userId: UUID, hasConfirmedBackofficeTermsAndConditions: Boolean): Future[UserAccount] =
    performIO(
      updateHasConfirmedBackofficeTermsAndConditionsAction(
        userId,
        if (hasConfirmedBackofficeTermsAndConditions) Some(DateUtils.now) else None))

  def createResetPasswordToken(email: String): Future[UserAccount] =
    run(createResetPasswordTokenQuotation(email))
      .recover(defaultErrorHandler)

  private def createResetPasswordTokenQuotation(email: String) =
    quote(
      findUserAccountQuotation(email)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.resetPasswordToken -> lift(Some(UUID.randomUUID()): Option[UUID])
        )
        .returning(userAccount => userAccount))

  def update(ownUserAccount: UserAccount)(id: UUID, update: UserAccountUpdate): Future[UserAccount] = {
    val action = findUserAccountAction(id).flatMap {
      case Some(userAccount) =>
        val willClaimsChange = userAccount.mayAdministrateUserAccounts != update.mayAdministrateUserAccounts ||
          userAccount.mayArchive != update.mayArchive ||
          userAccount.mayFinalizeWithoutPublishing != update.mayFinalizeWithoutPublishing
        if (!willClaimsChange || ownUserAccount.mayAdministrateUserAccounts || ownUserAccount.isGlobalSuperAdmin)
          updateUserAccountAction(id, update)
        else
          IO.failed(InsufficientRights)
      case _ =>
        IO.failed(EntityNotFound)
    }

    performIO(action).recover(defaultErrorHandler)
  }

  def delete(id: UUID): Future[UUID] =
    performIO(deleteUserAccountAction(id))

  def resetPassword(email: String, password: String, token: UUID): Future[UserAccount] = {
    val passwordHash = BCrypt.hashpw(password, BCrypt.gensalt())
    val action = runIO(findUserAccountQuotation(email)).flatMap {
      case Seq(userAccount) =>
        if (userAccount.resetPasswordToken.contains(token))
          runIO(resetPasswordQuotation(email, passwordHash))
        else {
          logger.info(
            s"Password was not reset because the provided reset token ${token} didn't match the reset token associated with the email address ${email}.")
          IO.failed(ResetPasswordTokensDontMatch)
        }
      case _ =>
        logger.info(
          s"Password was not reset because no user account associated to the provided email address ${email} was found.")
        IO.failed(EntityNotFound)
    }

    performIO(action).recover(defaultErrorHandler)
  }

  private def resetPasswordQuotation(email: String, passwordHash: String) =
    quote(
      findUserAccountQuotation(email)
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.passwordHash -> lift(passwordHash),
          _.resetPasswordToken -> lift(None: Option[UUID])
        )
        .returning(userAccount => userAccount))
}

trait UserAccountServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def authenticateUserAccountAction(email: String, password: String): IO[UserAccount, Effect.Read] =
    runIO(findUserAccountQuotation(email))
      .flatMap {
        case Seq(userAccount) if BCrypt.checkpw(password, userAccount.passwordHash) =>
          IO.successful(userAccount)
        case _ =>
          IO.failed(LoginFailed)
      }

  def findUserAccountQuotation(email: String) =
    quote(query[UserAccount].filter(_.email.toLowerCase == lift(email.toLowerCase)))
}

trait ConfirmBackofficeTermsAndConditionsUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateHasConfirmedBackofficeTermsAndConditionsAction(id: UUID, hasConfirmedBackofficeTermsAndConditionsAt: Option[Instant]) =
    runIO(updateHasConfirmedBackofficeTermsAndConditionsUserAccountQuotation(id, hasConfirmedBackofficeTermsAndConditionsAt))

  def updateHasConfirmedBackofficeTermsAndConditionsUserAccountQuotation(id: UUID, hasConfirmedBackofficeTermsAndConditionsAt: Option[Instant]) =
    quote(
      query[UserAccount]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.hasConfirmedBackofficeTermsAndConditionsAt -> lift(hasConfirmedBackofficeTermsAndConditionsAt)
        )
        .returning(userAccount => userAccount))
}
