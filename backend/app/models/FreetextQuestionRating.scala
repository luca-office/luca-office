package models

import java.util.UUID

case class FreetextQuestionRatingCreation(
    ratingId: UUID,
    questionId: UUID,
    surveyInvitationId: UUID,
    noCriterionFulfilled: Boolean
)

case class FreetextQuestionRatingUpdate(
    noCriterionFulfilled: Boolean
)
