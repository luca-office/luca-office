package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioRatingCriterionSelection
import models.ScenarioRatingCriterionSelectionCreation
import services.CustomError
import services.converters.ScenarioRatingCriterionSelectionConverter.toScenarioRatingCriterionSelection

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allScenarioRatingCriterionSelectionsAction(scenarioCodingItemRatingId: UUID) =
    runIO(allScenarioRatingCriterionSelectionsQuotation(scenarioCodingItemRatingId))

  def allScenarioRatingCriterionSelectionsQuotation(scenarioCodingItemRatingId: UUID) =
    quote(
      query[ScenarioRatingCriterionSelection].filter(_.scenarioCodingItemRatingId == lift(scenarioCodingItemRatingId)))
}

trait DefaultCreateScenarioRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createScenarioRatingCriterionSelectionAction(creation: ScenarioRatingCriterionSelectionCreation) =
    runIO(createScenarioRatingCriterionSelectionQuotation(creation))

  def createScenarioRatingCriterionSelectionQuotation(creation: ScenarioRatingCriterionSelectionCreation) =
    quote(
      query[ScenarioRatingCriterionSelection]
        .insert(lift(toScenarioRatingCriterionSelection(creation)))
        .returning(scenarioRatingCriterionSelection => scenarioRatingCriterionSelection))
}

trait DefaultDeleteScenarioRatingCriterionSelection {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def deleteScenarioRatingCriterionSelectionAction(
      scenarioCodingItemRatingId: UUID,
      manualCriterionId: Option[UUID],
      automatedCriterionId: Option[UUID]) =
    (manualCriterionId, automatedCriterionId) match {
      case (Some(criterionId), None) =>
        runIO(deleteScenarioRatingManualCriterionSelectionQuotation(scenarioCodingItemRatingId, criterionId))
      case (None, Some(criterionId)) =>
        runIO(deleteScenarioRatingAutomatedCriterionSelectionQuotation(scenarioCodingItemRatingId, criterionId))
      case _ =>
        IO.failed(CustomError("exactly one of manualCriterionId and automatedCriterionId must be defined"))
    }

  def deleteScenarioRatingManualCriterionSelectionQuotation(scenarioCodingItemRatingId: UUID, manualCriterionId: UUID) =
    quote(
      query[ScenarioRatingCriterionSelection]
        .filter(row =>
          row.scenarioCodingItemRatingId == lift(scenarioCodingItemRatingId)
            && row.manualCriterionId.contains(lift(manualCriterionId)))
        .delete
        .returning(scenarioRatingCriterionSelection => scenarioRatingCriterionSelection))

  def deleteScenarioRatingAutomatedCriterionSelectionQuotation(
      scenarioCodingItemRatingId: UUID,
      automatedCriterionId: UUID) =
    quote(
      query[ScenarioRatingCriterionSelection]
        .filter(row =>
          row.scenarioCodingItemRatingId == lift(scenarioCodingItemRatingId)
            && row.automatedCriterionId.contains(lift(automatedCriterionId)))
        .delete
        .returning(scenarioRatingCriterionSelection => scenarioRatingCriterionSelection))
}
