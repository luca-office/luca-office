import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SocketParticipantMessage, SocketSupervisorMessage, SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {ChatState} from "../../../redux/state/data/chat-state"

export const chatSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): ChatState => {
  const chat = state.data.chat

  switch (surveyEvent.eventType) {
    case SurveyEventType.SendSupervisorChatMessage: {
      const data = (surveyEvent.data as unknown) as SocketSupervisorMessage
      return {
        ...chat,
        chatMessages: [
          ...chat.chatMessages,
          {
            message: data.message,
            surveyId: data.surveyId,
            timestamp: surveyEvent.timestamp,
            userAccountId: data.userAccountId,
            recipientInvitationIds: [],
            type: "supervisor"
          }
        ]
      }
    }
    case SurveyEventType.SendParticipantChatMessage: {
      const data = (surveyEvent.data as unknown) as SocketParticipantMessage
      return {
        ...chat,
        chatMessages: [
          ...chat.chatMessages,
          {
            message: data.message,
            surveyId: data.surveyId,
            timestamp: surveyEvent.timestamp,
            invitationId: data.invitationId,
            type: "participant"
          }
        ]
      }
    }
    default:
      return chat
  }
}
