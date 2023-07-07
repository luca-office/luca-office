package services.converters

import database.generated.public.ScenarioRatingCriterionSelection
import models.ScenarioRatingCriterionSelectionCreation
import utils.DateUtils

object ScenarioRatingCriterionSelectionConverter {

  def toScenarioRatingCriterionSelection(
      creation: ScenarioRatingCriterionSelectionCreation): ScenarioRatingCriterionSelection =
    ScenarioRatingCriterionSelection(
      createdAt = DateUtils.now,
      scenarioCodingItemRatingId = creation.scenarioCodingItemRatingId,
      manualCriterionId = creation.manualCriterionId,
      automatedCriterionId = creation.automatedCriterionId
    )
}
