import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {LocalChatMessage} from "shared/models"
import {SurveyInvitationState} from "shared/redux/state/data"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export interface ChatState {
  readonly surveyIdOption: Option<UUID>
  readonly openWindows: Array<OfficeWindowType>
  readonly minimizedWindows: Array<OfficeWindowType>
  readonly isChatAccessible: boolean
  readonly messages: LocalChatMessage[]
  readonly isManualAsynchronousSurvey: boolean
}

export const useChatState = (): ChatState => {
  const surveyInvitation = useSelector<AppState, SurveyInvitationState>(
    state => state.playerPreview.player.data.surveyInvitation
  )
  const openWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.minimizedWindows
  )
  const messages = useSelector<AppState, LocalChatMessage[]>(state => state.playerPreview.player.data.chat.chatMessages)

  const isManualAsynchronousSurvey = surveyInvitation.executionType.contains(SurveyExecutionType.ManualAsynchronous)

  return {
    surveyIdOption: surveyInvitation.surveyId,
    openWindows,
    minimizedWindows,
    messages,
    isChatAccessible: false,
    isManualAsynchronousSurvey
  }
}
