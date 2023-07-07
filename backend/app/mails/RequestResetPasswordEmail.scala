package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

object RequestResetPasswordEmail {
  private val subject = "Passwort zurücksetzen"

  private def text(backofficeBaseUrl: String, emailAddress: String, resetPasswordToken: String) =
    s"Sie können Ihr Passwort hier zurücksetzen: $backofficeBaseUrl#/reset-password/$emailAddress/$resetPasswordToken"

  def apply(
      applicationConfiguration: ApplicationConfiguration,
      receiverEmailAddress: String,
      resetPasswordToken: String): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.backofficeBaseUrl, receiverEmailAddress, resetPasswordToken)
    )
}
