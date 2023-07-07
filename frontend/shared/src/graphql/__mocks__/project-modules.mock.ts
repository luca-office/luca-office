import {ProjectModule} from "../../models"
import {ProjectModuleType} from "../generated/globalTypes"
import {projectsMock} from "./projects.mock"
import {questionnairesMock} from "./questionnaires.mock"
import {scenariosMock} from "./scenarios.mock"
import {userAccountMock} from "./user-account.mock"

const projectId = projectsMock[0].id

export const projectModulesMock: ProjectModule[] = [
  {
    __typename: "ProjectModule",
    projectId,
    scenarioId: scenariosMock[0].id,
    position: 1,
    id: "56dcf288-0969-4596-8faf-4ee514dc22eb",
    moduleType: ProjectModuleType.Scenario,
    questionnaireId: questionnairesMock[0].id,
    scenario: scenariosMock[0],
    questionnaire: {
      ...questionnairesMock[0],
      author: userAccountMock,
      __typename: "Questionnaire"
    }
  },
  {
    __typename: "ProjectModule",
    projectId,
    scenarioId: scenariosMock[1].id,
    position: 2,
    id: "69fe6b71-2fd8-4f72-bf49-ae8efb4e0abe",
    moduleType: ProjectModuleType.Scenario,
    questionnaireId: questionnairesMock[1].id,
    scenario: scenariosMock[1],
    questionnaire: {
      ...questionnairesMock[1],
      author: userAccountMock,
      __typename: "Questionnaire"
    }
  },
  {
    __typename: "ProjectModule",
    projectId,
    scenarioId: scenariosMock[2].id,
    position: 3,
    id: "acc3cdfc-8e10-4f51-97c5-d6e5e5e2177e",
    moduleType: ProjectModuleType.Scenario,
    questionnaireId: questionnairesMock[2].id,
    scenario: scenariosMock[2],
    questionnaire: {
      ...questionnairesMock[2],
      author: userAccountMock,
      __typename: "Questionnaire"
    }
  }
]

export const projectModulesMockWithQuestionnaire: ProjectModule[] = [
  ...projectModulesMock,
  {
    __typename: "ProjectModule",
    projectId,
    scenarioId: scenariosMock[1].id,
    position: 2,
    id: "69fe6b71-2fd8-4f72-bf49-ae8efb4e0abv",
    moduleType: ProjectModuleType.Questionnaire,
    questionnaireId: questionnairesMock[1].id,
    scenario: scenariosMock[1],
    questionnaire: {
      ...questionnairesMock[1],
      author: userAccountMock,
      __typename: "Questionnaire"
    }
  }
]
