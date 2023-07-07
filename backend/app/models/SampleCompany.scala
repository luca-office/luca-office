package models

import java.util.UUID

case class SampleCompanyCreation(
    name: String,
    description: String,
    tags: Seq[String],
    emailSignature: Option[String],
    profileFileId: Option[UUID],
    logoFileId: Option[UUID],
    domain: Option[String]
)

case class SampleCompanyUpdate(
    name: String,
    description: String,
    tags: Seq[String],
    emailSignature: Option[String],
    profileFileId: Option[UUID],
    logoFileId: Option[UUID],
    domain: Option[String]
)
