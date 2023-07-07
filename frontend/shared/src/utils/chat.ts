import {LocalChatMessage, SurveyInvitationLight} from "../models"
import {find, getParticipantNameOrToken} from "."
import {sortByTimestampDate} from "./array"

export const mapLocalMessagesToSupervisorChat = (
  messages: LocalChatMessage[],
  supervisorName: string,
  surveyInvitations: SurveyInvitationLight[]
) =>
  sortByTimestampDate(
    messages.map(msg => ({
      ...msg,
      self: msg.type === "supervisor",
      name:
        msg.type === "supervisor"
          ? supervisorName
          : find(({id}) => id === msg.invitationId, surveyInvitations)
              .map(({participantData, token}) => getParticipantNameOrToken(participantData, token))
              .getOrElse(msg.invitationId)
    }))
  )
