package services.generated

import database.DatabaseContext
import database.generated.public.QuestionnaireQuestion
import models.QuestionnaireQuestionUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllQuestionnaireQuestion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allQuestionnaireQuestionsAction(questionnaireId: UUID) =
    runIO(allQuestionnaireQuestionsQuotation(questionnaireId))

  def allQuestionnaireQuestionsQuotation(questionnaireId: UUID) =
    quote(query[QuestionnaireQuestion].filter(_.questionnaireId == lift(questionnaireId)))
}

trait DefaultFindQuestionnaireQuestion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findQuestionnaireQuestionAction(id: UUID) =
    runIO(findQuestionnaireQuestionQuotation(id)).map(_.headOption)

  def findQuestionnaireQuestionQuotation(id: UUID) =
    quote(query[QuestionnaireQuestion].filter(_.id == lift(id)))
}

trait DefaultUpdateQuestionnaireQuestion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateQuestionnaireQuestionAction(id: UUID, update: QuestionnaireQuestionUpdate) =
    runIO(updateQuestionnaireQuestionQuotation(id, update))

  def updateQuestionnaireQuestionQuotation(id: UUID, update: QuestionnaireQuestionUpdate) =
    quote(
      query[QuestionnaireQuestion]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.text -> lift(update.text),
          _.questionType -> lift(update.questionType),
          _.isAdditionalFreeTextAnswerEnabled -> lift(update.isAdditionalTextAnswerAllowed),
          _.scoringType -> lift(update.scoringType),
          _.score -> lift(update.score),
          _.binaryFileId -> lift(update.binaryFileId)
        )
        .returning(questionnaireQuestion => questionnaireQuestion))
}

trait DefaultDeleteQuestionnaireQuestion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteQuestionnaireQuestionAction(id: UUID) =
    runIO(deleteQuestionnaireQuestionQuotation(id))

  def deleteQuestionnaireQuestionQuotation(id: UUID) =
    quote(
      query[QuestionnaireQuestion]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
