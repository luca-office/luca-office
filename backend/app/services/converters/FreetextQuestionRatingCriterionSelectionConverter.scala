package services.converters

import database.generated.public.FreetextQuestionRatingCriterionSelection
import models.FreetextQuestionRatingCriterionSelectionCreation
import utils.DateUtils

object FreetextQuestionRatingCriterionSelectionConverter {

  def toFreetextQuestionRatingCriterionSelection(
      creation: FreetextQuestionRatingCriterionSelectionCreation): FreetextQuestionRatingCriterionSelection =
    FreetextQuestionRatingCriterionSelection(
      createdAt = DateUtils.now,
      freetextQuestionRatingId = creation.freetextQuestionRatingId,
      criterionId = creation.criterionId
    )
}
