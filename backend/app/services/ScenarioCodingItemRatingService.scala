package services

import database.DatabaseContext
import database.generated.public.ScenarioCodingItemRating
import models.{ScenarioCodingItemRatingCreation, ScenarioCodingItemRatingUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioCodingItemRatingService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioCodingItemRating
    with DefaultFindScenarioCodingItemRating
    with DefaultCreateScenarioCodingItemRating
    with DefaultUpdateScenarioCodingItemRating
    with CodingItemServiceActions {
  val context = databaseContext

  import context._
  import database.Encoders._

  def all(ratingId: UUID): Future[Seq[ScenarioCodingItemRating]] =
    performIO(allScenarioCodingItemRatingsAction(ratingId))

  def allForParticipant(scenarioId: UUID, surveyInvitationId: UUID): Future[Seq[ScenarioCodingItemRating]] =
    run(for {
      codingItem <- allCodingItemsForScenarioQuotation(scenarioId)
      codingItemRating <- query[ScenarioCodingItemRating]
        .filter(row => row.codingItemId == codingItem.id && row.surveyInvitationId == lift(surveyInvitationId))
    } yield codingItemRating)

  def find(id: UUID): Future[Option[ScenarioCodingItemRating]] =
    performIO(findScenarioCodingItemRatingAction(id))

  def create(creation: ScenarioCodingItemRatingCreation): Future[ScenarioCodingItemRating] =
    performIO(createScenarioCodingItemRatingAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: ScenarioCodingItemRatingUpdate): Future[ScenarioCodingItemRating] =
    performIO(updateScenarioCodingItemRatingAction(id, update))
      .recover(defaultErrorHandler)
}
