package services.generated

import database.DatabaseContext
import database.generated.public.ErpSupplier
import models.{ErpSupplierCreation, ErpSupplierUpdate}
import services.converters.ErpSupplierConverter.toErpSupplier

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpSuppliersAction(sampleCompanyId: UUID) =
    runIO(allErpSuppliersQuotation(sampleCompanyId))

  def allErpSuppliersQuotation(sampleCompanyId: UUID) =
    quote(query[ErpSupplier].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpSupplierAction(creation: ErpSupplierCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpSupplierQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpSupplierQuotation(creation: ErpSupplierCreation, id: Int) =
    quote(
      query[ErpSupplier]
        .insert(lift(toErpSupplier(creation, id)))
        .returning(erpSupplier => erpSupplier))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpSupplier]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpSupplierAction(id: Int, sampleCompanyId: UUID, update: ErpSupplierUpdate) =
    runIO(updateErpSupplierQuotation(id, sampleCompanyId, update))

  def updateErpSupplierQuotation(id: Int, sampleCompanyId: UUID, update: ErpSupplierUpdate) =
    quote(
      query[ErpSupplier]
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
        .returning(erpSupplier => erpSupplier))
}

trait DefaultDeleteErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpSupplierAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpSupplierQuotation(id, sampleCompanyId))

  def deleteErpSupplierQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpSupplier]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
