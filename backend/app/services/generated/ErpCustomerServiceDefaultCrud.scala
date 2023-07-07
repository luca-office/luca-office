package services.generated

import database.DatabaseContext
import database.generated.public.ErpCustomer
import models.{ErpCustomerCreation, ErpCustomerUpdate}
import services.converters.ErpCustomerConverter.toErpCustomer

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpCustomersAction(sampleCompanyId: UUID) =
    runIO(allErpCustomersQuotation(sampleCompanyId))

  def allErpCustomersQuotation(sampleCompanyId: UUID) =
    quote(query[ErpCustomer].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpCustomerAction(creation: ErpCustomerCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpCustomerQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpCustomerQuotation(creation: ErpCustomerCreation, id: Int) =
    quote(
      query[ErpCustomer]
        .insert(lift(toErpCustomer(creation, id)))
        .returning(erpCustomer => erpCustomer))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpCustomer]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpCustomerAction(id: Int, sampleCompanyId: UUID, update: ErpCustomerUpdate) =
    runIO(updateErpCustomerQuotation(id, sampleCompanyId, update))

  def updateErpCustomerQuotation(id: Int, sampleCompanyId: UUID, update: ErpCustomerUpdate) =
    quote(
      query[ErpCustomer]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.salutation -> lift(update.salutation),
          _.firstName -> lift(update.firstName),
          _.lastName -> lift(update.lastName),
          _.company -> lift(update.company),
          _.addressLine -> lift(update.addressLine),
          _.postalCode -> lift(update.postalCode),
          _.city -> lift(update.city),
          _.country -> lift(update.country),
          _.email -> lift(update.email),
          _.phone -> lift(update.phone),
          _.note -> lift(update.note),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpCustomer => erpCustomer))
}

trait DefaultDeleteErpCustomer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpCustomerAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpCustomerQuotation(id, sampleCompanyId))

  def deleteErpCustomerQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpCustomer]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
