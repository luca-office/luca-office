package services

import database.DatabaseContext
import database.generated.public.ScenarioRatingCriterionSelection
import models.ScenarioRatingCriterionSelectionCreation
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioRatingCriterionSelectionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioRatingCriterionSelection
    with DefaultCreateScenarioRatingCriterionSelection
    with DefaultDeleteScenarioRatingCriterionSelection {
  val context = databaseContext

  import context._

  def all(scenarioCodingItemRatingId: UUID): Future[Seq[ScenarioRatingCriterionSelection]] =
    performIO(allScenarioRatingCriterionSelectionsAction(scenarioCodingItemRatingId))

  def create(creation: ScenarioRatingCriterionSelectionCreation): Future[ScenarioRatingCriterionSelection] =
    performIO(createScenarioRatingCriterionSelectionAction(creation))
      .recover(defaultErrorHandler)

  def delete(
      scenarioCodingItemRatingId: UUID,
      manualCriterionId: Option[UUID],
      automatedCriterionId: Option[UUID]): Future[ScenarioRatingCriterionSelection] =
    performIO(
      deleteScenarioRatingCriterionSelectionAction(scenarioCodingItemRatingId, manualCriterionId, automatedCriterionId))
}

trait ScenarioRatingCriterionSelectionServiceActions
    extends DefaultAllScenarioCodingItemRating
    with CodingItemServiceActions {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allScenarioRatingCriterionSelectionsAction(
      ratingId: UUID,
      scenarioId: UUID,
      invitationId: UUID): IO[Seq[ScenarioRatingCriterionSelection], Effect.Read] =
    runIO(for {
      codingItem <- allCodingItemsForScenarioQuotation(scenarioId)
      scenarioCodingItemRating <- allScenarioCodingItemRatingsQuotation(ratingId)
        .filter(row => row.surveyInvitationId == lift(invitationId) && row.codingItemId == codingItem.id)
      criterionSelection <- query[ScenarioRatingCriterionSelection]
        .filter(_.scenarioCodingItemRatingId == scenarioCodingItemRating.id)
    } yield criterionSelection)
}
