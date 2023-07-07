package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

import java.util.UUID

object ScenarioInvitationEmail {
  private val subject = "Szenarioeinladung"

  private def text(backofficeBaseUrl: String, scenarioId: UUID) =
    s"Sie sind zu einem Szenario hinzugefügt worden: $backofficeBaseUrl#/scenarios/$scenarioId"

  def apply(applicationConfiguration: ApplicationConfiguration, receiverEmailAddress: String, scenarioId: UUID): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.backofficeBaseUrl, scenarioId)
    )
}
