package models

import java.util.UUID

case class CodingDimensionCreation(
    title: String,
    description: String,
    codingModelId: UUID,
    parentDimensionId: Option[UUID]
)

case class CodingDimensionUpdate(
    title: String,
    description: String,
    parentDimensionId: Option[UUID]
)
