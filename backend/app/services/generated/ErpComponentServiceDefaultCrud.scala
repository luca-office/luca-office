package services.generated

import database.DatabaseContext
import database.generated.public.ErpComponent
import models.{ErpComponentCreation, ErpComponentUpdate}
import services.converters.ErpComponentConverter.toErpComponent

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpComponentsAction(sampleCompanyId: UUID) =
    runIO(allErpComponentsQuotation(sampleCompanyId))

  def allErpComponentsQuotation(sampleCompanyId: UUID) =
    quote(query[ErpComponent].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpComponentAction(creation: ErpComponentCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpComponentQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpComponentQuotation(creation: ErpComponentCreation, id: Int) =
    quote(
      query[ErpComponent]
        .insert(lift(toErpComponent(creation, id)))
        .returning(erpComponent => erpComponent))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpComponent]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpComponentAction(id: Int, sampleCompanyId: UUID, update: ErpComponentUpdate) =
    runIO(updateErpComponentQuotation(id, sampleCompanyId, update))

  def updateErpComponentQuotation(id: Int, sampleCompanyId: UUID, update: ErpComponentUpdate) =
    quote(
      query[ErpComponent]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.name -> lift(update.name),
          _.category -> lift(update.category),
          _.purchasingPriceInCents -> lift(update.purchasingPriceInCents),
          _.margin -> lift(update.margin),
          _.packSize -> lift(update.packSize),
          _.availableStock -> lift(update.availableStock),
          _.stockCostPerUnitInCents -> lift(update.stockCostPerUnitInCents),
          _.stockCostTotalInCents -> lift(update.stockCostTotalInCents),
          _.note -> lift(update.note),
          _.unit -> lift(update.unit),
          _.supplierId -> lift(update.supplierId),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpComponent => erpComponent))
}

trait DefaultDeleteErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpComponentAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpComponentQuotation(id, sampleCompanyId))

  def deleteErpComponentQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpComponent]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
