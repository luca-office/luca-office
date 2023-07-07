package services.actions

import database.DatabaseContext
import database.generated.public.SampleCompany
import models.SampleCompanyCreation
import services.converters.SampleCompanyConverter.toSampleCompany
import services.generated.DefaultCreateDirectory

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateSampleCompany extends DefaultCreateDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createSampleCompanyAction(userAccountId: UUID)(creation: SampleCompanyCreation) =
    runIO(createSampleCompanyQuotation(userAccountId)(creation))

  def createSampleCompanyQuotation(userAccountId: UUID)(creation: SampleCompanyCreation) =
    quote(
      query[SampleCompany]
        .insert(lift(toSampleCompany(creation, userAccountId)))
        .returning(sampleCompany => sampleCompany))
}
