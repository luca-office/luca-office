import {compact, sortBy, sum} from "lodash-es"
import {useDispatch, useSelector} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {AppNotification, ParticipantProjectProgress} from "shared/models"
import {DisplayChatMessage, LocalChatMessage} from "shared/models/chat/chat-message"
import {
  resetUnreadMessageCountByParticipantId,
  updateCurrentChatParticipantIds
} from "shared/redux/actions/data/chat-action"
import {UnreadMessagesCountByParticipantId} from "shared/redux/state/data/chat-state"
import {Route as SharedRoute} from "shared/routes"
import {useLucaTranslation} from "shared/translations"
import {find, Option} from "shared/utils"
import {useSupervisorSendChat} from "../../../../graphql/hooks/mutations/chat/use-supervisor-send-chat"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateChatVisibility, updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {AppState} from "../../../../redux/state/app-state"
import {useMonitoring} from "../../use-monitoring"

export interface UseSupervisorChatHook {
  readonly isChatEnabledForSurvey: boolean
  readonly isChatVisible: boolean
  readonly isChatAccessible: boolean
  readonly chatParticipants: ParticipantProjectProgress[]
  readonly messages: DisplayChatMessage[]
  readonly newParticipantMessages: number
  readonly navigateBackToDashboard: () => void
  readonly setChatParticipantsIds: (ids: UUID[]) => void
  readonly sendSupervisorMessage: (message: string) => void
  readonly openChat: (selectedParticipantId?: UUID) => void
  readonly closeChat: () => void
}

export const useSupervisorChat = (
  surveyId: UUID,
  projectId: UUID,
  allParticipants: ParticipantProjectProgress[]
): UseSupervisorChatHook => {
  const dispatch = useDispatch()
  const {t} = useLucaTranslation()
  const supervisorDefaultName = t("chat__supervisor")

  const chatParticipantsIds = useSelector<AppState, Array<UUID>>(s => s.chat.currentChatParticipantIds)
  const isChatVisible = useSelector<AppState, boolean>(state => state.ui.common.isChatOpen)
  const unreadMessageCountByParticipantId = useSelector<AppState, UnreadMessagesCountByParticipantId>(
    state => state.chat.unreadMessageCountByParticipantId
  )
  const messages = useSelector<AppState, LocalChatMessage[]>(s => s.chat.chatMessages)
  const isChatAccessible = useSelector<AppState, boolean>(state => state.chat.isWebsocketOpen)
  const {sendSupervisorChatMessage: send, sendSupervisorChatMessageLoading: sendInProgress} = useSupervisorSendChat()
  const {isManualExecutionTypeSurvey, isLoading: isMonitoringStatusLoading} = useMonitoring(projectId, surveyId)
  const unreadMessageCount = sum(Object.values(unreadMessageCountByParticipantId))

  const sendSupervisorMessage = (message: string) => {
    send(surveyId, chatParticipantsIds, message).then(() => {
      if (chatParticipantsIds.length > 1) {
        setTimeout(() => {
          dispatch(updateChatVisibility(false))
          dispatch(
            updateNotification(
              Option.of<AppNotification>({
                severity: NotificationSeverity.Success,
                titleKey: "notification__title_successful_chat_message_send",
                messageKey: "notification__message_successful_chat_message_send"
              })
            )
          )
        }, 350)
      }
    })
  }

  const navigateBackToDashboard = () => {
    dispatch(updateChatVisibility(false))
    dispatch(navigateToRouteAction(SharedRoute.SurveyMonitoring, {projectId, surveyId}))
  }

  const allChatMessages = sortBy(
    messages
      .filter(msg => msg.surveyId === surveyId)
      .filter(msg =>
        msg.type === "participant"
          ? chatParticipantsIds.includes(msg.invitationId)
          : msg.recipientInvitationIds.some(recipientInvitationId =>
              chatParticipantsIds.includes(recipientInvitationId)
            )
      )
      .map(msg => ({
        ...msg,
        self: msg.type === "supervisor",
        name:
          msg.type === "supervisor"
            ? supervisorDefaultName
            : find(({id}) => id === msg.invitationId, allParticipants)
                .map(({displayName}) => displayName)
                .getOrElse(msg.invitationId)
      })),
    message => message.timestamp
  )

  const setChatParticipantsIds = (ids: Array<UUID>) => dispatch(updateCurrentChatParticipantIds(ids))

  const onOpen = (selectedParticipantId?: UUID) => {
    dispatch(updateChatVisibility(true))

    compact([...chatParticipantsIds, selectedParticipantId]).forEach(participantId =>
      dispatch(resetUnreadMessageCountByParticipantId(participantId))
    )
  }

  const onClose = () => {
    dispatch(updateChatVisibility(false))
  }

  return {
    isChatEnabledForSurvey: isManualExecutionTypeSurvey,
    isChatAccessible: isChatAccessible && !sendInProgress && !isMonitoringStatusLoading,
    isChatVisible,
    messages: chatParticipantsIds.length > 1 ? [] : allChatMessages,
    sendSupervisorMessage,
    setChatParticipantsIds,
    navigateBackToDashboard,
    chatParticipants: allParticipants.filter(({id}) => chatParticipantsIds.includes(id)),
    openChat: onOpen,
    closeChat: onClose,
    newParticipantMessages: unreadMessageCount
  }
}
