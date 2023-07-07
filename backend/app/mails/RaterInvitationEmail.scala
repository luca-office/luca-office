package mails

import play.api.libs.mailer.Email
import utils.ApplicationConfiguration

import java.util.UUID

object RaterInvitationEmail {
  private val subject = "Einladung als Rater"

  private def text(backofficeBaseUrl: String, surveyId: UUID) =
    s"Sie sind als Rater zu einer Projekterhebung hinzugefügt worden: $backofficeBaseUrl#/ratings/survey/$surveyId"

  def apply(applicationConfiguration: ApplicationConfiguration, receiverEmailAddress: String, surveyId: UUID): Email =
    DefaultEmail(
      from = applicationConfiguration.misc.emailSender,
      to = receiverEmailAddress,
      subject = subject,
      text = text(applicationConfiguration.misc.backofficeBaseUrl, surveyId)
    )
}
