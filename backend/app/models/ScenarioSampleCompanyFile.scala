package models

import enums.Relevance

import java.util.UUID

case class ScenarioSampleCompanyFileCreation(
    scenarioId: UUID,
    fileId: UUID,
    relevance: Relevance
)

case class ScenarioSampleCompanyFileUpdate(
    relevance: Relevance
)
