import {ScenarioSampleCompanyFile} from "../../models"
import {Relevance} from "../generated/globalTypes"
import {fileFragmentsMock} from "./files.mock"
import {scenariosMock} from "./scenarios.mock"

export const scenarioSampleCompanyFilesMock: ScenarioSampleCompanyFile[] = [
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[0].id,
    fileId: fileFragmentsMock[0].id,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[0].id,
    fileId: fileFragmentsMock[1].id,
    relevance: Relevance.Required
  },
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[0].id,
    fileId: fileFragmentsMock[2].id,
    relevance: Relevance.Irrelevant
  },
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[1].id,
    fileId: fileFragmentsMock[0].id,
    relevance: Relevance.PotentiallyHelpful
  },
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[1].id,
    fileId: fileFragmentsMock[1].id,
    relevance: Relevance.Required
  },
  {
    __typename: "ScenarioSampleCompanyFile",
    scenarioId: scenariosMock[1].id,
    fileId: fileFragmentsMock[2].id,
    relevance: Relevance.Irrelevant
  }
]
