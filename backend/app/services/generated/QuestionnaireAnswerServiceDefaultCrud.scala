package services.generated

import database.DatabaseContext
import database.generated.public.QuestionnaireAnswer
import models.QuestionnaireAnswerUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allQuestionnaireAnswersAction(questionId: UUID): IO[Seq[QuestionnaireAnswer], Effect.Read] =
    runIO(allQuestionnaireAnswerQuotation(questionId))

  def allQuestionnaireAnswerQuotation(questionId: UUID) =
    quote(query[QuestionnaireAnswer].filter(_.questionId == lift(questionId)))
}

trait DefaultFindQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findAction(id: UUID): IO[Option[QuestionnaireAnswer], Effect.Read] =
    runIO(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[QuestionnaireAnswer].filter(_.id == lift(id)))
}

trait DefaultUpdateQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateQuotation(id: UUID, update: QuestionnaireAnswerUpdate) =
    quote(
      query[QuestionnaireAnswer]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.text -> lift(update.text),
          _.isCorrect -> lift(update.isCorrect)
        )
        .returning(questionnaireAnswer => questionnaireAnswer))
}

trait DefaultDeleteQuestionnaireAnswer {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteQuotation(id: UUID) =
    quote(
      query[QuestionnaireAnswer]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
