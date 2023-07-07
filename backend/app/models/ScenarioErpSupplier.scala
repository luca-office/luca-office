package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpSupplierCreation(
    scenarioId: UUID,
    supplierId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpSupplierUpdate(
    relevance: Relevance
)
