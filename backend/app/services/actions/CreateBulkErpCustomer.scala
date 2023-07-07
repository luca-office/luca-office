package services.actions

import database.DatabaseContext
import database.generated.public.ErpCustomer

import scala.concurrent.ExecutionContext

trait CreateBulkErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpCustomerAction(erpCustomers: Seq[ErpCustomer]): IO[Seq[ErpCustomer], Effect.Write] =
    runIO(liftQuery(erpCustomers).foreach(erpCustomer =>
      query[ErpCustomer].insert(erpCustomer).returning(erpCustomer => erpCustomer)))
}
