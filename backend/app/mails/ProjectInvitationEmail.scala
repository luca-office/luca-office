package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

import java.util.UUID

object ProjectInvitationEmail {
  private val subject = "Projekteinladung"

  private def text(backofficeBaseUrl: String, projectId: UUID) =
    s"Sie sind zu einem Projekt hinzugefügt worden: $backofficeBaseUrl#/projects/$projectId"

  def apply(applicationConfiguration: ApplicationConfiguration, receiverEmailAddress: String, projectId: UUID): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.backofficeBaseUrl, projectId)
    )
}
