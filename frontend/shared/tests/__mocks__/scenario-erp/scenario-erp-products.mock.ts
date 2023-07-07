import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpProduct} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpProductsMock: ScenarioErpProduct[] = [
  {
    __typename: "ScenarioErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    productId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    productId: 2,
    relevance: Relevance.Required
  },
  {
    __typename: "ScenarioErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    productId: 3,
    relevance: Relevance.Irrelevant
  }
]
