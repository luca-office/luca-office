package services.generated

import database.DatabaseContext
import database.generated.public.ErpProduct
import models.{ErpProductCreation, ErpProductUpdate}
import services.converters.ErpProductConverter.toErpProduct

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpProductsAction(sampleCompanyId: UUID) =
    runIO(allErpProductsQuotation(sampleCompanyId))

  def allErpProductsQuotation(sampleCompanyId: UUID) =
    quote(query[ErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpProductAction(creation: ErpProductCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpProductQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpProductQuotation(creation: ErpProductCreation, id: Int) =
    quote(
      query[ErpProduct]
        .insert(lift(toErpProduct(creation, id)))
        .returning(erpProduct => erpProduct))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpProduct]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpProductAction(id: Int, sampleCompanyId: UUID, update: ErpProductUpdate) =
    runIO(updateErpProductQuotation(id, sampleCompanyId, update))

  def updateErpProductQuotation(id: Int, sampleCompanyId: UUID, update: ErpProductUpdate) =
    quote(
      query[ErpProduct]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.name -> lift(update.name),
          _.netPriceInCents -> lift(update.netPriceInCents),
          _.taxRate -> lift(update.taxRate),
          _.packSize -> lift(update.packSize),
          _.availableStock -> lift(update.availableStock),
          _.stockCostPerUnitInCents -> lift(update.stockCostPerUnitInCents),
          _.stockCostTotalInCents -> lift(update.stockCostTotalInCents),
          _.unit -> lift(update.unit),
          _.note -> lift(update.note),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpProduct => erpProduct))
}

trait DefaultDeleteErpProduct {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpProductAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpProductQuotation(id, sampleCompanyId))

  def deleteErpProductQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpProduct]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
