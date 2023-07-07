import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {LocalChatMessage, OfficeModule, ParticipantData} from "shared/models"
import {Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"
import {useGetSurveyInvitationFromRedux} from "./../../../hooks/use-get-survey-invitation"
import {useTopmostWindow} from "./../../../hooks/use-topmost-window"

export interface ChatState {
  readonly openWindows: Array<OfficeWindowType>
  readonly minimizedWindows: Array<OfficeWindowType>
  readonly isChatAccessible: boolean
  readonly messages: LocalChatMessage[]
  readonly isChatOpened: boolean
  readonly unreadMessageCount: number
  readonly isSocketOpen: boolean
  readonly isManualAsynchronousSurvey: boolean
  readonly participantDataOption: Option<ParticipantData>
  readonly projectIdOption: Option<UUID>
  readonly surveyIdOption: Option<UUID>
  readonly invitationIdOption: Option<UUID>
  readonly topmostWindow: OfficeWindowType
  readonly scenarioIdOption: Option<UUID>
}

export const useChatState = (): ChatState => {
  const {surveyIdOption, invitationIdOption, executionTypeOption} = useGetSurveyInvitationFromRedux()
  const topmostWindow = useTopmostWindow()
  const openWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.openWindows)
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.minimizedWindows)
  const isChatAccessible = useSelector<AppState, boolean>(s => s.data.chat.isWebsocketOpen)
  const messages = useSelector<AppState, LocalChatMessage[]>(s => s.data.chat.chatMessages)
  const participantDataOption = useSelector<AppState, Option<ParticipantData>>(s => s.data.common.participantData)
  const isSocketOpen = useSelector<AppState, boolean>(s => s.data.chat.isWebsocketOpen)
  const isChatOpened = useSelector<AppState, boolean>(s => s.ui.windowManager.isChatVisible)
  const unreadMessageCount = useSelector<AppState, number>(s => s.data.chat.unreadSupervisorMessagesCount)
  const activeModule = useSelector<AppState, Option<OfficeModule>>(s => s.ui.common.activeModule)
  const isManualAsynchronousSurvey = executionTypeOption.contains(SurveyExecutionType.ManualAsynchronous)

  return {
    openWindows,
    minimizedWindows,
    isChatAccessible,
    isChatOpened,
    unreadMessageCount,
    isSocketOpen,
    participantDataOption,
    projectIdOption: activeModule.map(({projectId}) => projectId),
    surveyIdOption: surveyIdOption,
    invitationIdOption: invitationIdOption,
    messages,
    topmostWindow,
    scenarioIdOption: activeModule.flatMap(({scenarioId}) => Option.of(scenarioId)),
    isManualAsynchronousSurvey
  }
}
