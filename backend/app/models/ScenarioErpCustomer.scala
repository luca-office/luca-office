package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpCustomerCreation(
    scenarioId: UUID,
    customerId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpCustomerUpdate(
    relevance: Relevance
)
