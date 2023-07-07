package models

import java.util.UUID

case class ScenarioRatingCriterionSelectionCreation(
    scenarioCodingItemRatingId: UUID,
    manualCriterionId: Option[UUID],
    automatedCriterionId: Option[UUID]
)
