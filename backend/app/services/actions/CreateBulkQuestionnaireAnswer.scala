package services.actions

import database.DatabaseContext
import database.generated.public.QuestionnaireAnswer
import models.QuestionnaireAnswerCreation
import services.converters.QuestionnaireAnswerConverter.toQuestionnaireAnswer

import scala.concurrent.ExecutionContext

trait CreateBulkQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkQuestionnaireAnswerAction(creationPairs: Seq[(QuestionnaireAnswerCreation, BigDecimal)]) =
    runIO(createBulkQuestionnaireAnswerQuotation(creationPairs))

  def createBulkQuestionnaireAnswerQuotation(creationPairs: Seq[(QuestionnaireAnswerCreation, BigDecimal)]) =
    quote(
      liftQuery(creationPairs.map { case (creation, position) => toQuestionnaireAnswer(creation, position) })
        .foreach(questionnaireAnswer =>
          query[QuestionnaireAnswer]
            .insert(questionnaireAnswer)
            .returning(questionnaireAnswer => questionnaireAnswer)))
}
