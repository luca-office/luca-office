package services.actions

import database.DatabaseContext
import database.generated.public.Rating
import models.RatingCreation
import services.converters.RatingConverter.toRating

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createBulkRatingAction(creations: Seq[(RatingCreation, UUID)]): IO[Seq[Rating], Effect.Write] =
    runIO(liftQuery(creations.map((toRating _).tupled)).foreach(rating =>
      query[Rating].insert(rating).returning(rating => rating)))
}
