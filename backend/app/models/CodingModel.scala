package models

import java.util.UUID

case class CodingModelCreation(
    title: String,
    description: String,
    scenarioId: UUID
)

case class CodingModelUpdate(
    title: String,
    description: String
)
