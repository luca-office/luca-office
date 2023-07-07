package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

object SuccessfulRegistrationEmail {
  private val subject = "Registrierung erfolgreich"

  private def text(backofficeBaseUrl: String) =
    s"Sie sind erfolgreich bei Luca registriert worden. Sie können sich unter dieser URL anmelden: $backofficeBaseUrl"

  def apply(applicationConfiguration: ApplicationConfiguration, receiverEmailAddress: String): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.backofficeBaseUrl))
}
