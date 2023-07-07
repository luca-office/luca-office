export interface MessagePayload {
  readonly message: UUID
}

export interface SocketMessage {
  readonly surveyId: UUID
}

export interface SocketParticipantMessage extends SocketMessage, MessagePayload {
  readonly invitationId: UUID
  readonly type: "SendParticipantChatMessageMessage"
}

export interface SocketSupervisorMessage extends SocketMessage, MessagePayload {
  readonly userAccountId: UUID
  readonly recipientInvitationId: UUID
  readonly type: "SendSupervisorChatMessageMessage"
}

export interface SocketAvailableParticipantsMessage extends SocketMessage {
  readonly invitationIds: UUID[]
  readonly type: "AvailableParticipantsMessage"
}
export interface SocketStartScenarioMessage extends SocketMessage {
  readonly scenarioId: UUID
  readonly type: "StartScenarioMessage"
}
export interface SocketStartQuestionnaireMessage extends SocketMessage {
  readonly questionnaireId: UUID
  readonly type: "StartQuestionnaireMessage"
}
