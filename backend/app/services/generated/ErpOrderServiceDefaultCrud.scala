package services.generated

import database.DatabaseContext
import database.generated.public.ErpOrder
import models.{ErpOrderCreation, ErpOrderUpdate}
import services.converters.ErpOrderConverter.toErpOrder

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpOrdersAction(sampleCompanyId: UUID) =
    runIO(allErpOrdersQuotation(sampleCompanyId))

  def allErpOrdersQuotation(sampleCompanyId: UUID) =
    quote(query[ErpOrder].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpOrderAction(creation: ErpOrderCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpOrderQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpOrderQuotation(creation: ErpOrderCreation, id: Int) =
    quote(
      query[ErpOrder]
        .insert(lift(toErpOrder(creation, id)))
        .returning(erpOrder => erpOrder))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpOrder]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpOrderAction(id: Int, sampleCompanyId: UUID, update: ErpOrderUpdate) =
    runIO(updateErpOrderQuotation(id, sampleCompanyId, update))

  def updateErpOrderQuotation(id: Int, sampleCompanyId: UUID, update: ErpOrderUpdate) =
    quote(
      query[ErpOrder]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.cashbackInCents -> lift(update.cashbackInCents),
          _.discountInCents -> lift(update.discountInCents),
          _.deliveryChargeInCents -> lift(update.deliveryChargeInCents),
          _.deliveryStatus -> lift(update.deliveryStatus),
          _.deliveryDate -> lift(update.deliveryDate),
          _.note -> lift(update.note),
          _.customerId -> lift(update.customerId),
          _.employeeId -> lift(update.employeeId),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpOrder => erpOrder))
}

trait DefaultDeleteErpOrder {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpOrderAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpOrderQuotation(id, sampleCompanyId))

  def deleteErpOrderQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpOrder]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
