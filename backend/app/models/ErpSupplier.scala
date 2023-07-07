package models

import enums.Salutation

import java.util.UUID

case class ErpSupplierCreation(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    company: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    note: Option[String],
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpSupplierUpdate(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    company: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    note: Option[String],
    binaryFileId: Option[UUID]
)
