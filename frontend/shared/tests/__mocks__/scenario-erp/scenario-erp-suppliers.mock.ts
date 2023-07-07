import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpSupplier} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpSuppliersMock: ScenarioErpSupplier[] = [
  {
    __typename: "ScenarioErpSupplier",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpSupplier",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 2,
    relevance: Relevance.Required
  },
  {
    __typename: "ScenarioErpSupplier",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 3,
    relevance: Relevance.Irrelevant
  }
]
