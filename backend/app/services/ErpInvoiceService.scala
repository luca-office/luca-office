package services

import database.DatabaseContext
import database.generated.public.ErpInvoice
import models.{ErpInvoiceCreation, ErpInvoiceUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpInvoiceService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpInvoice
    with DefaultCreateErpInvoice
    with DefaultUpdateErpInvoice
    with DefaultDeleteErpInvoice {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpInvoice]] =
    performIO(allErpInvoicesAction(sampleCompanyId))

  def create(creation: ErpInvoiceCreation): Future[ErpInvoice] =
    performIO(createErpInvoiceAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpInvoiceUpdate): Future[ErpInvoice] =
    performIO(updateErpInvoiceAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpInvoiceAction(id, sampleCompanyId))
}
