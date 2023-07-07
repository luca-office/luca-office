package services.converters

import database.generated.public.ScenarioCodingItemRating
import models.ScenarioCodingItemRatingCreation
import utils.DateUtils

import java.util.UUID

object ScenarioCodingItemRatingConverter {

  def toScenarioCodingItemRating(creation: ScenarioCodingItemRatingCreation): ScenarioCodingItemRating =
    ScenarioCodingItemRating(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      ratingId = creation.ratingId,
      codingItemId = creation.codingItemId,
      surveyInvitationId = creation.surveyInvitationId,
      noCriterionFulfilled = creation.noCriterionFulfilled
    )
}
