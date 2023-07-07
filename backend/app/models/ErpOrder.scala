package models

import enums.DeliveryStatus

import java.time.Instant
import java.util.UUID

case class ErpOrderCreation(
    cashbackInCents: Option[Int],
    discountInCents: Option[Int],
    deliveryChargeInCents: Int,
    deliveryStatus: DeliveryStatus,
    deliveryDate: Instant,
    note: Option[String],
    customerId: Int,
    employeeId: Int,
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID
)

case class ErpOrderUpdate(
    cashbackInCents: Option[Int],
    discountInCents: Option[Int],
    deliveryChargeInCents: Int,
    deliveryStatus: DeliveryStatus,
    deliveryDate: Instant,
    note: Option[String],
    customerId: Int,
    employeeId: Int,
    binaryFileId: Option[UUID]
)
