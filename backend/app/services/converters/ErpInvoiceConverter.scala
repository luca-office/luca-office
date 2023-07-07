package services.converters

import database.generated.public.ErpInvoice
import models.ErpInvoiceCreation

object ErpInvoiceConverter {

  def toErpInvoice(creation: ErpInvoiceCreation, id: Int): ErpInvoice =
    ErpInvoice(
      id = id,
      invoiceDate = creation.invoiceDate,
      dueDate = creation.dueDate,
      paymentTerms = creation.paymentTerms,
      amountPaidInCents = creation.amountPaidInCents,
      paymentStatus = creation.paymentStatus,
      reminderFeeInCents = creation.reminderFeeInCents,
      defaultChargesInCents = creation.defaultChargesInCents,
      note = creation.note,
      totalNetInCents = creation.totalNetInCents,
      totalGrossInCents = creation.totalGrossInCents,
      taxAmountInCents = creation.taxAmountInCents,
      binaryFileId = creation.binaryFileId,
      orderId = creation.orderId,
      sampleCompanyId = creation.sampleCompanyId
    )

  def toErpInvoiceCreation(erpInvoice: ErpInvoice): ErpInvoiceCreation =
    ErpInvoiceCreation(
      invoiceDate = erpInvoice.invoiceDate,
      dueDate = erpInvoice.dueDate,
      paymentTerms = erpInvoice.paymentTerms,
      amountPaidInCents = erpInvoice.amountPaidInCents,
      paymentStatus = erpInvoice.paymentStatus,
      reminderFeeInCents = erpInvoice.reminderFeeInCents,
      defaultChargesInCents = erpInvoice.defaultChargesInCents,
      note = erpInvoice.note,
      totalNetInCents = erpInvoice.totalNetInCents,
      totalGrossInCents = erpInvoice.totalGrossInCents,
      taxAmountInCents = erpInvoice.taxAmountInCents,
      binaryFileId = erpInvoice.binaryFileId,
      orderId = erpInvoice.orderId,
      sampleCompanyId = erpInvoice.sampleCompanyId
    )
}
