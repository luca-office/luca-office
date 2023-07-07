import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpOrder} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpOrdersMock: ScenarioErpOrder[] = [
  {
    __typename: "ScenarioErpOrder",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpOrder",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 2,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioErpOrder",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 3,
    relevance: Relevance.Required
  }
]
