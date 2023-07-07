import {noop} from "lodash-es"
import {ChatComposer} from "shared/office-tools/chat/chat-container"
import {useLucaTranslation} from "shared/translations"
import {mapLocalMessagesToSupervisorChat} from "shared/utils"
import {ChatRemoteState} from "./use-chat-remote-state"
import {ChatState} from "./use-chat-state"

export const chatComposer = (
  useChatState: () => ChatState,
  useRemoteState: (surveyId: UUID) => ChatRemoteState
): ChatComposer => {
  const {t} = useLucaTranslation()
  const {
    minimizedWindows,
    openWindows,
    isChatAccessible,
    messages,
    surveyIdOption,
    isManualAsynchronousSurvey
  } = useChatState()
  const surveyId = surveyIdOption.getOrElse("")
  const {surveyInvitations} = useRemoteState(surveyId)

  return {
    messages: mapLocalMessagesToSupervisorChat(messages, t("chat__supervisor"), surveyInvitations),
    sendMessage: noop,
    title: t("chat__scenario_snapshot_title"),
    isChatAccessible,
    minimizedWindows,
    openWindows,
    isManualAsynchronousSurvey
  }
}
