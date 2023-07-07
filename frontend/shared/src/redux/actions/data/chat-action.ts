import {Action} from "redux"
import {
  LocalParticipantMessage,
  LocalSupervisorMessage,
  RemoteChatMessage,
  SocketAvailableParticipantsMessage
} from "../../../models"
import {Option} from "../../../utils"

export type ChatAction =
  | PopulateWithRemoteMessagesAction
  | AddSupervisorChatMessageAction
  | AddParticipantChatAction
  | UpdateIsChatAccessibleAction
  | AddUnreadMessageFromParticipantAction
  | AddUnreadMessageFromSupervisorAction
  | ResetUnreadMessagesCountByParticipantId
  | ResetUnreadMessagesCountFromSupervisorAction
  | UpdateAvailableParticipantsAction
  | ResetChatAction
  | UpdateCurrentChatParticipantIdsAction

export enum ChatActionType {
  PopulateWithRemoteMessages = "PopulateWithRemoteMessages",
  AddSupervisorChat = "AddSupervisorChat",
  AddParticipantChat = "AddParticipantChat",
  AddUnreadMessageFromParticipant = "AddUnreadMessageFromParticipant",
  AddUnreadMessageFromSupervisorAction = "AddUnreadMessageFromSupervisorAction",
  ResetUnreadMessagesCountFromSupervisor = "ResetUnreadMessagesCountFromSupervisor",
  ResetUnreadMessagesCountByParticipantId = "ResetUnreadMessagesCountByParticipantId",
  UpdateIsChatAccessible = "UpdateIsChatAccessible",
  UpdateAvailableParticipants = "UpdateAvailableParticipants",
  ResetChat = "ResetChat",
  UpdateCurrentChatParticipantIds = "UpdateCurrentChatParticipantIds"
}
export interface PopulateWithRemoteMessagesAction extends Action {
  readonly type: ChatActionType.PopulateWithRemoteMessages
  readonly chatMessages: RemoteChatMessage[]
  readonly surveyId: UUID
}

export const populateWithRemoteMessages = (
  chatMessages: RemoteChatMessage[],
  surveyId: UUID
): PopulateWithRemoteMessagesAction => ({
  type: ChatActionType.PopulateWithRemoteMessages,
  chatMessages,
  surveyId
})

export interface AddSupervisorChatMessageAction extends Action {
  readonly type: ChatActionType.AddSupervisorChat
  readonly supervisorChatMessage: Omit<LocalSupervisorMessage, "timestamp" | "type">
}

export const addSupervisorChatMessageAction = (
  supervisorMessage: Omit<LocalSupervisorMessage, "timestamp" | "type">
): AddSupervisorChatMessageAction => ({
  type: ChatActionType.AddSupervisorChat,
  supervisorChatMessage: supervisorMessage
})

export interface AddParticipantChatAction extends Action {
  readonly type: ChatActionType.AddParticipantChat
  readonly participantChatMessage: Omit<LocalParticipantMessage, "timestamp" | "type">
}

export const addParticipantChatAction = (
  participantMessage: Omit<LocalParticipantMessage, "timestamp" | "type">
): AddParticipantChatAction => ({
  type: ChatActionType.AddParticipantChat,
  participantChatMessage: participantMessage
})

export interface AddUnreadMessageFromParticipantAction extends Action {
  readonly type: ChatActionType.AddUnreadMessageFromParticipant
  readonly participantId: UUID
}

export const addUnreadMessageFromParticipant = (participantId: UUID): AddUnreadMessageFromParticipantAction => ({
  type: ChatActionType.AddUnreadMessageFromParticipant,
  participantId
})

export interface AddUnreadMessageFromSupervisorAction extends Action {
  readonly type: ChatActionType.AddUnreadMessageFromSupervisorAction
}

export const addUnreadMessageFromSupervisor = (): AddUnreadMessageFromSupervisorAction => ({
  type: ChatActionType.AddUnreadMessageFromSupervisorAction
})

export interface ResetUnreadMessagesCountFromSupervisorAction extends Action {
  readonly type: ChatActionType.ResetUnreadMessagesCountFromSupervisor
}

export const resetUnreadMessageCountFromSupervisor = (): ResetUnreadMessagesCountFromSupervisorAction => ({
  type: ChatActionType.ResetUnreadMessagesCountFromSupervisor
})
export interface ResetUnreadMessagesCountByParticipantId extends Action {
  readonly type: ChatActionType.ResetUnreadMessagesCountByParticipantId
  readonly participantId: UUID
}

export const resetUnreadMessageCountByParticipantId = (
  participantId: UUID
): ResetUnreadMessagesCountByParticipantId => ({
  type: ChatActionType.ResetUnreadMessagesCountByParticipantId,
  participantId
})

export interface UpdateIsChatAccessibleAction extends Action {
  readonly type: ChatActionType.UpdateIsChatAccessible
  readonly isAccessible: boolean
}

export const updateIsChatAccessibleAction = (isAccessible: boolean): UpdateIsChatAccessibleAction => ({
  type: ChatActionType.UpdateIsChatAccessible,
  isAccessible
})

export interface UpdateAvailableParticipantsAction extends Action {
  readonly type: ChatActionType.UpdateAvailableParticipants
  readonly availableParticipants: Option<SocketAvailableParticipantsMessage>
}

export const updateAvailableParticipantsAction = (
  availableParticipants: Option<SocketAvailableParticipantsMessage>
): UpdateAvailableParticipantsAction => ({
  type: ChatActionType.UpdateAvailableParticipants,
  availableParticipants
})

export interface ResetChatAction extends Action {
  readonly type: ChatActionType.ResetChat
}

export const resetChat = (): ResetChatAction => ({
  type: ChatActionType.ResetChat
})

export interface UpdateCurrentChatParticipantIdsAction extends Action {
  readonly type: ChatActionType.UpdateCurrentChatParticipantIds
  readonly chatParticipantIds: Array<UUID>
}

export const updateCurrentChatParticipantIds = (
  chatParticipantIds: Array<UUID>
): UpdateCurrentChatParticipantIdsAction => ({
  type: ChatActionType.UpdateCurrentChatParticipantIds,
  chatParticipantIds
})
