import {ParticipantProjectModuleProgress} from "../../models"
import {ProjectModuleProgressType} from "../generated/globalTypes"
import {scenarioIdMock} from "./common"
import {questionnairesMock} from "./questionnaires.mock"

export const participantProjectModuleProgressesMock: ParticipantProjectModuleProgress[] = [
  {
    __typename: "ParticipantProjectModuleProgress",
    scenarioId: scenarioIdMock,
    questionnaireId: questionnairesMock[0].id,
    status: ProjectModuleProgressType.Completed,
    questionsInProgressCount: 0,
    requiredDocumentsCount: 2,
    openedRequiredDocumentsCount: 0
  },
  {
    __typename: "ParticipantProjectModuleProgress",
    scenarioId: scenarioIdMock,
    questionnaireId: questionnairesMock[1].id,
    status: ProjectModuleProgressType.InProgress,
    questionsInProgressCount: 4,
    requiredDocumentsCount: 4,
    openedRequiredDocumentsCount: 2
  },
  {
    __typename: "ParticipantProjectModuleProgress",
    scenarioId: scenarioIdMock,
    questionnaireId: questionnairesMock[2].id,
    status: ProjectModuleProgressType.Completed,
    questionsInProgressCount: 0,
    requiredDocumentsCount: 4,
    openedRequiredDocumentsCount: 0
  }
]
