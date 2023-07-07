import {Relevance} from "../../../src/graphql/generated/globalTypes"
import {ScenarioErpEmployee} from "../../../src/models"
import {sampleCompanyIdMock} from "../erp"
import {scenarioIdMock} from "./common"

export const scenarioErpEmployeesMock: ScenarioErpEmployee[] = [
  {
    __typename: "ScenarioErpEmployee",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    employeeId: 1,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioErpEmployee",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    employeeId: 2,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioErpEmployee",
    scenarioId: scenarioIdMock,
    sampleCompanyId: sampleCompanyIdMock,
    employeeId: 3,
    relevance: Relevance.Required
  }
]
