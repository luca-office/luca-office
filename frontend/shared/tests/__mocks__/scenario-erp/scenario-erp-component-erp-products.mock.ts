import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpComponentErpProduct} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpComponentErpProductsMock: ScenarioErpComponentErpProduct[] = [
  {
    __typename: "ScenarioErpComponentErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    relevance: Relevance.PotentiallyHelpful,
    componentProductId: 1
  },
  {
    __typename: "ScenarioErpComponentErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    relevance: Relevance.PotentiallyHelpful,
    componentProductId: 2
  },
  {
    __typename: "ScenarioErpComponentErpProduct",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    relevance: Relevance.PotentiallyHelpful,
    componentProductId: 3
  }
]
