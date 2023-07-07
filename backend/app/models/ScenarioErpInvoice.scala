package models

import enums.Relevance

import java.util.UUID

case class ScenarioErpInvoiceCreation(
    scenarioId: UUID,
    invoiceId: Int,
    sampleCompanyId: UUID,
    relevance: Relevance
)

case class ScenarioErpInvoiceUpdate(
    relevance: Relevance
)
