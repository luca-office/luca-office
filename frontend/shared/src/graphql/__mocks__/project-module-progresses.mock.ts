import {ProjectModuleProgress} from "../../models"
import {projectModulesMock} from "./project-modules.mock"

export const projectModuleProgressesMock: ProjectModuleProgress[] = [
  {
    __typename: "ProjectModuleProgress",
    projectModuleId: projectModulesMock[0].id,
    inProgressParticipationsCount: 0,
    completedParticipationsCount: 0
  },
  {
    __typename: "ProjectModuleProgress",
    projectModuleId: projectModulesMock[1].id,
    inProgressParticipationsCount: 2,
    completedParticipationsCount: 4
  },
  {
    __typename: "ProjectModuleProgress",
    projectModuleId: projectModulesMock[2].id,
    inProgressParticipationsCount: 4,
    completedParticipationsCount: 8
  }
]
