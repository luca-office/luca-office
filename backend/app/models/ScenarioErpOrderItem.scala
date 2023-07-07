package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpOrderItemCreation(
    scenarioId: UUID,
    orderItemId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpOrderItemUpdate(
    relevance: Relevance
)
