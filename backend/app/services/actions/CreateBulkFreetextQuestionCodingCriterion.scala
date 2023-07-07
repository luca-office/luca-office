package services.actions

import database.DatabaseContext
import database.generated.public.FreetextQuestionCodingCriterion
import models.FreetextQuestionCodingCriterionCreation
import services.converters.FreetextQuestionCodingCriterionConverter.toFreetextQuestionCodingCriterion

import scala.concurrent.ExecutionContext

trait CreateBulkFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkFreetextQuestionCodingCriterionAction(creations: Seq[FreetextQuestionCodingCriterionCreation]) =
    runIO(createBulkFreetextQuestionCodingCriterionQuotation(creations))

  def createBulkFreetextQuestionCodingCriterionQuotation(creations: Seq[FreetextQuestionCodingCriterionCreation]) =
    quote(
      liftQuery(creations.map(toFreetextQuestionCodingCriterion))
        .foreach(freetextQuestionCodingCriterion =>
          query[FreetextQuestionCodingCriterion]
            .insert(freetextQuestionCodingCriterion)
            .returning(freetextQuestionCodingCriterion => freetextQuestionCodingCriterion)))
}
