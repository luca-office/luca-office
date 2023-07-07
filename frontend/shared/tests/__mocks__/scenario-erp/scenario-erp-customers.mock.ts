import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpCustomer} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpCustomersMock: ScenarioErpCustomer[] = [
  {
    __typename: "ScenarioErpCustomer",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpCustomer",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 2,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioErpCustomer",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 3,
    relevance: Relevance.Required
  }
]
