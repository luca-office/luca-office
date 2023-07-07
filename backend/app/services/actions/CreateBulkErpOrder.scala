package services.actions

import database.DatabaseContext
import database.generated.public.ErpOrder

import scala.concurrent.ExecutionContext

trait CreateBulkErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpOrderAction(erpOrders: Seq[ErpOrder]): IO[Seq[ErpOrder], Effect.Write] =
    runIO(liftQuery(erpOrders).foreach(erpOrder => query[ErpOrder].insert(erpOrder).returning(erpOrder => erpOrder)))
}
