import {useDispatch} from "react-redux"
import {addParticipantChatAction, resetUnreadMessageCountFromSupervisor} from "shared/redux/actions/data/chat-action"
import {setChatWindowVisibility} from "shared/redux/actions/ui/window-manager-action"

export interface ChatStateActions {
  readonly openChat: () => void
  readonly resetUnreadMessageCount: () => void
  readonly addParticipantChatMessage: (message: string, invitationId: UUID, surveyId: UUID) => void
}

export const useChatStateActions = (): ChatStateActions => {
  const dispatch = useDispatch()

  const openChat = () => {
    dispatch(resetUnreadMessageCountFromSupervisor())
    dispatch(setChatWindowVisibility(true))
  }

  const addParticipantChatMessage = (message: string, invitationId: UUID, surveyId: UUID) => {
    dispatch(
      addParticipantChatAction({
        message,
        invitationId,
        surveyId
      })
    )
  }

  const resetUnreadSupervisorMessageCount = () => dispatch(resetUnreadMessageCountFromSupervisor())

  return {
    openChat,
    addParticipantChatMessage,
    resetUnreadMessageCount: resetUnreadSupervisorMessageCount
  }
}
