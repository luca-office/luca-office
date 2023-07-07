package graphql.backoffice.mutations

import database.generated.public.UserAccount
import graphql.Private
import graphql.backoffice.BackofficeContext
import mails.{RequestResetPasswordEmail, SuccessfulRegistrationEmail, UserAccountCreationEmail}
import models.{UserAccountCreation, UserAccountUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}
import services.CustomError

import java.util.UUID
import scala.concurrent.Future

trait UserAccountMutation {
  context: BackofficeContext =>

  @GraphQLField
  def createUserAccount(creation: UserAccountCreation): Future[UserAccount] = {
    val response = userAccountService.create(creation)
    response.foreach(userAccount =>
      mailing.send(SuccessfulRegistrationEmail(applicationConfiguration, userAccount.email)))
    response
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateUserAccount(id: UUID, update: UserAccountUpdate): Future[UserAccount] =
    runWithUserAccount(userAccountService.update(_)(id, update))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteUserAccount(id: UUID): Future[UUID] =
    userAccountService.delete(id)

  @GraphQLField
  def requestResetPasswordEmail(email: String): Future[Unit] =
    requestResetPasswordEmailHelper(email)

  def requestResetPasswordEmailHelper(email: String, isNewAccount: Boolean = false): Future[Unit] =
    userAccountService
      .createResetPasswordToken(email)
      .map(userAccount =>
        userAccount.resetPasswordToken match {
          case Some(resetPasswordToken) =>
            val createEmail = if (isNewAccount) UserAccountCreationEmail.apply _ else RequestResetPasswordEmail.apply _
            val email = createEmail(applicationConfiguration, userAccount.email, resetPasswordToken.toString)
            mailing.send(email)
          case _ =>
            throw CustomError("resetPasswordToken is empty")
        })

  @GraphQLField
  def resetPassword(email: String, password: String, token: UUID): Future[Unit] =
    userAccountService
      .resetPassword(email, password, token)
      .map(_ => ())

  @GraphQLField
  def login(email: String, password: String): Future[UserAccount] =
    userAccountService
      .authenticate(email, password)
      .map { userAccount =>
        createSession(userAccount.id)
        userAccount
      }

  @GraphQLField
  def confirmBackofficeTermsAndConditions(hasConfirmedBackofficeTermsAndConditions: Boolean): Future[UserAccount] =
    runWithUserAccount(userAccount =>
      userAccountService
        .confirmBackofficeTermsAndConditions(userAccount.id, hasConfirmedBackofficeTermsAndConditions))

  @GraphQLField
  def logout(): Unit =
    context.removeSession()
}
