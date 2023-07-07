package services

import database.DatabaseContext
import database.generated.public.ErpOrder
import models.{ErpOrderCreation, ErpOrderUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpOrderService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpOrder
    with DefaultCreateErpOrder
    with DefaultUpdateErpOrder
    with DefaultDeleteErpOrder {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpOrder]] =
    performIO(allErpOrdersAction(sampleCompanyId))

  def create(creation: ErpOrderCreation): Future[ErpOrder] =
    performIO(createErpOrderAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpOrderUpdate): Future[ErpOrder] =
    performIO(updateErpOrderAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpOrderAction(id, sampleCompanyId))
}
