package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpProductCreation(
    scenarioId: UUID,
    productId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpProductUpdate(
    relevance: Relevance
)
