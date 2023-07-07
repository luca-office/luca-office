package services.generated

import database.DatabaseContext
import database.generated.public.SampleCompany
import models.SampleCompanyUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUpdateSampleCompany {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateSampleCompanyAction(id: UUID, update: SampleCompanyUpdate) =
    runIO(updateSampleCompanyQuotation(id, update))

  def updateSampleCompanyQuotation(id: UUID, update: SampleCompanyUpdate) =
    quote(
      query[SampleCompany]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.name -> lift(update.name),
          _.description -> lift(update.description),
          _.tags -> lift(update.tags),
          _.emailSignature -> lift(update.emailSignature),
          _.logoFileId -> lift(update.logoFileId),
          _.profileFileId -> lift(update.profileFileId),
          _.domain -> lift(update.domain)
        )
        .returning(sampleCompany => sampleCompany))
}

trait DefaultDeleteSampleCompany {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteSampleCompanyAction(id: UUID) =
    runIO(deleteSampleCompanyQuotation(id))

  def deleteSampleCompanyQuotation(id: UUID) =
    quote(
      query[SampleCompany]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
