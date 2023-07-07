package services.actions

import database.DatabaseContext
import database.generated.public.CodingCriterion
import models.CodingCriterionCreation
import services.converters.CodingCriterionConverter.toCodingCriterion

import scala.concurrent.ExecutionContext

trait CreateBulkCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkCodingCriterionAction(creations: Seq[CodingCriterionCreation]) =
    runIO(createBulkCodingCriterionQuotation(creations))

  def createBulkCodingCriterionQuotation(creations: Seq[CodingCriterionCreation]) =
    quote(
      liftQuery(creations.map(toCodingCriterion))
        .foreach(codingCriterion =>
          query[CodingCriterion]
            .insert(codingCriterion)
            .returning(codingCriterion => codingCriterion)))
}
