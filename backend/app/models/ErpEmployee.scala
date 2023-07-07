package models

import enums.{EmploymentMode, FamilyStatus, Salutation}

import java.time.Instant
import java.util.UUID

case class ErpEmployeeCreation(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    department: String,
    jobTitle: String,
    employmentMode: EmploymentMode,
    employedAt: Instant,
    employmentEndsAt: Option[Instant],
    site: String,
    graduation: Option[String],
    furtherEducation: Seq[String],
    taxClass: String,
    familyStatus: FamilyStatus,
    childCount: Option[Int],
    note: Option[String],
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpEmployeeUpdate(
    salutation: Salutation,
    firstName: String,
    lastName: String,
    addressLine: String,
    postalCode: String,
    city: String,
    country: String,
    email: Option[String],
    phone: Option[String],
    department: String,
    jobTitle: String,
    employmentMode: EmploymentMode,
    employedAt: Instant,
    employmentEndsAt: Option[Instant],
    site: String,
    graduation: Option[String],
    furtherEducation: Seq[String],
    taxClass: String,
    familyStatus: FamilyStatus,
    childCount: Option[Int],
    note: Option[String],
    binaryFileId: Option[UUID]
)
