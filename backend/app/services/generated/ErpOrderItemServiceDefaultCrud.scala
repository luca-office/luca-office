package services.generated

import database.DatabaseContext
import database.generated.public.ErpOrderItem
import models.{ErpOrderItemCreation, ErpOrderItemUpdate}
import services.converters.ErpOrderItemConverter.toErpOrderItem

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def allErpOrderItemsAction(sampleCompanyId: UUID) =
    runIO(allErpOrderItemsQuotation(sampleCompanyId))

  def allErpOrderItemsQuotation(sampleCompanyId: UUID) =
    quote(query[ErpOrderItem].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createErpOrderItemAction(creation: ErpOrderItemCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpOrderItemQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpOrderItemQuotation(creation: ErpOrderItemCreation, id: Int) =
    quote(
      query[ErpOrderItem]
        .insert(lift(toErpOrderItem(creation, id)))
        .returning(erpOrderItem => erpOrderItem))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpOrderItem]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def updateErpOrderItemAction(id: Int, sampleCompanyId: UUID, update: ErpOrderItemUpdate) =
    runIO(updateErpOrderItemQuotation(id, sampleCompanyId, update))

  def updateErpOrderItemQuotation(id: Int, sampleCompanyId: UUID, update: ErpOrderItemUpdate) =
    quote(
      query[ErpOrderItem]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.quantity -> lift(update.quantity),
          _.totalNetInCents -> lift(update.totalNetInCents),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpOrderItem => erpOrderItem))
}

trait DefaultDeleteErpOrderItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpOrderItemAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpOrderItemQuotation(id, sampleCompanyId))

  def deleteErpOrderItemQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpOrderItem]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
