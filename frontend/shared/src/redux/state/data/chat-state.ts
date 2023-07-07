import {LocalChatMessage} from "../../../models"

export type ChatState = {
  readonly chatMessages: LocalChatMessage[]
  readonly isWebsocketOpen: boolean
  readonly unreadMessageCountByParticipantId: UnreadMessagesCountByParticipantId
  readonly unreadSupervisorMessagesCount: number
  readonly availableParticipantIds: UUID[]
  readonly currentChatParticipantIds: UUID[]
}

export type UnreadMessagesCountByParticipantId = {[id: string]: number}

export const initialChatState: ChatState = {
  chatMessages: [],
  isWebsocketOpen: false,
  currentChatParticipantIds: [],
  unreadMessageCountByParticipantId: {},
  unreadSupervisorMessagesCount: 0,
  availableParticipantIds: []
}
