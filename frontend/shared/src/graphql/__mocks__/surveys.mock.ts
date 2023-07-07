import {Survey, SurveyLight} from "../../models"
import {AuthenticationType, SurveyExecutionType} from "../generated/globalTypes"
import {projectModuleProgressesMock} from "./project-module-progresses.mock"
import {projectsMock} from "./projects.mock"

export const surveysMock: Survey[] = [
  {
    __typename: "Survey",
    id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
    createdAt: "2020-08-03 06:16:28.504000 +00:00",
    modifiedAt: "2020-08-03 06:16:28.504000 +00:00",
    description: "description",
    completedParticipationsCount: 12,
    invitationsCount: 24,
    endsAt: "2020-08-03 06:16:28.504000 +00:00",
    isCompleted: false,
    isOpenParticipationEnabled: false,
    openParticipationPlayerUrl: "",
    authenticationType: AuthenticationType.OnlyRegistered,
    projectId: projectsMock[0].id,
    project: projectsMock[0],
    startsAt: "2020-08-13 06:16:28.504000 +00:00",
    title: "my test scenario",
    isRatingFinalized: false,
    executionType: SurveyExecutionType.AutomaticAsynchronous,
    manualPeriod: {
      __typename: "Period",
      end: null,
      start: null
    },
    isTestSurvey: false,
    inProgressParticipationsCount:
      projectModuleProgressesMock[0].inProgressParticipationsCount +
      projectModuleProgressesMock[1].inProgressParticipationsCount +
      projectModuleProgressesMock[2].inProgressParticipationsCount,
    projectModuleProgresses: projectModuleProgressesMock
  },
  {
    __typename: "Survey",
    id: "18de306c-a8f8-4311-9a2f-ca5418a245av",
    createdAt: "2020-08-03 06:16:28.504000 +00:00",
    modifiedAt: "2020-08-03 06:16:28.504000 +00:00",
    description: "description",
    completedParticipationsCount: 0,
    invitationsCount: 2,
    endsAt: "2020-08-03 06:16:28.504000 +00:00",
    isCompleted: true,
    isRatingFinalized: false,
    isOpenParticipationEnabled: false,
    openParticipationPlayerUrl: "",
    authenticationType: AuthenticationType.OnlyRegistered,
    projectId: projectsMock[0].id,
    project: projectsMock[0],
    manualPeriod: {
      __typename: "Period",
      end: null,
      start: null
    },
    startsAt: "2020-08-13 06:16:28.504000 +00:00",
    executionType: SurveyExecutionType.AutomaticAsynchronous,
    title: "my test scenario",
    inProgressParticipationsCount:
      projectModuleProgressesMock[0].inProgressParticipationsCount +
      projectModuleProgressesMock[1].inProgressParticipationsCount,
    projectModuleProgresses: [projectModuleProgressesMock[0], projectModuleProgressesMock[1]],
    isTestSurvey: false
  }
]

export const surveyLightMock: SurveyLight = {
  __typename: "Survey",
  id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
  createdAt: "2020-08-03 06:16:28.504000 +00:00",
  modifiedAt: "2020-08-03 06:16:28.504000 +00:00",
  description: "description",
  completedParticipationsCount: 12,
  invitationsCount: 24,
  endsAt: "2020-08-03 06:16:28.504000 +00:00",
  isCompleted: false,
  isOpenParticipationEnabled: false,
  openParticipationPlayerUrl: "",
  authenticationType: AuthenticationType.OnlyRegistered,
  projectId: projectsMock[0].id,
  project: projectsMock[0],
  startsAt: "2020-08-13 06:16:28.504000 +00:00",
  title: "my test scenario",
  isRatingFinalized: false,
  executionType: SurveyExecutionType.AutomaticAsynchronous,
  manualPeriod: {
    __typename: "Period",
    end: null,
    start: null
  },
  isTestSurvey: false,
  inProgressParticipationsCount:
    projectModuleProgressesMock[0].inProgressParticipationsCount +
    projectModuleProgressesMock[1].inProgressParticipationsCount +
    projectModuleProgressesMock[2].inProgressParticipationsCount
}
