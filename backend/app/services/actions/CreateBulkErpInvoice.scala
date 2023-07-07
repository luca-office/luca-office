package services.actions

import database.DatabaseContext
import database.generated.public.ErpInvoice

import scala.concurrent.ExecutionContext

trait CreateBulkErpInvoice {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkErpInvoiceAction(erpInvoices: Seq[ErpInvoice]): IO[Seq[ErpInvoice], Effect.Write] =
    runIO(liftQuery(erpInvoices).foreach(erpInvoice =>
      query[ErpInvoice].insert(erpInvoice).returning(erpInvoice => erpInvoice)))
}
