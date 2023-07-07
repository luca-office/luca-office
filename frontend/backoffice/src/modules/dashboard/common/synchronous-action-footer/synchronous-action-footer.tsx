import * as React from "react"
import {Button, Icon, Text, Tooltip} from "shared/components"
import {QuestionnaireChatButton} from "shared/components/questionnaire/module-questionnaire-footer/questionnaire-chat-button"
import {ButtonVariant, IconName} from "shared/enums"
import {Project, ProjectModule} from "shared/models"
import {textEllipsis, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {convertSecondsToMinutes, convertSecondsToTimeString, getProjectModuleTitle, Option} from "shared/utils"
import {ProjectModuleManualSurvey} from "../../../../redux/state/ui/synchron-survey-state"
import {EndSurveyModal} from "../synchronous-next-module-modal/end-survey-modal"
import {StartNextModuleModal} from "../synchronous-next-module-modal/start-next-module-modal"
import {styles} from "./synchronous-action-footer.style"
import {getModuleDurationInMinutes, getSecondaryButtonIcon} from "./utils"

export enum SynchronousActionFooterLocation {
  SurveyDetail = "SurveyDetail",
  SurveyProgress = "SurveyProgress"
}

interface ModuleInfoTextConfig {
  readonly isSurveyActive: boolean
  readonly hasSurveyEnded: boolean
  readonly isAsynchronousSurvey: boolean
  readonly t: LucaTFunction
  readonly currentlyActiveProjectModule: Option<ProjectModuleManualSurvey>
  readonly projectNameAndDurationText: string
}

interface SecondaryButtonConfig {
  hasSurveyStarted: boolean
  hasSurveyEnded: boolean
  hasNextModule: boolean
  isAsyncSurvey: boolean
}

export interface SynchronousActionFooter {
  readonly actionsLoading: boolean
  readonly assignedProject: Option<Project>
  readonly chatParticipantsIds?: UUID[]
  readonly completedCount: number
  readonly currentlyActiveProjectModule: Option<ProjectModuleManualSurvey>
  readonly endSurvey: (surveyId: UUID) => void
  readonly invitationsCount: number
  readonly isAsynchronousSurvey: boolean
  readonly hasSurveyStarted: boolean
  readonly hasSurveyEnded: boolean
  readonly isEndSurveyModalVisible: boolean
  readonly isStartNextModuleModalVisible: boolean
  readonly location: SynchronousActionFooterLocation
  readonly navigateToProjectProgress: () => void
  readonly navigateToScoring: () => void
  readonly nextProjectModuleToBeStarted: Option<ProjectModule>
  readonly onClickChatButton?: () => void
  readonly onStartNextModuleConfirm: () => void
  readonly remainingTimeOfProjectModuleInSeconds: number | null
  readonly setIsEndSurveyModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setIsStartNextModuleModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly startSurvey: (surveyId: UUID) => void
  readonly surveyId: UUID
  readonly unreadParticipantMessages: number
}

export const SynchronousActionFooter: React.FunctionComponent<SynchronousActionFooter> = ({
  actionsLoading,
  assignedProject,
  completedCount,
  currentlyActiveProjectModule,
  invitationsCount,
  isStartNextModuleModalVisible,
  isEndSurveyModalVisible,
  isAsynchronousSurvey,
  hasSurveyStarted,
  hasSurveyEnded,
  location,
  nextProjectModuleToBeStarted,
  surveyId,
  navigateToProjectProgress,
  navigateToScoring,
  onStartNextModuleConfirm,
  remainingTimeOfProjectModuleInSeconds,
  startSurvey,
  setIsStartNextModuleModalVisible,
  setIsEndSurveyModalVisible,
  chatParticipantsIds = [],
  onClickChatButton,
  endSurvey,
  unreadParticipantMessages
}) => {
  const {t} = useLucaTranslation()

  const hasNextModule = nextProjectModuleToBeStarted.isDefined()
  const isInSurveyDetail = location === SynchronousActionFooterLocation.SurveyDetail
  const isSurveyActive = (hasSurveyStarted || currentlyActiveProjectModule.isDefined()) && !hasSurveyEnded
  const areParticipantsForChatSelected = chatParticipantsIds.length > 0
  const project = assignedProject.orUndefined()
  const isChatAvailable = !hasSurveyEnded

  const isScenarioMaxDurationExceeded =
    remainingTimeOfProjectModuleInSeconds !== null && remainingTimeOfProjectModuleInSeconds < 0

  const handleManualSynchronFooterButtonClick = () => {
    if (isSurveyActive) {
      if (hasNextModule && !isAsynchronousSurvey) {
        setIsStartNextModuleModalVisible(true)
      } else {
        setIsEndSurveyModalVisible(true)
      }
    } else if (hasSurveyEnded) {
      navigateToScoring()
    } else {
      startSurvey(surveyId)
    }
  }

  const projectNameAndDurationText = t("project__name_and_duration", {
    name: project?.name,
    duration: convertSecondsToMinutes(project?.maxDurationInSeconds ?? 0),
    unit: t("unit__minutes_short")
  })

  const placeholderTimeLoading = t("project__remaining_time_placeholder")

  const manualSynchronousFooter = (
    <>
      <div css={styles.footerEntry}>
        <Icon customStyles={styles.icon} name={IconName.Clock} />
        <Text size={TextSize.Medium}>
          {!isSurveyActive
            ? t(isAsynchronousSurvey ? "dashboard__footer_manual_asynchron" : "dashboard__footer_manual_synchron")
            : remainingTimeOfProjectModuleInSeconds !== null
            ? t(isScenarioMaxDurationExceeded ? "project__additional_time" : "project__remaining_time", {
                time: convertSecondsToTimeString(Math.abs(remainingTimeOfProjectModuleInSeconds))
              })
            : placeholderTimeLoading}
        </Text>
      </div>

      <div css={styles.footerEntry}>
        <Icon customStyles={styles.icon} name={IconName.Student} />
        <Text size={TextSize.Medium}>
          {!hasSurveyStarted
            ? t("dashboard__footer_invited", {invitationsCount})
            : t("projects__surveys_details_dashboard_participants_completed", {
                completed: completedCount,
                invited: invitationsCount
              })}
        </Text>
      </div>

      <div css={styles.footerEntry}>
        <div css={styles.footerEntryRow}>
          {!hasSurveyEnded && (
            <Icon customStyles={styles.icon} name={hasSurveyStarted ? IconName.Play : IconName.Sandglass} />
          )}
          <Text customStyles={textEllipsis} size={TextSize.Medium}>
            {getModuleInfoText({
              currentlyActiveProjectModule,
              isSurveyActive,
              isAsynchronousSurvey,
              hasSurveyEnded,
              projectNameAndDurationText,
              t
            })}
          </Text>
        </div>

        {isInSurveyDetail ? (
          <Button
            customStyles={styles.secondaryButton}
            onClick={hasSurveyEnded ? navigateToScoring : navigateToProjectProgress}
            variant={ButtonVariant.Secondary}>
            {t(hasSurveyEnded ? "dashboard__footer_navigate_scoring" : "dashboard__footer_navigate_dashboard")}
          </Button>
        ) : (
          <Button
            customStyles={styles.secondaryButton}
            isLoading={actionsLoading}
            disabled={invitationsCount === 0}
            onClick={handleManualSynchronFooterButtonClick}
            icon={getSecondaryButtonIcon(
              currentlyActiveProjectModule.isDefined(),
              hasSurveyEnded,
              hasNextModule,
              isAsynchronousSurvey
            )}>
            {t(
              getSecondaryButtonText({
                hasSurveyStarted,
                hasSurveyEnded,
                hasNextModule,
                isAsyncSurvey: isAsynchronousSurvey
              })
            )}
          </Button>
        )}
      </div>
      {isChatAvailable && onClickChatButton && (
        <Tooltip
          title={t(
            areParticipantsForChatSelected
              ? "dashboard__footer_manual_synchron_chat_footer_tooltip"
              : "dashboard__footer_manual_synchron_chat_footer_tooltip_disabled",
            {
              count: chatParticipantsIds.length
            }
          )}>
          <QuestionnaireChatButton
            newMessagesCount={unreadParticipantMessages}
            isDisabled={!areParticipantsForChatSelected}
            onClick={onClickChatButton}
          />
        </Tooltip>
      )}
    </>
  )
  return (
    <>
      <div className="survey-dashboard-footer" css={styles.container}>
        {manualSynchronousFooter}
      </div>
      {isStartNextModuleModalVisible && (
        <StartNextModuleModal
          onDismiss={() => setIsStartNextModuleModalVisible(false)}
          onConfirm={onStartNextModuleConfirm}
        />
      )}
      {isEndSurveyModalVisible && (
        <EndSurveyModal
          onDismiss={() => setIsEndSurveyModalVisible(false)}
          onConfirm={() => {
            setIsEndSurveyModalVisible(false)
            endSurvey(surveyId)
          }}
        />
      )}
    </>
  )
}

const getModuleTitleAndDuration = (module: ProjectModule, t: LucaTFunction) => {
  const moduleTitle = getProjectModuleTitle(module)
  const moduleDuration = getModuleDurationInMinutes(module)
  const moduleDurationString = moduleDuration !== null ? `(${moduleDuration} ${t("unit__minutes_short")})` : ""

  return `${moduleTitle} ${moduleDurationString}`
}

const getSecondaryButtonText = ({
  isAsyncSurvey,
  hasNextModule,
  hasSurveyEnded,
  hasSurveyStarted
}: SecondaryButtonConfig) => {
  if (hasSurveyStarted && !hasSurveyEnded) {
    return hasNextModule && !isAsyncSurvey
      ? "dashboard__footer_manual_synchron_start_next_module"
      : "dashboard__footer_manual_synchron_stop_project"
  } else if (hasSurveyEnded) {
    return "dashboard__footer_navigate_scoring"
  } else {
    return "dashboard__footer_manual_synchron_start_project"
  }
}

const getModuleInfoText = ({
  hasSurveyEnded,
  isAsynchronousSurvey,
  isSurveyActive,
  t,
  currentlyActiveProjectModule,
  projectNameAndDurationText
}: ModuleInfoTextConfig) => {
  if (isSurveyActive) {
    return isAsynchronousSurvey
      ? t("rater_rating_details__survey_in_progress")
      : currentlyActiveProjectModule
          .map(module => getModuleTitleAndDuration(module, t))
          .getOrElse(t("dashboard__project_table_progress_module_is_starting"))
  } else if (hasSurveyEnded) {
    return t("rater_rating_details__survey_finished")
  } else {
    return projectNameAndDurationText
  }
}
