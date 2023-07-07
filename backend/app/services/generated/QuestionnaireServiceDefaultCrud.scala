package services.generated

import database.DatabaseContext
import database.generated.public.Questionnaire
import models.{QuestionnaireCreation, QuestionnaireUpdate}
import services.converters.QuestionnaireConverter.toQuestionnaire
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultCreateQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createQuestionnaireAction(creation: QuestionnaireCreation, authorId: UUID) =
    runIO(createQuestionnaireQuotation(creation, authorId))

  def createQuestionnaireQuotation(creation: QuestionnaireCreation, authorId: UUID) =
    quote(
      query[Questionnaire]
        .insert(lift(toQuestionnaire(creation, authorId)))
        .returning(questionnaire => questionnaire))
}

trait DefaultUpdateQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateQuestionnaireAction(id: UUID, update: QuestionnaireUpdate) =
    runIO(updateQuestionnaireQuotation(id, update))

  def updateQuestionnaireQuotation(id: UUID, update: QuestionnaireUpdate) =
    quote(
      query[Questionnaire]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description),
          _.questionnaireType -> lift(update.questionnaireType),
          _.binaryFileId -> lift(update.binaryFileId),
          _.maxDurationInSeconds -> lift(update.maxDurationInSeconds)
        )
        .returning(questionnaire => questionnaire))
}

trait DefaultDeleteQuestionnaire {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteQuestionnaireAction(id: UUID) =
    runIO(deleteQuestionnaireQuotation(id))

  def deleteQuestionnaireQuotation(id: UUID) =
    quote(
      query[Questionnaire]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
