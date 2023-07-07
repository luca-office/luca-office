package services.actions

import database.DatabaseContext
import database.generated.public.QuestionnaireQuestion
import models.QuestionnaireQuestionCreation
import services.converters.QuestionnaireQuestionConverter.toQuestionnaireQuestion

import scala.concurrent.ExecutionContext

trait CreateBulkQuestionnaireQuestion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkQuestionnaireQuestionAction(creationPairs: Seq[(QuestionnaireQuestionCreation, BigDecimal)]) =
    runIO(createBulkQuestionnaireQuestionQuotation(creationPairs))

  def createBulkQuestionnaireQuestionQuotation(creationPairs: Seq[(QuestionnaireQuestionCreation, BigDecimal)]) =
    quote(
      liftQuery(creationPairs.map { case (creation, position) => toQuestionnaireQuestion(creation, position) })
        .foreach(questionnaireQuestion =>
          query[QuestionnaireQuestion]
            .insert(questionnaireQuestion)
            .returning(questionnaireQuestion => questionnaireQuestion)))
}
