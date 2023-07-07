package models

import enums.PaymentStatus

import java.time.Instant
import java.util.UUID

case class ErpInvoiceCreation(
    invoiceDate: Instant,
    dueDate: Instant,
    paymentTerms: String,
    amountPaidInCents: Option[Int],
    paymentStatus: PaymentStatus,
    reminderFeeInCents: Option[Int],
    defaultChargesInCents: Option[Int],
    note: Option[String],
    totalNetInCents: Int,
    totalGrossInCents: Int,
    taxAmountInCents: Int,
    orderId: Int,
    binaryFileId: Option[UUID],
    sampleCompanyId: UUID,
)

case class ErpInvoiceUpdate(
    invoiceDate: Instant,
    dueDate: Instant,
    paymentTerms: String,
    amountPaidInCents: Option[Int],
    paymentStatus: PaymentStatus,
    reminderFeeInCents: Option[Int],
    defaultChargesInCents: Option[Int],
    note: Option[String],
    totalNetInCents: Int,
    totalGrossInCents: Int,
    taxAmountInCents: Int,
    orderId: Int,
    binaryFileId: Option[UUID]
)
