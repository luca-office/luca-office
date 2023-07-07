import {ProjectModuleProgressType, ProjectModuleType} from "../../src/graphql/generated/globalTypes"
import {ParticipantProjectProgress} from "../../src/models"

export const participantProjectProgressMock: ParticipantProjectProgress = {
  id: "123",
  displayName: "Test User",
  moduleProgress: [
    {
      status: ProjectModuleProgressType.Completed,
      moduleId: "123",
      name: "Test Scenario",
      questionsCompleted: 0,
      questionsCount: 0,
      moduleType: ProjectModuleType.Scenario,
      documentsCount: 5,
      documentsOpened: 3
    },
    {
      status: ProjectModuleProgressType.Completed,
      moduleId: "124",
      name: "Test Scenario 2",
      questionsCompleted: 0,
      questionsCount: 0,
      moduleType: ProjectModuleType.Scenario,
      documentsCount: 5,
      documentsOpened: 3
    },
    {
      status: ProjectModuleProgressType.Completed,
      moduleId: "125",
      name: "Test Scenario 2",
      questionsCompleted: 0,
      questionsCount: 0,
      moduleType: ProjectModuleType.Scenario,
      documentsCount: 5,
      documentsOpened: 3
    },
    {
      status: ProjectModuleProgressType.Completed,
      moduleId: "126",
      name: "Test Questionnaire 2",
      questionsCompleted: 2,
      questionsCount: 5,
      moduleType: ProjectModuleType.Questionnaire,
      documentsCount: 0,
      documentsOpened: 0
    }
  ]
}

export const participantProjectProgressStartedMock: ParticipantProjectProgress = {
  id: "123",
  displayName: "Test User",
  moduleProgress: [
    {
      status: ProjectModuleProgressType.InProgress,
      moduleId: "123",
      name: "Test Scenario",
      questionsCompleted: 0,
      questionsCount: 0,
      moduleType: ProjectModuleType.Scenario,
      documentsCount: 5,
      documentsOpened: 3
    },
    {
      status: undefined,
      moduleId: "1233",
      name: "Test Scenario 2",
      questionsCompleted: 0,
      questionsCount: 0,
      moduleType: ProjectModuleType.Scenario,
      documentsCount: 0,
      documentsOpened: 0
    }
  ]
}
