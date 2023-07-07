import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpComponent} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpComponentsMock: ScenarioErpComponent[] = [
  {
    __typename: "ScenarioErpComponent",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    componentId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpComponent",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    componentId: 2,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioErpComponent",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    componentId: 3,
    relevance: Relevance.Required
  }
]
