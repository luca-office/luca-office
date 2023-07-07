import {useDispatch} from "react-redux"
import {DisplayChatMessage} from "shared/models"
import {setChatWindowVisibility} from "shared/redux/actions/ui/window-manager-action"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {sortByTimestampDate} from "shared/utils/array"
import {useParticipantChat} from "../../../hooks/use-participant-chat"
import {useChatState, useChatStateActions} from "../../../office-tools/chat/hooks"

export interface UseChat {
  readonly supervisorName: string
  readonly isChatAccessible: boolean
  readonly isChatVisible: boolean
  readonly unreadMessageCount: number
  readonly messages: DisplayChatMessage[]
  readonly sendParticipantMessage: (message: string) => void
  readonly openChat: () => void
  readonly closeChat: () => void
}

export const useChat = (currentQuestionnaireId: Option<UUID>): UseChat => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()
  const unknownChatParticipant = t("chat__unknown_title")
  const supervisorName = t("chat__supervisor")

  const {
    surveyIdOption,
    isChatOpened,
    isSocketOpen,
    unreadMessageCount,
    participantDataOption,
    invitationIdOption,
    messages
  } = useChatState()

  const {addParticipantChatMessage, openChat} = useChatStateActions()
  const surveyId = surveyIdOption.getOrElse("")
  const invitationId = invitationIdOption.getOrElse("")
  const {sendParticipantMessage, isChatAccessible} = useParticipantChat(
    surveyId,
    invitationId,
    isSocketOpen,
    Option.none(),
    currentQuestionnaireId,
    msg => addParticipantChatMessage(msg, invitationId, surveyId)
  )

  const participantName = participantDataOption
    .map(data => `${data.firstName} ${data.lastName}`)
    .getOrElse(unknownChatParticipant)

  const allChatMessages = sortByTimestampDate(
    messages.map(msg => ({
      ...msg,
      self: msg.type === "participant",
      name: msg.type === "supervisor" ? supervisorName : participantName
    }))
  )

  return {
    isChatVisible: isChatOpened,
    messages: allChatMessages,
    supervisorName,
    openChat,
    unreadMessageCount,
    sendParticipantMessage,
    isChatAccessible,
    closeChat: () => dispatch(setChatWindowVisibility(false))
  }
}
