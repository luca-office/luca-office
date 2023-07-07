import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpInvoice} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpInvoicesMock: ScenarioErpInvoice[] = [
  {
    __typename: "ScenarioErpInvoice",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    invoiceId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpInvoice",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    invoiceId: 2,
    relevance: Relevance.Required
  },
  {
    __typename: "ScenarioErpInvoice",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    invoiceId: 3,
    relevance: Relevance.Irrelevant
  }
]
