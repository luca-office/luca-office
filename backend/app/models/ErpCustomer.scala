package models

import enums.Salutation

import java.util.UUID

case class ErpCustomerCreation(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    company: Option[String],
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    note: Option[String],
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpCustomerUpdate(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    company: Option[String],
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    note: Option[String],
    binaryFileId: Option[UUID]
)
