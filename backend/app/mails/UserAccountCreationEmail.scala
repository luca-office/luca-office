package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

object UserAccountCreationEmail {
  private val subject = "Benutzerkonto erstellt"

  private def text(backofficeBaseUrl: String, emailAddress: String, resetPasswordToken: String) =
    s"""Es wurde ein Benutzerkonto für Sie erstellt.
       |
       |Sie können Ihr Passwort hier setzen: $backofficeBaseUrl#/reset-password/$emailAddress/$resetPasswordToken""".stripMargin

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
