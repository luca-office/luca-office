package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpComponentErpProductCreation(
    scenarioId: UUID,
    componentProductId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpComponentErpProductUpdate(
    relevance: Relevance
)
