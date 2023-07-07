package models

import java.util.UUID

case class ScenarioCodingItemRatingCreation(
    ratingId: UUID,
    surveyInvitationId: UUID,
    codingItemId: UUID,
    noCriterionFulfilled: Boolean
)

case class ScenarioCodingItemRatingUpdate(
    noCriterionFulfilled: Boolean
)
