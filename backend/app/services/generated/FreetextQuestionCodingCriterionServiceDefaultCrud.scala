package services.generated

import database.DatabaseContext
import database.generated.public.FreetextQuestionCodingCriterion
import models.{FreetextQuestionCodingCriterionCreation, FreetextQuestionCodingCriterionUpdate}
import services.converters.FreetextQuestionCodingCriterionConverter.toFreetextQuestionCodingCriterion
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allFreetextQuestionCodingCriteriaAction(questionId: UUID) =
    runIO(allFreetextQuestionCodingCriteriaQuotation(questionId))

  def allFreetextQuestionCodingCriteriaQuotation(questionId: UUID) =
    quote(query[FreetextQuestionCodingCriterion].filter(_.questionId == lift(questionId)))
}

trait DefaultFindFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findFreetextQuestionCodingCriterionAction(id: UUID) =
    runIO(findFreetextQuestionCodingCriterionQuotation(id)).map(_.headOption)

  def findFreetextQuestionCodingCriterionQuotation(id: UUID) =
    quote(query[FreetextQuestionCodingCriterion].filter(_.id == lift(id)))
}

trait DefaultCreateFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createFreetextQuestionCodingCriterionAction(creation: FreetextQuestionCodingCriterionCreation) =
    runIO(createFreetextQuestionCodingCriterionQuotation(creation))

  def createFreetextQuestionCodingCriterionQuotation(creation: FreetextQuestionCodingCriterionCreation) =
    quote(
      query[FreetextQuestionCodingCriterion]
        .insert(lift(toFreetextQuestionCodingCriterion(creation)))
        .returning(freetextQuestionCodingCriterion => freetextQuestionCodingCriterion))
}

trait DefaultUpdateFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateFreetextQuestionCodingCriterionAction(id: UUID, update: FreetextQuestionCodingCriterionUpdate) =
    runIO(updateFreetextQuestionCodingCriterionQuotation(id, update))

  def updateFreetextQuestionCodingCriterionQuotation(id: UUID, update: FreetextQuestionCodingCriterionUpdate) =
    quote(
      query[FreetextQuestionCodingCriterion]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.description -> lift(update.description),
          _.score -> lift(update.score)
        )
        .returning(freetextQuestionCodingCriterion => freetextQuestionCodingCriterion))
}

trait DefaultDeleteFreetextQuestionCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteFreetextQuestionCodingCriterionAction(id: UUID) =
    runIO(deleteFreetextQuestionCodingCriterionQuotation(id))

  def deleteFreetextQuestionCodingCriterionQuotation(id: UUID) =
    quote(
      query[FreetextQuestionCodingCriterion]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
