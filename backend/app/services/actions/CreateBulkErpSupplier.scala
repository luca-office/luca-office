package services.actions

import database.DatabaseContext
import database.generated.public.ErpSupplier

import scala.concurrent.ExecutionContext

trait CreateBulkErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpSupplierAction(erpSuppliers: Seq[ErpSupplier]): IO[Seq[ErpSupplier], Effect.Write] =
    runIO(liftQuery(erpSuppliers).foreach(erpSupplier =>
      query[ErpSupplier].insert(erpSupplier).returning(erpSupplier => erpSupplier)))
}
