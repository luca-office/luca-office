package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpOrderCreation(
    scenarioId: UUID,
    orderId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpOrderUpdate(
    relevance: Relevance
)
