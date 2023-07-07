/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatMessagesQuery
// ====================================================

export interface ChatMessagesQuery_chatMessages_ParticipantChatMessage {
  __typename: "ParticipantChatMessage";
  message: string;
  timestamp: string;
  invitationId: string;
}

export interface ChatMessagesQuery_chatMessages_SupervisorChatMessage {
  __typename: "SupervisorChatMessage";
  message: string;
  timestamp: string;
  userAccountId: string;
  recipientInvitationId: string;
}

export type ChatMessagesQuery_chatMessages = ChatMessagesQuery_chatMessages_ParticipantChatMessage | ChatMessagesQuery_chatMessages_SupervisorChatMessage;

export interface ChatMessagesQuery {
  chatMessages: ChatMessagesQuery_chatMessages[];
}

export interface ChatMessagesQueryVariables {
  surveyId: string;
}
