package services.actions

import database.DatabaseContext
import database.generated.public.QuestionnaireAnswer
import models.QuestionnaireAnswerCreation
import services.converters.QuestionnaireAnswerConverter.toQuestionnaireAnswer

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createQuestionnaireAnswerAction(creation: QuestionnaireAnswerCreation) =
    runIO(questionnaireAnswerMaximumPositionQuotation(creation.questionId))
      .flatMap(maximumPosition =>
        runIO(createQuestionnaireAnswerQuotation(creation, maximumPosition.map(_ + 1).getOrElse(1))))
      .transactional

  def createQuestionnaireAnswerQuotation(creation: QuestionnaireAnswerCreation, position: BigDecimal) =
    quote(
      query[QuestionnaireAnswer]
        .insert(lift(toQuestionnaireAnswer(creation, position)))
        .returning(questionnaireAnswer => questionnaireAnswer))

  def questionnaireAnswerMaximumPositionQuotation(questionId: UUID) =
    quote(
      query[QuestionnaireAnswer]
        .filter(_.questionId == lift(questionId))
        .map(_.position)
        .max)
}
