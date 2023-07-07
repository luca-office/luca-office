import {css} from "@emotion/react"
import * as React from "react"
import {ColumnProps, Icon, ProgressBarColumn, Text} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {ParticipantProjectProgress, ProjectModule} from "shared/models"
import {UnreadMessagesCountByParticipantId} from "shared/redux/state/data/chat-state"
import {boxHeightSmaller, errorColor, Flex, onlineColor, spacingSmall, spacingTinier, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {CompletionEmailWordCount} from "../../../models"
import {ProjectModuleManualSurvey} from "../../../redux/state/ui/synchron-survey-state"
import {ManualSynchronousParticipantProgress} from "../../monitoring/dashboard/hooks/use-monitoring-dashboard"
import {ProgressElementColumn} from "../../monitoring/progress-table/progress-element-column/progress-element-column"
import {ProgressStepsColumn} from "../../monitoring/progress-table/progress-steps-column/progress-steps-column"

interface ProgressTableParams {
  readonly documentCount: number
  readonly moduleCount: number
  readonly participantCount: number
  readonly t: LucaTFunction
  readonly questionsCount?: number
  readonly questionnaireId?: UUID
  readonly scenarioId?: UUID
  readonly lastProjectModuleOfSurvey: Option<ProjectModule>
}

interface SynchronousProgressTableParams extends ProgressTableParams {
  readonly currentModule: Option<ProjectModuleManualSurvey>
  readonly completionEmailWordsCount: CompletionEmailWordCount[]
  readonly unreadMessagesCountByParticipantId: UnreadMessagesCountByParticipantId
  readonly messagesCountByParticipantId: Map<UUID, number>
  readonly hasSurveyEnded: boolean
  readonly onOpenChat: (id: UUID) => void
}

export const getProgressTableColumns = ({
  participantCount,
  moduleCount,
  documentCount,
  t,
  questionsCount,
  questionnaireId,
  scenarioId,
  lastProjectModuleOfSurvey
}: ProgressTableParams): ColumnProps<ParticipantProjectProgress>[] => {
  const hideModuleProgress = !!questionnaireId || !!scenarioId
  const moduleProgressColumn: ColumnProps<ParticipantProjectProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_header", {count: moduleCount}),
    content: element => (
      <ProgressStepsColumn
        lastProjectModuleOfSurvey={lastProjectModuleOfSurvey}
        progressElement={element}
        moduleCount={moduleCount}
      />
    ),
    sortConfig: {
      key: "displayName",
      toolTipText: t("dashboard__project_table_progress_tooltip"),
      isSortable: true,
      customSort: element =>
        element.moduleProgress.filter(progress => progress.status === ProjectModuleProgressType.Completed).length
    }
  }
  const questionsProgressColumn: ColumnProps<ParticipantProjectProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_questionnaire_header", {count: questionsCount}),
    content: element => (
      <ProgressBarColumn
        progressCount={
          element.moduleProgress.find(progress => progress.moduleId === questionnaireId)?.questionsCompleted ?? 0
        }
        overallCount={questionsCount || 0}
      />
    ),
    sortConfig: {
      key: "displayName",
      isSortable: true,
      toolTipText: t("dashboard__project_table_progress_questionnaire_tooltip"),
      customSort: element =>
        questionsCount
          ? (element.moduleProgress.find(progress => progress.moduleId === questionnaireId)?.questionsCount ?? 0) /
            questionsCount
          : 0
    }
  }
  const documentProgressColumn: ColumnProps<ParticipantProjectProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_documents_header", {count: documentCount}),
    content: element => (
      <ProgressBarColumn
        progressCount={element.moduleProgress.find(progress => progress.moduleId === scenarioId)?.documentsOpened ?? 0}
        overallCount={element.moduleProgress.find(progress => progress.moduleId === scenarioId)?.documentsCount ?? 0}
      />
    ),
    sortConfig: {
      key: "displayName",
      isSortable: true,
      toolTipText: t("dashboard__project_table_progress_documents_tooltip"),
      customSort: element =>
        documentCount
          ? (element.moduleProgress.find(progress => progress.moduleId === scenarioId)?.documentsOpened ?? 0) /
            documentCount
          : 0
    }
  }

  return [
    {
      key: "displayName",
      header: t("dashboard__project_table_participant_header", {count: participantCount}),
      content: element => element.displayName,
      sortConfig: {
        key: "displayName",
        isSortable: true
      }
    },
    {
      key: "element",
      header: t("dashboard__project_table_element_header"),
      content: element => <ProgressElementColumn progressElement={element} moduleCount={moduleCount} />,
      sortConfig: {
        key: "displayName",
        isSortable: true,
        customSort: element =>
          element.moduleProgress.find(progress => progress.status === ProjectModuleProgressType.InProgress)?.name || "-"
      }
    },
    ...(!hideModuleProgress ? [moduleProgressColumn] : []),
    // do not use hideModuleProgress here as it will be extended in the future and is unrelated to question column
    ...(questionnaireId ? [questionsProgressColumn] : []),
    ...(scenarioId ? [documentProgressColumn] : [])
  ]
}

export const getManualSurveyProgressTableColumns = ({
  participantCount,
  moduleCount,
  documentCount,
  t,
  questionsCount,
  questionnaireId,
  scenarioId,
  currentModule,
  completionEmailWordsCount,
  messagesCountByParticipantId,
  unreadMessagesCountByParticipantId,
  hasSurveyEnded,
  lastProjectModuleOfSurvey,
  onOpenChat
}: SynchronousProgressTableParams): ColumnProps<ManualSynchronousParticipantProgress>[] => {
  const isProjectOverview = questionnaireId === undefined && scenarioId === undefined

  const hasSurveyStarted = currentModule.isDefined()

  const openChat = (id: UUID, event: React.MouseEvent<HTMLDivElement>) => {
    event?.stopPropagation()
    onOpenChat(id)
  }

  const moduleProgressColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_header", {count: moduleCount}),
    customStyles: {flexGrow: 3},
    content: element => (
      <ProgressStepsColumn
        lastProjectModuleOfSurvey={lastProjectModuleOfSurvey}
        hasSurveyEnded={hasSurveyEnded}
        progressElement={element}
        moduleCount={moduleCount}
      />
    ),
    sortConfig: {
      key: "displayName",
      toolTipText: t("dashboard__project_table_progress_tooltip"),
      isSortable: true,
      customSort: element =>
        element.moduleProgress.filter(progress => progress.status === ProjectModuleProgressType.Completed).length
    }
  }

  const activeModuleOfParticipant: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "element",
    header: t("dashboard__project_table_element_header"),
    customStyles: {flexGrow: 2},
    content: element => <ProgressElementColumn progressElement={element} moduleCount={moduleCount} />,
    sortConfig: {
      key: "displayName",
      isSortable: true,
      customSort: element =>
        element.moduleProgress.find(progress => progress.status === ProjectModuleProgressType.InProgress)?.name || "-"
    }
  }

  const questionsProgressColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_questionnaire_header", {count: questionsCount ?? 0}),
    customStyles: {flexGrow: 3},
    content: element => (
      <ProgressBarColumn
        progressCount={
          element.moduleProgress.find(progress => progress.moduleId === questionnaireId)?.questionsCompleted ?? 0
        }
        overallCount={questionsCount ?? 0}
      />
    ),
    sortConfig: {
      key: "displayName",
      isSortable: true,
      toolTipText: t("dashboard__project_table_progress_questionnaire_tooltip"),
      customSort: element =>
        questionsCount
          ? (element.moduleProgress.find(progress => progress.moduleId === questionnaireId)?.questionsCount ?? 0) /
            questionsCount
          : 0
    }
  }
  const documentProgressColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "progress",
    header: t("dashboard__project_table_progress_documents_header", {count: documentCount}),
    customStyles: {flexGrow: 3},
    content: element => (
      <ProgressBarColumn
        progressCount={element.moduleProgress.find(progress => progress.moduleId === scenarioId)?.documentsOpened ?? 0}
        overallCount={documentCount}
      />
    ),
    sortConfig: {
      key: "displayName",
      isSortable: true,
      toolTipText: t("dashboard__project_table_progress_documents_tooltip"),
      customSort: element =>
        documentCount
          ? (element.moduleProgress.find(progress => progress.moduleId === scenarioId)?.documentsOpened ?? 0) /
            documentCount
          : 0
    }
  }

  const statusColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "status",
    header: t("dashboard__attendee_status_header"),
    sortConfig: {
      key: "isOnline",
      isSortable: true
    },
    content: ({isOnline}) => (
      <div css={Flex.row}>
        <div css={styles.onlineRow(isOnline)} />
        <Text customStyles={styles.onlineRowText} size={TextSize.Medium}>
          {t(isOnline ? "dashboard__progress_chart_online" : "dashboard__progress_chart_offline")}
        </Text>
      </div>
    )
  }

  const wordCountOfCompletionMailColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "wordsCount",
    header: t("dashboard__project_table_progress_words_in_mails_title"),
    content: entity => (
      <Text size={TextSize.Medium}>
        {completionEmailWordsCount.find(wordCount => wordCount.invitationId === entity.id)?.wordCount ?? 0}
      </Text>
    )
  }

  const chatColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "chat",
    header: <Icon name={IconName.SpeechBubble} />,
    content: entity => (
      <div onClick={event => openChat(entity.id, event)} css={Flex.row}>
        <Text size={TextSize.Medium}>{messagesCountByParticipantId.get(entity.id) ?? 0}</Text>
        {unreadMessagesCountByParticipantId[entity.id] > 0 && (
          <Text customStyles={styles.unreadMessage} size={TextSize.Medium}>
            {`(${unreadMessagesCountByParticipantId[entity.id]})`}
          </Text>
        )}
      </div>
    )
  }

  const participantNameColumn: ColumnProps<ManualSynchronousParticipantProgress> = {
    key: "displayName",
    header: t("dashboard__project_table_participant_header", {count: participantCount}),
    content: element => element.displayName,
    sortConfig: {
      key: "displayName",
      isSortable: true
    }
  }

  return [
    participantNameColumn,
    chatColumn,
    ...(hasSurveyStarted && !isProjectOverview ? [activeModuleOfParticipant] : []),
    ...(isProjectOverview ? [statusColumn, moduleProgressColumn] : []),
    ...(scenarioId ? [wordCountOfCompletionMailColumn, documentProgressColumn] : []),
    ...(questionnaireId ? [questionsProgressColumn] : [])
  ]
}

const styles = {
  onlineRow: (isOnline: boolean) =>
    css({
      width: boxHeightSmaller,
      height: boxHeightSmaller,
      borderRadius: "100%",
      backgroundColor: isOnline ? onlineColor : errorColor
    }),
  onlineRowText: css({
    marginLeft: spacingSmall
  }),
  unreadMessage: css({
    color: errorColor,
    marginLeft: spacingTinier
  })
}
