package models

import java.util.UUID

case class FreetextQuestionCodingCriterionCreation(
    description: String,
    score: Int,
    questionId: UUID
)

case class FreetextQuestionCodingCriterionUpdate(
    description: String,
    score: Int
)
