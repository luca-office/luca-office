package services.generated

import database.DatabaseContext
import database.generated.public.Rating
import models.RatingCreation
import services.converters.RatingConverter.toRating

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allRatingsAction(surveyId: UUID) =
    runIO(allRatingsQuotation(surveyId))

  def allRatingsQuotation(surveyId: UUID) =
    quote(query[Rating].filter(_.surveyId == lift(surveyId)))
}

trait DefaultFindRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findRatingAction(id: UUID) =
    runIO(findRatingQuotation(id)).map(_.headOption)

  def findRatingQuotation(id: UUID) =
    quote(query[Rating].filter(_.id == lift(id)))
}

trait DefaultCreateRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createRatingAction(creation: RatingCreation, userAccountId: UUID) =
    runIO(createRatingQuotation(creation, userAccountId))

  def createRatingQuotation(creation: RatingCreation, userAccountId: UUID) =
    quote(
      query[Rating]
        .insert(lift(toRating(creation, userAccountId)))
        .returning(rating => rating))
}

trait DefaultDeleteRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteRatingAction(id: UUID) =
    runIO(deleteRatingQuotation(id))

  def deleteRatingQuotation(id: UUID) =
    quote(
      query[Rating]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
