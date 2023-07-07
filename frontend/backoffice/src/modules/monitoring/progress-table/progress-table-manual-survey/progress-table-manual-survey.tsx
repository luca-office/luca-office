import {css} from "@emotion/react"
import React from "react"
import {EntityKey, TableContainer} from "shared/components"
import {useLucaClipboard} from "shared/hooks"
import {ProjectModule, Survey} from "shared/models"
import {UnreadMessagesCountByParticipantId} from "shared/redux/state/data/chat-state"
import {Flex, flex1, spacingLarge, spacingMedium, spacingSmall, textEllipsis} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {isDefined, Option} from "shared/utils"
import {CompletionEmailWordCount} from "../../../../models"
import {ProjectModuleManualSurvey} from "../../../../redux/state/ui/synchron-survey-state"
import {getManualSurveyProgressTableColumns} from "../../../dashboard/config/progress-table"
import {ManualSynchronousParticipantProgress} from "../../dashboard/hooks/use-monitoring-dashboard"
import {OpenParticipationPlaceholder} from "../open-participation-placeholder/open-participation-placeholder"

interface Props {
  readonly activeModuleOfSynchronSurvey: Option<ProjectModuleManualSurvey>
  readonly completionMailWordCounts: CompletionEmailWordCount[]
  readonly documentCount: number
  readonly lastProjectModuleOfSurvey: Option<ProjectModule>
  readonly messagesCountByParticipantId: Map<UUID, number>
  readonly unreadMessagesCountByParticipantId: UnreadMessagesCountByParticipantId
  readonly moduleCount: number
  readonly openParticipationPlayerUrl?: string
  readonly placeholderClosedParticipation: JSX.Element
  readonly questionnaireId?: UUID
  readonly questionsCount?: number
  readonly scenarioId?: UUID
  readonly selectedModuleId: Option<UUID>
  readonly survey: Option<Survey>
  readonly surveyId: UUID
  readonly surveyProgress: ManualSynchronousParticipantProgress[]
  readonly t: LucaTFunction
  readonly navigateToParticipantDashboard: (id: UUID) => void
  readonly onSelectionChange: (entityIds: EntityKey[]) => void
  readonly onOpenChat: (id: UUID) => void
}

export const ProgressTableManualSurvey: React.FC<Props> = ({
  activeModuleOfSynchronSurvey,
  completionMailWordCounts,
  documentCount,
  lastProjectModuleOfSurvey,
  unreadMessagesCountByParticipantId,
  messagesCountByParticipantId,
  moduleCount,
  navigateToParticipantDashboard,
  onSelectionChange,
  openParticipationPlayerUrl,
  placeholderClosedParticipation,
  questionnaireId,
  questionsCount,
  scenarioId,
  selectedModuleId,
  survey,
  surveyProgress,
  onOpenChat,
  t
}) => {
  const {copy} = useLucaClipboard()

  const isChatAvailable = !survey.exists(survey => isDefined(survey.manualPeriod?.end))
  const isOpenParticipationEnabled = survey.exists(survey => survey.isOpenParticipationEnabled)
  const hasSurveyEnded = survey.exists(s => isDefined(s.manualPeriod?.end))

  const placeholder = isOpenParticipationEnabled ? (
    <OpenParticipationPlaceholder copy={copy} openParticipationPlayerUrl={openParticipationPlayerUrl} />
  ) : (
    placeholderClosedParticipation
  )

  return (
    <TableContainer<ManualSynchronousParticipantProgress>
      entityKey={progress => progress.id}
      entities={surveyProgress}
      {...{
        ...(isChatAvailable
          ? {
              isSelectionEnabled: true,
              selectionStyle: "check",
              onSelectionChange: onSelectionChange
            }
          : {isSelectionEnabled: false})
      }}
      onClick={entity => navigateToParticipantDashboard(entity.id)}
      columns={getManualSurveyProgressTableColumns({
        participantCount: surveyProgress.length,
        completionEmailWordsCount: completionMailWordCounts,
        moduleCount,
        t,
        questionsCount,
        documentCount,
        questionnaireId,
        scenarioId,
        unreadMessagesCountByParticipantId,
        messagesCountByParticipantId,
        lastProjectModuleOfSurvey,
        currentModule: activeModuleOfSynchronSurvey,
        hasSurveyEnded,
        onOpenChat
      })}
      customStyles={{flex: flex1}}
      customEntityWrapperStyles={Flex.column}
      customPlaceholder={placeholder}
      customPlaceholderStyles={styles.placeholder}
    />
  )
}

const styles = {
  actionFieldIcon: css({
    marginRight: spacingSmall
  }),
  actionFieldInvitation: css({
    minWidth: 0,
    "> span": css(textEllipsis)
  }),
  placeholder: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
    paddingTop: spacingMedium,
    paddingBottom: spacingMedium
  }),
  participationWrapper: css({
    minWidth: 0,
    marginBottom: spacingLarge,
    marginTop: spacingSmall,
    "div.content": {
      minWidth: 0
    }
  })
}
