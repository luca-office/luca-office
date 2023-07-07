package services.actions

import database.DatabaseContext
import database.generated.public.ErpEmployee

import scala.concurrent.ExecutionContext

trait CreateBulkErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpEmployeeAction(erpEmployees: Seq[ErpEmployee]): IO[Seq[ErpEmployee], Effect.Write] =
    runIO(liftQuery(erpEmployees).foreach(erpEmployee =>
      query[ErpEmployee].insert(erpEmployee).returning(erpEmployee => erpEmployee)))
}
