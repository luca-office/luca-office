package services.generated

import database.DatabaseContext
import database.generated.public.FreetextQuestionRating
import models.{FreetextQuestionRatingCreation, FreetextQuestionRatingUpdate}
import services.converters.FreetextQuestionRatingConverter.toFreetextQuestionRating
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllFreetextQuestionRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allFreetextQuestionRatingsAction(ratingId: UUID) =
    runIO(allFreetextQuestionRatingsQuotation(ratingId))

  def allFreetextQuestionRatingsQuotation(ratingId: UUID) =
    quote(query[FreetextQuestionRating].filter(_.ratingId == lift(ratingId)))
}

trait DefaultFindFreetextQuestionRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findFreetextQuestionRatingAction(id: UUID) =
    runIO(findFreetextQuestionRatingQuotation(id)).map(_.headOption)

  def findFreetextQuestionRatingQuotation(id: UUID) =
    quote(query[FreetextQuestionRating].filter(_.id == lift(id)))
}

trait DefaultCreateFreetextQuestionRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createFreetextQuestionRatingAction(creation: FreetextQuestionRatingCreation) =
    runIO(createFreetextQuestionRatingQuotation(creation))

  def createFreetextQuestionRatingQuotation(creation: FreetextQuestionRatingCreation) =
    quote(
      query[FreetextQuestionRating]
        .insert(lift(toFreetextQuestionRating(creation)))
        .returning(freetextQuestionRating => freetextQuestionRating))
}

trait DefaultUpdateFreetextQuestionRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def updateFreetextQuestionRatingAction(id: UUID, update: FreetextQuestionRatingUpdate) =
    runIO(updateFreetextQuestionRatingQuotation(id, update))

  def updateFreetextQuestionRatingQuotation(id: UUID, update: FreetextQuestionRatingUpdate) =
    quote(
      query[FreetextQuestionRating]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.noCriterionFulfilled -> lift(update.noCriterionFulfilled)
        )
        .returning(freetextQuestionRating => freetextQuestionRating))
}
