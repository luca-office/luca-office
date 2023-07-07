package services.converters

import database.generated.public.FreetextQuestionRating
import models.FreetextQuestionRatingCreation
import utils.DateUtils

import java.util.UUID

object FreetextQuestionRatingConverter {

  def toFreetextQuestionRating(creation: FreetextQuestionRatingCreation): FreetextQuestionRating =
    FreetextQuestionRating(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      questionId = creation.questionId,
      ratingId = creation.ratingId,
      surveyInvitationId = creation.surveyInvitationId,
      noCriterionFulfilled = creation.noCriterionFulfilled
    )
}
