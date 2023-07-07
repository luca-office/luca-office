package mails

import play.api.libs.mailer.Email

object DefaultEmail {
  def apply(from: String, to: String, subject: String, text: String): Email =
    Email(
      subject = subject,
      from = from,
      to = Seq(to),
      bodyText = Some(text)
    )
}
