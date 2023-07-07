package services.generated

import database.DatabaseContext
import database.generated.public.ErpEmployee
import models.{ErpEmployeeCreation, ErpEmployeeUpdate}
import services.converters.ErpEmployeeConverter.toErpEmployee

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allErpEmployeesAction(sampleCompanyId: UUID) =
    runIO(allErpEmployeesQuotation(sampleCompanyId))

  def allErpEmployeesQuotation(sampleCompanyId: UUID) =
    quote(query[ErpEmployee].filter(_.sampleCompanyId == lift(sampleCompanyId)))
}

trait DefaultCreateErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createErpEmployeeAction(creation: ErpEmployeeCreation) =
    runIO(maximumIdQuotation(creation.sampleCompanyId))
      .flatMap(maximumId => runIO(createErpEmployeeQuotation(creation, maximumId.map(_ + 1).getOrElse(1))))
      .transactional

  def createErpEmployeeQuotation(creation: ErpEmployeeCreation, id: Int) =
    quote(
      query[ErpEmployee]
        .insert(lift(toErpEmployee(creation, id)))
        .returning(erpEmployee => erpEmployee))

  def maximumIdQuotation(sampleCompanyId: UUID) =
    quote(
      query[ErpEmployee]
        .filter(_.sampleCompanyId == lift(sampleCompanyId))
        .map(_.id)
        .max)
}

trait DefaultUpdateErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateErpEmployeeAction(id: Int, sampleCompanyId: UUID, update: ErpEmployeeUpdate) =
    runIO(updateErpEmployeeQuotation(id, sampleCompanyId, update))

  def updateErpEmployeeQuotation(id: Int, sampleCompanyId: UUID, update: ErpEmployeeUpdate) =
    quote(
      query[ErpEmployee]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .update(
          _.salutation -> lift(update.salutation),
          _.firstName -> lift(update.firstName),
          _.lastName -> lift(update.lastName),
          _.addressLine -> lift(update.addressLine),
          _.postalCode -> lift(update.postalCode),
          _.city -> lift(update.city),
          _.country -> lift(update.country),
          _.email -> lift(update.email),
          _.phone -> lift(update.phone),
          _.department -> lift(update.department),
          _.jobTitle -> lift(update.jobTitle),
          _.employmentMode -> lift(update.employmentMode),
          _.employedAt -> lift(update.employedAt),
          _.employmentEndsAt -> lift(update.employmentEndsAt),
          _.site -> lift(update.site),
          _.graduation -> lift(update.graduation),
          _.furtherEducation -> lift(update.furtherEducation),
          _.taxClass -> lift(update.taxClass),
          _.familyStatus -> lift(update.familyStatus),
          _.childCount -> lift(update.childCount),
          _.note -> lift(update.note),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(erpEmployee => erpEmployee))
}

trait DefaultDeleteErpEmployee {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteErpEmployeeAction(id: Int, sampleCompanyId: UUID) =
    runIO(deleteErpEmployeeQuotation(id, sampleCompanyId))

  def deleteErpEmployeeQuotation(id: Int, sampleCompanyId: UUID) =
    quote(
      query[ErpEmployee]
        .filter(row => row.id == lift(id) && row.sampleCompanyId == lift(sampleCompanyId))
        .delete
        .returning(_.id))
}
