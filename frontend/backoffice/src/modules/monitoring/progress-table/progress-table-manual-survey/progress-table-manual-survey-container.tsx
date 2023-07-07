import React, {useMemo} from "react"
import {useSelector} from "react-redux"
import {EntityKey} from "shared/components"
import {LocalChatMessage, ParticipantProjectProgress, ProjectModule, Survey} from "shared/models"
import {UnreadMessagesCountByParticipantId} from "shared/redux/state/data/chat-state"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {useCompletionMailWordsCount} from "../../../../graphql/hooks"
import {AppState} from "../../../../redux/state/app-state"
import {ProjectModuleManualSurvey} from "../../../../redux/state/ui/synchron-survey-state"
import {chatMessagesCountGroupedByInvitationId} from "../../../dashboard/utils/chat-messages"
import {surveyPollingRate} from "../../config/config"
import {ManualSynchronousParticipantProgress} from "../../dashboard/hooks/use-monitoring-dashboard"
import {ProgressTableManualSurvey} from "./progress-table-manual-survey"

interface Props {
  readonly activeModuleOfSynchronSurvey: Option<ProjectModuleManualSurvey>
  readonly documentCount: number
  readonly lastProjectModuleOfSurvey: Option<ProjectModule>
  readonly moduleCount: number
  readonly openParticipationPlayerUrl?: string
  readonly placeholderClosedParticipation: JSX.Element
  readonly questionnaireId?: UUID
  readonly questionsCount?: number
  readonly scenarioId?: UUID
  readonly selectedModuleId: Option<UUID>
  readonly survey: Option<Survey>
  readonly surveyId: UUID
  readonly surveyProgress: ParticipantProjectProgress[]
  readonly t: LucaTFunction
  readonly navigateToParticipantDashboard: (id: UUID) => void
  readonly onSelectionChange: (entityIds: EntityKey[]) => void
  readonly onOpenChat: (id: UUID) => void
}

export const ProgressTableManualSurveyContainer: React.FC<Props> = ({
  scenarioId,
  surveyId,
  surveyProgress,
  ...rest
}) => {
  const {completionMailWordsCount} = useCompletionMailWordsCount(scenarioId, surveyId, surveyPollingRate)

  const chatMessages = useSelector<AppState, LocalChatMessage[]>(s => s.chat.chatMessages)

  const messagesCountMappedByInvitationId = useMemo(() => chatMessagesCountGroupedByInvitationId(chatMessages), [
    chatMessages.length
  ])

  const availableParticipantIds = useSelector<AppState, UUID[]>(state => state.chat.availableParticipantIds)
  const unreadMessageCountByParticipantId = useSelector<AppState, UnreadMessagesCountByParticipantId>(
    state => state.chat.unreadMessageCountByParticipantId
  )

  const progressWithOnlineState: ManualSynchronousParticipantProgress[] = surveyProgress.map(progress => ({
    ...progress,
    isOnline: availableParticipantIds.includes(progress.id)
  }))

  return (
    <ProgressTableManualSurvey
      completionMailWordCounts={completionMailWordsCount}
      scenarioId={scenarioId}
      surveyId={surveyId}
      surveyProgress={progressWithOnlineState}
      messagesCountByParticipantId={messagesCountMappedByInvitationId}
      unreadMessagesCountByParticipantId={unreadMessageCountByParticipantId}
      {...rest}
    />
  )
}
