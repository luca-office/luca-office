package services.generated

import database.DatabaseContext
import database.generated.public.ErpInvoice
import models.{ErpInvoiceCreation, ErpInvoiceUpdate}
import services.converters.ErpInvoiceConverter.toErpInvoice

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpInvoicesAction(sampleCompanyId: UUID) =
    runIO(allErpInvoicesQuotation(sampleCompanyId))

  def allErpInvoicesQuotation(sampleCompanyId: UUID) =
    quote(query[ErpInvoice].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpInvoiceAction(creation: ErpInvoiceCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpInvoiceQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpInvoiceQuotation(creation: ErpInvoiceCreation, id: Int) =
    quote(
      query[ErpInvoice]
        .insert(lift(toErpInvoice(creation, id)))
        .returning(erpInvoice => erpInvoice))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpInvoice]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpInvoiceAction(id: Int, sampleCompanyId: UUID, update: ErpInvoiceUpdate) =
    runIO(updateErpInvoiceQuotation(id, sampleCompanyId, update))

  def updateErpInvoiceQuotation(id: Int, sampleCompanyId: UUID, update: ErpInvoiceUpdate) =
    quote(
      query[ErpInvoice]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.invoiceDate -> lift(update.invoiceDate),
          _.dueDate -> lift(update.dueDate),
          _.paymentTerms -> lift(update.paymentTerms),
          _.amountPaidInCents -> lift(update.amountPaidInCents),
          _.paymentStatus -> lift(update.paymentStatus),
          _.reminderFeeInCents -> lift(update.reminderFeeInCents),
          _.defaultChargesInCents -> lift(update.defaultChargesInCents),
          _.note -> lift(update.note),
          _.totalNetInCents -> lift(update.totalNetInCents),
          _.totalGrossInCents -> lift(update.totalGrossInCents),
          _.taxAmountInCents -> lift(update.taxAmountInCents),
          _.orderId -> lift(update.orderId),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpInvoice => erpInvoice))
}

trait DefaultDeleteErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpInvoiceAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpInvoiceQuotation(id, sampleCompanyId))

  def deleteErpInvoiceQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpInvoice]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
