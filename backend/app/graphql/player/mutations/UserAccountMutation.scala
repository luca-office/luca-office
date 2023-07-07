package graphql.player.mutations

import database.generated.public.UserAccount
import graphql.Private
import graphql.player.PlayerContext
import mails.{RequestResetPasswordEmail, SuccessfulRegistrationEmail, UserAccountCreationEmail}
import models.UserAccountCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}
import services.CustomError

import scala.concurrent.Future

trait UserAccountMutation {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createUserAccount(creation: UserAccountCreation): Future[UserAccount] = {
    val response = userAccountService.create(creation)
    response.foreach(userAccount =>
      mailing.send(SuccessfulRegistrationEmail(applicationConfiguration, userAccount.email)))
    response
  }

  @GraphQLField
  @GraphQLFieldTags(Private)
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
  @GraphQLFieldTags(Private)
  def login(email: String, password: String): Future[UserAccount] =
    userAccountService
      .authenticate(email, password)
      .map { userAccount =>
        createSession(userAccount.id)
        userAccount
      }
}
