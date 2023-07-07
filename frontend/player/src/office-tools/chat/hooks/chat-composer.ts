import {useEffect} from "react"
import {OfficeTool} from "shared/enums"
import {ChatComposer} from "shared/office-tools/chat/chat-container"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {sortByTimestampDate} from "shared/utils/array"
import {useParticipantChat} from "../../../hooks/use-participant-chat"
import {ChatState, ChatStateActions} from "./"

export const chatComposer = (
  useChatState: () => ChatState,
  useChatStateActions: () => ChatStateActions
): ChatComposer => {
  const {t} = useLucaTranslation()
  const unknownChatParticipant = t("chat__unknown_title")
  const supervisorName = t("chat__supervisor")
  const {
    minimizedWindows,
    openWindows,
    surveyIdOption,
    isSocketOpen,
    participantDataOption,
    invitationIdOption,
    messages,
    topmostWindow,
    scenarioIdOption,
    isManualAsynchronousSurvey
  } = useChatState()
  const {addParticipantChatMessage, resetUnreadMessageCount} = useChatStateActions()

  const surveyId = surveyIdOption.getOrElse("")
  const invitationId = invitationIdOption.getOrElse("")

  const {isChatAccessible, sendParticipantMessage} = useParticipantChat(
    surveyId,
    invitationId,
    isSocketOpen,
    scenarioIdOption,
    Option.none(),
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

  useEffect(() => {
    if (topmostWindow === OfficeTool.Chat) {
      resetUnreadMessageCount()
    }
  }, [topmostWindow])

  return {
    messages: allChatMessages,
    title: participantName,
    sendMessage: sendParticipantMessage,
    isChatAccessible,
    minimizedWindows,
    openWindows,
    isTopmostWindow: topmostWindow === OfficeTool.Chat,
    isManualAsynchronousSurvey
  }
}
