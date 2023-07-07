package services

import database.DatabaseContext
import database.generated.public.ErpProduct
import models.{ErpProductCreation, ErpProductUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpProductService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpProduct
    with DefaultCreateErpProduct
    with DefaultUpdateErpProduct
    with DefaultDeleteErpProduct {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpProduct]] =
    performIO(allErpProductsAction(sampleCompanyId))

  def create(creation: ErpProductCreation): Future[ErpProduct] =
    performIO(createErpProductAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpProductUpdate): Future[ErpProduct] =
    performIO(updateErpProductAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpProductAction(id, sampleCompanyId))
}
