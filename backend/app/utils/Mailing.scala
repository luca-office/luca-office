package utils

import play.api.Logging
import play.api.libs.mailer._

import javax.inject.Inject

class Mailing @Inject() (mailerClient: MailerClient, applicationConfiguration: ApplicationConfiguration)
    extends Logging {

  def send(email: Email): Unit = {
    val allowExternalEmailReceivers = applicationConfiguration.misc.allowExternalEmailReceivers
    val internalEmailReceiversAddressPostfix = applicationConfiguration.misc.internalEmailReceiversAddressPostfix

    if (allowExternalEmailReceivers || email.to.forall(_.endsWith(internalEmailReceiversAddressPostfix)))
      mailerClient.send(email)
    else
      logger.info(
        s"Email was not sent because at least one receiver address does not end on '$internalEmailReceiversAddressPostfix' and option 'allowExternalEmailReceivers' is false.")
  }
}
