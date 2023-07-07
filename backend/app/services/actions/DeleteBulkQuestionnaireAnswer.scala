package services.actions

import database.DatabaseContext
import database.generated.public.QuestionnaireAnswer

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DeleteBulkQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def deleteBulkQuestionnaireAnswerAction(questionId: UUID) =
    runIO(deleteBulkQuestionnaireAnswerQuotation(questionId))

  def deleteBulkQuestionnaireAnswerQuotation(questionId: UUID) =
    quote(
      query[QuestionnaireAnswer]
        .filter(_.questionId == lift(questionId))
        .delete)
}
