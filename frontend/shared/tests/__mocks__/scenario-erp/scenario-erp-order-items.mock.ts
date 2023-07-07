import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpOrderItem} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpOrderItemsMock: ScenarioErpOrderItem[] = [
  {
    __typename: "ScenarioErpOrderItem",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderItemId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpOrderItem",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderItemId: 2,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioErpOrderItem",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    orderItemId: 3,
    relevance: Relevance.Required
  }
]
