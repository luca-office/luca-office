package utils

import play.api.Configuration

case class ApplicationConfiguration(misc: MiscConfiguration, s3: S3Configuration)

case class MiscConfiguration(
    backendBaseUrl: String,
    backofficeBaseUrl: String,
    playerBaseUrl: String,
    emailSender: String,
    allowExternalEmailReceivers: Boolean,
    internalEmailReceiversAddressPostfix: String,
    isBinaryCleanUpEnabled: Boolean,
    evaluationApiUrl: String
)

case class S3Configuration(
    regionName: String,
    bucketName: String,
    accessKey: String,
    secretKey: String
)

object ApplicationConfiguration {

  def apply(configuration: Configuration): ApplicationConfiguration = {
    val backendBaseUrl = configuration.get[String]("misc.backendBaseUrl")
    val backofficeBaseUrl = configuration.get[String]("misc.backofficeBaseUrl")
    val playerBaseUrl = configuration.get[String]("misc.playerBaseUrl")
    val emailSender = configuration.get[String]("misc.emailSender")
    val allowExternalEmailReceivers = configuration.get[Boolean]("misc.allowExternalEmailReceivers")
    val internalEmailReceiversAddressPostfix = configuration.get[String]("misc.internalEmailReceiversAddressPostfix")
    val isBinaryCleanUpEnabled = configuration.get[Boolean]("misc.isBinaryCleanUpEnabled")
    val evaluationApiUrl = configuration.get[String]("misc.evaluationApiUrl")
    val misc = MiscConfiguration(
      backendBaseUrl,
      backofficeBaseUrl,
      playerBaseUrl,
      emailSender,
      allowExternalEmailReceivers,
      internalEmailReceiversAddressPostfix,
      isBinaryCleanUpEnabled,
      evaluationApiUrl
    )

    val regionName = configuration.get[String]("aws.s3.regionName")
    val bucketName = configuration.get[String]("aws.s3.bucketName")
    val accessKey = configuration.get[String]("aws.s3.accessKey")
    val secretKey = configuration.get[String]("aws.s3.secretKey")
    val s3 = S3Configuration(regionName, bucketName, accessKey, secretKey)

    ApplicationConfiguration(misc, s3)
  }
}
