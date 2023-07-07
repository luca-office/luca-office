import {isEmpty} from "lodash-es"
import {Option} from "shared/utils"
import {useParticipantSendChat} from "../graphql/hooks/mutations/chat/use-participant-send-chat"

export interface UseParticipantChatHook {
  readonly isChatAccessible: boolean
  readonly sendParticipantMessage: (message: string) => void
}

export const useParticipantChat = (
  surveyId: UUID,
  invitationId: UUID,
  isSocketOpen: boolean,
  currentScenarioIdOption: Option<UUID>,
  currentQuestionnaireIdOption: Option<UUID>,
  onMessageSent?: (msg: string) => void
): UseParticipantChatHook => {
  const hasValidIds = !isEmpty(invitationId) && !isEmpty(surveyId)

  const {sendParticipantChatMessage: send} = useParticipantSendChat(
    surveyId,
    invitationId,
    currentScenarioIdOption,
    currentQuestionnaireIdOption
  )

  const sendParticipantMessage = (message: string) => {
    if (!hasValidIds) {
      return
    }

    send(message)
    onMessageSent?.(message)
  }

  return {
    isChatAccessible: hasValidIds && isSocketOpen,
    sendParticipantMessage
  }
}
