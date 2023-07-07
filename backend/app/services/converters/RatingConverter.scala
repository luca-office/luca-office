package services.converters

import database.generated.public.Rating
import models.RatingCreation
import utils.DateUtils

import java.util.UUID

object RatingConverter {

  def toRating(creation: RatingCreation, userAccountId: UUID): Rating =
    Rating(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      finalizedAt = None,
      isFinalScore = creation.isFinalScore,
      surveyId = creation.surveyId,
      userAccountId = userAccountId
    )
}
