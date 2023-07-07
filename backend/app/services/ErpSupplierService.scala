package services

import database.DatabaseContext
import database.generated.public.ErpSupplier
import models.{ErpSupplierCreation, ErpSupplierUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpSupplierService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpSupplier
    with DefaultCreateErpSupplier
    with DefaultUpdateErpSupplier
    with DefaultDeleteErpSupplier {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpSupplier]] =
    performIO(allErpSuppliersAction(sampleCompanyId))

  def create(creation: ErpSupplierCreation): Future[ErpSupplier] =
    performIO(createErpSupplierAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpSupplierUpdate): Future[ErpSupplier] =
    performIO(updateErpSupplierAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpSupplierAction(id, sampleCompanyId))
}
