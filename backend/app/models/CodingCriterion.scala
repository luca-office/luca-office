package models

import java.util.UUID

case class CodingCriterionCreation(
    description: String,
    score: Int,
    itemId: UUID
)

case class CodingCriterionUpdate(
    description: String,
    score: Int
)
