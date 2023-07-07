import {Option, sendChatMessageSurveyEvent} from "shared/utils"

export interface SendParticipantChatProps {
  readonly sendParticipantChatMessage: (message: string) => void
}

export const useParticipantSendChat = (
  surveyId: UUID,
  invitationId: UUID,
  currentScenarioId: Option<UUID>,
  currentQuestionnaireId: Option<UUID>
): SendParticipantChatProps => {
  return {
    sendParticipantChatMessage: (message: string) => {
      sendChatMessageSurveyEvent({
        currentScenarioId: currentScenarioId.orNull(),
        currentQuestionnaireId: currentQuestionnaireId.orNull(),
        surveyId,
        invitationId,
        message
      })
    }
  }
}
