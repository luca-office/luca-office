import {
  ChatMessagesQuery_chatMessages,
  ChatMessagesQuery_chatMessages_ParticipantChatMessage,
  ChatMessagesQuery_chatMessages_SupervisorChatMessage
} from "../../graphql/generated/ChatMessagesQuery"

export type RemoteChatMessage = ChatMessagesQuery_chatMessages
export type RemoteSupervisorMessage = ChatMessagesQuery_chatMessages_SupervisorChatMessage
export type RemoteParticipantMessage = ChatMessagesQuery_chatMessages_ParticipantChatMessage

export interface LocalMessagePayload {
  readonly timestamp: Date
  readonly message: string
  readonly surveyId: UUID
}

export interface LocalSupervisorMessage extends LocalMessagePayload {
  readonly type: "supervisor"
  readonly userAccountId: UUID
  readonly recipientInvitationIds: UUID[]
}

export interface LocalParticipantMessage extends LocalMessagePayload {
  readonly type: "participant"
  readonly invitationId: UUID
}

export type LocalChatMessage = LocalSupervisorMessage | LocalParticipantMessage

export type DisplayChatMessage = Omit<LocalChatMessage, "timestamp"> & {name: string; self: boolean; timestamp?: Date}
