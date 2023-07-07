package services.actions

import database.DatabaseContext
import database.generated.public.ErpComponent

import scala.concurrent.ExecutionContext

trait CreateBulkErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpComponentAction(erpComponents: Seq[ErpComponent]): IO[Seq[ErpComponent], Effect.Write] =
    runIO(liftQuery(erpComponents).foreach(erpComponent =>
      query[ErpComponent].insert(erpComponent).returning(erpComponent => erpComponent)))
}
