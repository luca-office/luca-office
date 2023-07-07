package services.generated

import database.DatabaseContext
import database.generated.public.{ErpComponent, ErpComponentErpProduct, ErpProduct}
import models.{ErpComponentErpProductCreation, ErpComponentErpProductUpdate}
import services.converters.ErpComponentErpProductConverter.toErpComponentErpProduct

import java.util.UUID
import scala.annotation.nowarn
import scala.concurrent.ExecutionContext

trait DefaultAllErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def allErpComponentErpProductsAction(sampleCompanyId: UUID) =
    runIO(allErpComponentErpProductsQuotation(sampleCompanyId))

  def allErpComponentErpProductsQuotation(sampleCompanyId: UUID) =
    quote(query[ErpComponentErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultErpProductsForErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def erpProductsForErpComponentAction(componentId: Int, sampleCompanyId: UUID) =
    runIO(erpProductsForErpComponentQuotation(componentId, sampleCompanyId))

  def erpProductsForErpComponentQuotation(componentId: Int, sampleCompanyId: UUID) =
    quote(for {
      erpComponentErpProduct <- query[ErpComponentErpProduct].filter(row =>
        row.componentId == lift(componentId) && row.sampleCompanyId == lift(sampleCompanyId))
      erpProduct <- query[ErpProduct].filter(row =>
        row.id == erpComponentErpProduct.productId && row.sampleCompanyId == lift(sampleCompanyId))
    } yield erpProduct)
}

trait DefaultErpComponentsForErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def erpComponentsForErpProductAction(productId: Int, sampleCompanyId: UUID) =
    runIO(erpComponentsForErpProductQuotation(productId, sampleCompanyId))

  def erpComponentsForErpProductQuotation(productId: Int, sampleCompanyId: UUID) =
    quote(for {
      erpComponentErpProduct <- query[ErpComponentErpProduct].filter(row =>
        row.productId == lift(productId) && row.sampleCompanyId == lift(sampleCompanyId))
      erpComponent <- query[ErpComponent].filter(row =>
        row.id == erpComponentErpProduct.componentId && row.sampleCompanyId == lift(sampleCompanyId))
    } yield erpComponent)
}

trait DefaultCreateErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createErpComponentErpProductAction(creation: ErpComponentErpProductCreation) =
    runIO(createErpComponentErpProductQuotation(creation))

  def createErpComponentErpProductQuotation(creation: ErpComponentErpProductCreation) = {
    // Exclude id from insertion
    @nowarn
    implicit val erpComponentErpProductInsertMeta = insertMeta[ErpComponentErpProduct](_.id)

    quote(
      query[ErpComponentErpProduct]
        .insert(lift(toErpComponentErpProduct(creation)))
        .returning(erpComponent => erpComponent))
  }
}

trait DefaultUpdateErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def updateErpComponentErpProductAction(id: Int, sampleCompanyId: UUID, update: ErpComponentErpProductUpdate) =
    runIO(updateErpComponentErpProductQuotation(id, sampleCompanyId, update))

  def updateErpComponentErpProductQuotation(id: Int, sampleCompanyId: UUID, update: ErpComponentErpProductUpdate) =
    quote(
      query[ErpComponentErpProduct]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(_.quantity -> lift(update.quantity))
        .returning(erpComponentErpProduct => erpComponentErpProduct))
}

trait DefaultDeleteErpComponentErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpComponentErpProductAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpComponentErpProductQuotation(id, sampleCompanyId))

  def deleteErpComponentErpProductQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpComponentErpProduct]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(erpComponentErpProduct => erpComponentErpProduct))
}
