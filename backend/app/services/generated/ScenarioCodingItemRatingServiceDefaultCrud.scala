package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioCodingItemRating
import models.{ScenarioCodingItemRatingCreation, ScenarioCodingItemRatingUpdate}
import services.converters.ScenarioCodingItemRatingConverter.toScenarioCodingItemRating
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioCodingItemRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allScenarioCodingItemRatingsAction(ratingId: UUID): IO[Seq[ScenarioCodingItemRating], Effect.Read] =
    runIO(allScenarioCodingItemRatingsQuotation(ratingId))

  def allScenarioCodingItemRatingsQuotation(ratingId: UUID) =
    quote(query[ScenarioCodingItemRating].filter(_.ratingId == lift(ratingId)))
}

trait DefaultFindScenarioCodingItemRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findScenarioCodingItemRatingAction(id: UUID): IO[Option[ScenarioCodingItemRating], Effect.Read] =
    runIO(findScenarioCodingItemRatingQuotation(id)).map(_.headOption)

  def findScenarioCodingItemRatingQuotation(id: UUID) =
    quote(query[ScenarioCodingItemRating].filter(_.id == lift(id)))
}

trait DefaultCreateScenarioCodingItemRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createScenarioCodingItemRatingAction(
      creation: ScenarioCodingItemRatingCreation): IO[ScenarioCodingItemRating, Effect.Write] =
    runIO(createScenarioCodingItemRatingQuotation(creation))

  def createScenarioCodingItemRatingQuotation(creation: ScenarioCodingItemRatingCreation) =
    quote(
      query[ScenarioCodingItemRating]
        .insert(lift(toScenarioCodingItemRating(creation)))
        .returning(scenarioCodingItemRating => scenarioCodingItemRating))
}

trait DefaultUpdateScenarioCodingItemRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def updateScenarioCodingItemRatingAction(
      id: UUID,
      update: ScenarioCodingItemRatingUpdate): IO[ScenarioCodingItemRating, Effect.Write] =
    runIO(updateScenarioCodingItemRatingQuotation(id, update))

  def updateScenarioCodingItemRatingQuotation(id: UUID, update: ScenarioCodingItemRatingUpdate) =
    quote(
      query[ScenarioCodingItemRating]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.noCriterionFulfilled -> lift(update.noCriterionFulfilled)
        )
        .returning(scenarioCodingItemRating => scenarioCodingItemRating))
}
