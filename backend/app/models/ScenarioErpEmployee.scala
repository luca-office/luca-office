package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpEmployeeCreation(
    scenarioId: UUID,
    employeeId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpEmployeeUpdate(
    relevance: Relevance
)
