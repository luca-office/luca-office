package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

object CreateSurveyInvitationEmail {
  private val subject = "Einladung zur Erhebung"

  private def text(playerBaseUrl: String, token: String) =
    s"""Sie wurden zu einer Erhebung eingeladen.
       |
       |URL: $playerBaseUrl
       |Zugangscode: $token""".stripMargin

  def apply(applicationConfiguration: ApplicationConfiguration, receiverEmailAddress: String, token: String): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.playerBaseUrl, token))
}
