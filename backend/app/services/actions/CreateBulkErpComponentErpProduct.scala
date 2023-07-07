package services.actions

import database.DatabaseContext
import database.generated.public.ErpComponentErpProduct

import scala.annotation.nowarn
import scala.concurrent.ExecutionContext

trait CreateBulkErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkErpComponentErpProductAction(
      erpComponentErpProducts: Seq[ErpComponentErpProduct]): IO[Seq[ErpComponentErpProduct], Effect.Write] = {
    // Exclude id from insertion
    @nowarn
    implicit val erpComponentErpProductInsertMeta = insertMeta[ErpComponentErpProduct](_.id)

    runIO(
      liftQuery(erpComponentErpProducts)
        .foreach(erpComponentErpProduct =>
          query[ErpComponentErpProduct]
            .insert(erpComponentErpProduct)
            .returning(erpComponentErpProduct => erpComponentErpProduct)))
  }
}
