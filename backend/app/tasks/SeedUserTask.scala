package tasks

import mails.RequestResetPasswordEmail
import play.api.{Environment, Mode}
import services.UserAccountService
import utils.{ApplicationConfiguration, Mailing}

import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SeedUserTask @Inject() (
    environment: Environment,
    applicationConfiguration: ApplicationConfiguration,
    mailing: Mailing,
    userAccountService: UserAccountService)(implicit executionContext: ExecutionContext) {

  if (environment.mode != Mode.Test) {
    createSeedUserIfNotExists
  }

  private def createSeedUserIfNotExists =
    userAccountService.doesUserAdministrationAccountExist.flatMap {
      case false =>
        userAccountService.createUserAdministrationSeedAccount
          .flatMap(userAccount => userAccountService.createResetPasswordToken(userAccount.email))
          .map(userAccount =>
            userAccount.resetPasswordToken match {
              case Some(resetPasswordToken) =>
                mailing.send(
                  RequestResetPasswordEmail(applicationConfiguration, userAccount.email, resetPasswordToken.toString))
              case _ =>
                throw new Throwable("resetPasswordToken is empty")
            })
      case _ =>
        Future.successful(())
    }
}
