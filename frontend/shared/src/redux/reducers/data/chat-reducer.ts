import {difference, uniqWith} from "lodash-es"
import {Reducer} from "redux"
import {
  LocalParticipantMessage,
  LocalSupervisorMessage,
  RemoteParticipantMessage,
  RemoteSupervisorMessage
} from "../../../models"
import {parseDateString, sortByTimestampDate} from "../../../utils"
import {SharedAppAction} from "../../actions/app-action"
import {ChatActionType} from "../../actions/data/chat-action"
import {ChatState, initialChatState} from "../../state/data/chat-state"

export const chatReducer: Reducer<ChatState, SharedAppAction> = (state = initialChatState, action) => {
  switch (action.type) {
    case ChatActionType.PopulateWithRemoteMessages: {
      const remoteParticipantMsgs = action.chatMessages.filter(
        ({__typename}) => __typename === "ParticipantChatMessage"
      ) as RemoteParticipantMessage[]

      const remoteSupervisorMsgs = action.chatMessages.filter(
        ({__typename}) => __typename === "SupervisorChatMessage"
      ) as RemoteSupervisorMessage[]

      const uniqueRemoteSupervisorMsgs = uniqWith(
        remoteSupervisorMsgs,
        (a, b) => a.userAccountId === b.userAccountId && a.timestamp === b.timestamp
      )

      const diffRemoteSupervisorMsgs = difference(remoteSupervisorMsgs, uniqueRemoteSupervisorMsgs)
      const localSupervisorMsgs = uniqueRemoteSupervisorMsgs.map(remoteMsg => {
        const otherInvitationIds = diffRemoteSupervisorMsgs.filter(
          diffRemoteMsg =>
            diffRemoteMsg.userAccountId === remoteMsg.userAccountId && diffRemoteMsg.timestamp === remoteMsg.timestamp
        )
        return {
          type: "supervisor",
          message: remoteMsg.message,
          surveyId: action.surveyId,
          timestamp: parseDateString(remoteMsg.timestamp),
          userAccountId: remoteMsg.userAccountId,
          recipientInvitationIds: [
            remoteMsg.recipientInvitationId,
            ...otherInvitationIds.map(({recipientInvitationId}) => recipientInvitationId)
          ]
        } as LocalSupervisorMessage
      })

      const localParticipantMsgs = remoteParticipantMsgs.map(
        msg =>
          ({
            type: "participant",
            message: msg.message,
            surveyId: action.surveyId,
            timestamp: parseDateString(msg.timestamp),
            invitationId: msg.invitationId
          } as LocalParticipantMessage)
      )

      return {
        ...state,
        chatMessages: sortByTimestampDate([...localSupervisorMsgs, ...localParticipantMsgs])
      }
    }
    case ChatActionType.AddSupervisorChat:
      return {
        ...state,
        chatMessages: [
          ...state.chatMessages,
          {...action.supervisorChatMessage, timestamp: new Date(), type: "supervisor"}
        ]
      }
    case ChatActionType.AddParticipantChat:
      return {
        ...state,
        chatMessages: [
          ...state.chatMessages,
          {...action.participantChatMessage, timestamp: new Date(), type: "participant"}
        ]
      }
    case ChatActionType.AddUnreadMessageFromParticipant:
      return {
        ...state,
        unreadMessageCountByParticipantId: {
          ...state.unreadMessageCountByParticipantId,
          [action.participantId]: (state.unreadMessageCountByParticipantId[action.participantId] ?? 0) + 1
        }
      }
    case ChatActionType.AddUnreadMessageFromSupervisorAction:
      return {
        ...state,
        unreadSupervisorMessagesCount: state.unreadSupervisorMessagesCount + 1
      }

    case ChatActionType.ResetUnreadMessagesCountFromSupervisor:
      return {
        ...state,
        unreadSupervisorMessagesCount: 0
      }
    case ChatActionType.ResetUnreadMessagesCountByParticipantId:
      return {
        ...state,
        unreadMessageCountByParticipantId: {
          ...state.unreadMessageCountByParticipantId,
          [action.participantId]: 0
        }
      }
    case ChatActionType.UpdateIsChatAccessible:
      return {
        ...state,
        isWebsocketOpen: action.isAccessible
      }
    case ChatActionType.UpdateAvailableParticipants:
      return {
        ...state,
        availableParticipantIds: action.availableParticipants.map(message => message.invitationIds).getOrElse([])
      }
    case ChatActionType.ResetChat:
      return initialChatState
    case ChatActionType.UpdateCurrentChatParticipantIds:
      return {...state, currentChatParticipantIds: action.chatParticipantIds}
    default:
      return state
  }
}
