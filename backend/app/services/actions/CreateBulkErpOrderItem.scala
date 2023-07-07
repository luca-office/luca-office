package services.actions

import database.DatabaseContext
import database.generated.public.ErpOrderItem

import scala.concurrent.ExecutionContext

trait CreateBulkErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkErpOrderItemAction(erpOrderItems: Seq[ErpOrderItem]): IO[Seq[ErpOrderItem], Effect.Write] =
    runIO(liftQuery(erpOrderItems).foreach(erpOrderItem =>
      query[ErpOrderItem].insert(erpOrderItem).returning(erpOrderItem => erpOrderItem)))
}
