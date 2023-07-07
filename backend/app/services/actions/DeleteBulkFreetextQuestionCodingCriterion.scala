package services.actions

import database.DatabaseContext
import database.generated.public.FreetextQuestionCodingCriterion

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DeleteBulkFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def deleteBulkFreetextQuestionCodingCriterionAction(questionId: UUID) =
    runIO(deleteBulkFreetextQuestionCodingCriterionQuotation(questionId))

  def deleteBulkFreetextQuestionCodingCriterionQuotation(questionId: UUID) =
    quote(
      query[FreetextQuestionCodingCriterion]
        .filter(_.questionId == lift(questionId))
        .delete)
}
