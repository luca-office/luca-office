package services.actions

import database.DatabaseContext
import database.generated.public.ErpProduct

import scala.concurrent.ExecutionContext

trait CreateBulkErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpProductAction(erpProducts: Seq[ErpProduct]): IO[Seq[ErpProduct], Effect.Write] =
    runIO(liftQuery(erpProducts).foreach(erpProduct =>
      query[ErpProduct].insert(erpProduct).returning(erpProduct => erpProduct)))
}
