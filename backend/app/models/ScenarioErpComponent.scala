package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpComponentCreation(
    scenarioId: UUID,
    componentId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpComponentUpdate(
    relevance: Relevance
)
