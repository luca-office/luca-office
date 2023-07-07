import {SurveyInvitationProgress} from "../../models"
import {ProjectModuleProgressType} from "../generated/globalTypes"
import {participantDataMock} from "./participant-data.mock"
import {scenariosMock} from "./scenarios.mock"

export const surveyInvitationsProgressMock: SurveyInvitationProgress[] = [
  {
    id: "sfsdf-sfsdf-qwa",
    token: "sdaw",
    email: "test@test.de",
    projectModuleProgresses: [
      {
        scenarioId: scenariosMock[0].id,
        status: ProjectModuleProgressType.Completed,
        __typename: "ParticipantProjectModuleProgress",
        questionnaireId: null,
        questionsInProgressCount: null,
        openedRequiredDocumentsCount: 0,
        requiredDocumentsCount: 2
      },
      {
        scenarioId: scenariosMock[1].id,
        status: ProjectModuleProgressType.InProgress,
        __typename: "ParticipantProjectModuleProgress",
        questionnaireId: null,
        questionsInProgressCount: null,
        openedRequiredDocumentsCount: 1,
        requiredDocumentsCount: 2
      }
    ],
    participantData: participantDataMock[0]
  },
  {
    id: "sfsdf-sfsdf-qwa2",
    token: "sdaw",
    email: "test2@test.de",
    projectModuleProgresses: [
      {
        scenarioId: scenariosMock[0].id,
        status: ProjectModuleProgressType.InProgress,
        __typename: "ParticipantProjectModuleProgress",
        questionnaireId: null,
        questionsInProgressCount: null,
        openedRequiredDocumentsCount: 0,
        requiredDocumentsCount: 2
      }
    ],
    participantData: participantDataMock[0]
  },
  {
    id: "sfsdf-sfsdf-qwa3",
    token: "sdaw",
    email: "test3@test.de",
    projectModuleProgresses: [],
    participantData: participantDataMock[0]
  }
]
