package services.actions

import database.DatabaseContext
import database.generated.public.CodingModel
import enums.AutomatedCodingItemRule
import models.{AutomatedCodingItemCreation, ManualCodingItemCreation}
import services.EntityNotFound
import services.converters.CodingCriterionConverter.toCodingCriterionCreation
import services.converters.CodingDimensionConverter.toCodingDimensionCreation
import services.converters.CodingItemConverter.toCodingItemCreation
import services.converters.CodingModelConverter.toCodingModelCreation
import services.converters.ScenarioCodingAutomatedCriterionConverter.toScenarioCodingAutomatedCriterionCreation
import services.generated._

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DuplicateCodingModel
    extends DefaultFindCodingModel
    with DefaultCreateCodingModel
    with DefaultAllCodingDimension
    with CreateBulkCodingDimension
    with DefaultAllCodingItem
    with CreateBulkCodingItem
    with DefaultAllCodingCriterion
    with CreateBulkCodingCriterion
    with DefaultAllScenarioCodingAutomatedCriterion
    with CreateBulkScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def duplicateCodingModelAction(
      id: UUID,
      targetScenarioId: UUID,
      emailIdMapping: Option[UUID => UUID],
      fileIdMapping: Option[UUID => UUID],
      shouldDuplicateScenarioReferencingCriteria: Boolean): IO[CodingModel, Effect.Read with Effect.Write] =
    findCodingModelAction(id).flatMap {
      case Some(codingModel) =>
        for {
          duplicatedCodingModel <- createCodingModelAction(
            toCodingModelCreation(codingModel).copy(scenarioId = targetScenarioId))
          _ <- duplicateCodingDimensionsAction(
            id,
            duplicatedCodingModel.id,
            emailIdMapping,
            fileIdMapping,
            shouldDuplicateScenarioReferencingCriteria)
        } yield duplicatedCodingModel
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def duplicateCodingDimensionsAction(
      codingModelId: UUID,
      duplicatedCodingModelId: UUID,
      emailIdMapping: Option[UUID => UUID],
      fileIdMapping: Option[UUID => UUID],
      shouldDuplicateScenarioReferencingCriteria: Boolean) =
    allCodingDimensionsAction(codingModelId).flatMap { dimensions =>
      val dimensionIdMapping = dimensions.map(_.id -> UUID.randomUUID()).toMap
      val creationTuples = dimensions.map(dimension =>
        (
          toCodingDimensionCreation(dimension).copy(
            codingModelId = duplicatedCodingModelId,
            parentDimensionId = dimension.parentDimensionId.map(dimensionIdMapping)),
          dimensionIdMapping(dimension.id),
          dimension.position
        ))

      createBulkCodingDimensionAction(creationTuples).flatMap(_ =>
        IO.sequence(
          dimensions.map(dimension =>
            duplicateCodingItemsAction(
              dimension.id,
              dimensionIdMapping(dimension.id),
              emailIdMapping,
              fileIdMapping,
              shouldDuplicateScenarioReferencingCriteria))))
    }

  private def duplicateCodingItemsAction(
      codingDimensionId: UUID,
      duplicatedCodingDimensionId: UUID,
      emailIdMapping: Option[UUID => UUID],
      fileIdMapping: Option[UUID => UUID],
      shouldDuplicateScenarioReferencingCriteria: Boolean) =
    allCodingItemsAction(codingDimensionId).flatMap { items =>
      val creationPairs = items.map(item =>
        (
          toCodingItemCreation(item) match {
            case creation: AutomatedCodingItemCreation => creation.copy(dimensionId = duplicatedCodingDimensionId)
            case creation: ManualCodingItemCreation => creation.copy(dimensionId = duplicatedCodingDimensionId)
          },
          item.position
        ))

      createBulkCodingItemAction(creationPairs).flatMap { duplicatedItems =>
        val itemPairs = items.sortBy(_.position).zip(duplicatedItems.sortBy(_.position))
        val duplicateCriteriaActions = itemPairs.map { case (item, duplicatedItem) =>
          if (item.isAutomated)
            duplicateAutomatedCodingCriteriaAction(
              item.id,
              duplicatedItem.id,
              emailIdMapping,
              fileIdMapping,
              shouldDuplicateScenarioReferencingCriteria)
          else
            duplicateCodingCriteriaAction(item.id, duplicatedItem.id)
        }
        IO.sequence(duplicateCriteriaActions)
      }
    }

  private def duplicateCodingCriteriaAction(itemId: UUID, duplicatedItemId: UUID) =
    allCodingCriteriaAction(itemId).flatMap(criteria =>
      createBulkCodingCriterionAction(
        criteria.map(criterion => toCodingCriterionCreation(criterion).copy(itemId = duplicatedItemId))))

  private def duplicateAutomatedCodingCriteriaAction(
      itemId: UUID,
      duplicatedItemId: UUID,
      emailIdMapping: Option[UUID => UUID],
      fileIdMapping: Option[UUID => UUID],
      shouldDuplicateScenarioReferencingCriteria: Boolean) =
    allScenarioCodingAutomatedCriteriaAction(itemId).flatMap(criteria =>
      createBulkScenarioCodingAutomatedCriterionAction(
        criteria
          .filter(criterion =>
            shouldDuplicateScenarioReferencingCriteria ||
              (criterion.rule != AutomatedCodingItemRule.DocumentView
                && criterion.rule != AutomatedCodingItemRule.InputValue))
          .map(criterion =>
            toScenarioCodingAutomatedCriterionCreation(criterion)
              .copy(
                itemId = duplicatedItemId,
                emailId = emailIdMapping.flatMap(mapping => criterion.emailId.map(mapping)),
                fileId = fileIdMapping.flatMap(mapping => criterion.fileId.map(mapping))
              ))))
}
