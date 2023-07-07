package services

import database.DatabaseContext
import database.generated.public.ErpOrderItem
import models.{ErpOrderItemCreation, ErpOrderItemUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpOrderItemService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpOrderItem
    with DefaultCreateErpOrderItem
    with DefaultUpdateErpOrderItem
    with DefaultDeleteErpOrderItem {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpOrderItem]] =
    performIO(allErpOrderItemsAction(sampleCompanyId))

  def create(creation: ErpOrderItemCreation): Future[ErpOrderItem] =
    performIO(createErpOrderItemAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpOrderItemUpdate): Future[ErpOrderItem] =
    performIO(updateErpOrderItemAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpOrderItemAction(id, sampleCompanyId))
}
