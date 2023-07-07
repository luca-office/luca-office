import {SocketSupervisorMessage} from "shared/models"

export type SocketSurveyProgressMessage =
  | {
      type: "StartQuestionnaireMessage"
      surveyId: UUID
      questionnaireId: UUID
    }
  | {
      type: "StartScenarioMessage"
      surveyId: UUID
      scenarioId: UUID
    }
  | {
      type: "StartSurveyMessage"
      surveyId: UUID
    }
  | {
      type: "EndSurveyMessage"
      surveyId: UUID
    }

export type WebsocketMessages = SocketSupervisorMessage | SocketSurveyProgressMessage
