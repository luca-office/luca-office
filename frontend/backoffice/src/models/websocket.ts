import {
  SocketAvailableParticipantsMessage,
  SocketParticipantMessage,
  SocketStartQuestionnaireMessage,
  SocketStartScenarioMessage,
  SocketSupervisorMessage
} from "shared/models"

export type WebsocketMessages =
  | SocketParticipantMessage
  | SocketAvailableParticipantsMessage
  | SocketSupervisorMessage
  | SocketStartQuestionnaireMessage
  | SocketStartScenarioMessage
