import {css} from "@emotion/react"
import * as React from "react"
import {
  Button,
  ColumnProps,
  deleteEntityButtonStyles,
  Icon,
  OrlyButtonContainer,
  Text,
  Tooltip
} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModule, Survey} from "shared/models"
import {Flex, fontColor, TextSize, zIndex2} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {getProjectModuleIcon, getProjectModuleTranslationKey} from "shared/utils"
import {CardDurationInfo, EditingStatusIndicator} from "../../../components"
import {SurveyTiming} from "../../../enums"
import {getSurveyListIcon, getSurveyTimingLabel, getSurveyTimingStatus, isSurveyDeletable} from "../../../utils"

export interface GetProjectModuleColumnsParams {
  readonly deleteModule: (id: UUID) => void
  readonly moduleActionsDisabled: boolean
  readonly openCreation: () => void
  readonly openSorting: () => void
  readonly sortingDisabled: boolean
  readonly t: LucaTFunction
}

export const getProjectModuleColumns = (params: GetProjectModuleColumnsParams): ColumnProps<ProjectModule>[] => {
  const {moduleActionsDisabled, openCreation, deleteModule, t, sortingDisabled, openSorting} = params
  return [
    {
      header: t("title"),
      content: (entity: ProjectModule) => (
        <span>
          {entity.moduleType === ProjectModuleType.Scenario ? entity.scenario?.name : entity.questionnaire?.title}
        </span>
      ),
      key: "name"
    },
    {
      header: t("type"),
      content: (entity: ProjectModule) => (
        <div css={Flex.row}>
          <Icon name={getProjectModuleIcon(entity.moduleType)} hasSpacing={true} />
          {t(getProjectModuleTranslationKey(entity.moduleType))}
        </div>
      ),
      key: "type"
    },
    {
      header: t("projects__detail_time_label"),
      content: (entity: ProjectModule) => {
        const maxDurationInSeconds =
          entity.scenarioId !== null
            ? entity.scenario?.maxDurationInSeconds
            : entity.questionnaire?.maxDurationInSeconds
        return maxDurationInSeconds !== null ? (
          <CardDurationInfo maxDurationInSeconds={maxDurationInSeconds} showIconBeforeText={true} t={t} />
        ) : (
          <CardDurationInfo showIconBeforeText={true} placeholder={"(60 min)"} t={t} />
        )
      },
      key: "maxDurationInSeconds",
      customStyles: styles.timing
    },
    {
      header: t("projects__detail_status_label"),
      content: (entity: ProjectModule) => {
        if (entity.moduleType === ProjectModuleType.Scenario && entity.scenario) {
          return (
            <EditingStatusIndicator
              t={t}
              isFinalized={!!entity.scenario.finalizedAt}
              isPublished={!!entity.scenario.publishedAt}
              iconWithText={true}
            />
          )
        } else if (entity.moduleType === ProjectModuleType.Questionnaire && entity.questionnaire) {
          return (
            <EditingStatusIndicator
              t={t}
              isFinalized={!!entity.questionnaire.finalizedAt}
              isPublished={!!entity.questionnaire.publishedAt}
              iconWithText={true}
            />
          )
        }

        return null
      },
      key: "status"
    },
    {
      header: (
        <React.Fragment>
          <Tooltip
            title={t(
              sortingDisabled ? "projects__scenarios_actions_disabled_tooltip" : "projects__modules_sort_title"
            )}>
            <Button
              variant={ButtonVariant.IconOnly}
              icon={IconName.Sort}
              disabled={sortingDisabled}
              onClick={openSorting}
            />
          </Tooltip>
          <Tooltip
            title={t(
              moduleActionsDisabled ? "projects__scenarios_actions_disabled_tooltip" : "projects__scenarios_add"
            )}>
            <Button
              variant={ButtonVariant.IconOnly}
              icon={IconName.Add}
              disabled={moduleActionsDisabled}
              onClick={openCreation}
            />
          </Tooltip>
        </React.Fragment>
      ),
      content: (entity: ProjectModule) => (
        <OrlyButtonContainer
          onConfirm={() => deleteModule(entity.id)}
          customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
          iconColor={fontColor}
          disabled={moduleActionsDisabled}
          tooltipConfig={{labelKey: !moduleActionsDisabled ? "projects__modules_delete" : undefined}}
        />
      ),
      key: "action",
      customHeaderStyles: styles.actionButton,
      customStyles: css(styles.actionButton, styles.rightAlign)
    }
  ]
}

export interface GetSurveyColumnsParams {
  t: LucaTFunction
  surveyCreationDisabled: boolean
  openCreation: () => void
  deleteSurvey: (id: UUID) => void
  isTestSurvey: boolean
}

export const getSurveyColumns = (params: GetSurveyColumnsParams): ColumnProps<Survey>[] => {
  const {t, openCreation, deleteSurvey, surveyCreationDisabled, isTestSurvey} = params
  return [
    {
      header: t("projects__surveys_table_title"),
      content: (entity: Survey) => entity.title,
      key: "title"
    },
    {
      header: t("projects__surveys_table_condition"),
      content: entity =>
        t(
          entity.isOpenParticipationEnabled
            ? "projects__survey_overlay_open_participation"
            : "projects__survey_overlay_closed_participation"
        ),
      key: "condition"
    },
    {
      header: t("projects__surveys_table_participants"),
      content: (entity: Survey) => (
        <Tooltip
          title={t("projects__surveys_table_participants_column_tooltip", {
            invites: entity.invitationsCount,
            participants: entity.completedParticipationsCount
          })}>
          <Text size={TextSize.Medium}>
            {t("projects__surveys_table_participants_column", {
              invites: entity.invitationsCount,
              participants: entity.completedParticipationsCount
            })}
          </Text>
        </Tooltip>
      ),

      key: "participants"
    },
    {
      header: t("projects__surveys_table_status"),
      content: (entity: Survey) => {
        return (
          <Text
            customStyles={[
              Flex.row,
              getSurveyTimingStatus(entity.startsAt, entity.endsAt) == SurveyTiming.Future && styles.fadedProgress
            ]}
            size={TextSize.Medium}>
            <Icon name={getSurveyListIcon(entity.startsAt, entity.endsAt, entity.isCompleted)} hasSpacing={true} />
            {getSurveyTimingLabel(t, entity)}
          </Text>
        )
      },
      key: "status"
    },
    {
      header: (
        <Tooltip
          title={t(isTestSurvey ? "projects__surveys_add_test_survey" : "projects__surveys_add")}
          inactive={surveyCreationDisabled}>
          <Button
            variant={ButtonVariant.IconOnly}
            icon={IconName.Add}
            disabled={surveyCreationDisabled}
            onClick={openCreation}
          />
        </Tooltip>
      ),
      content: (entity: Survey) => {
        const disabled =
          entity.isCompleted ||
          !!entity.inProgressParticipationsCount ||
          getSurveyTimingStatus(entity.startsAt, entity.endsAt) !== SurveyTiming.Future
        return (
          <OrlyButtonContainer
            onConfirm={() => deleteSurvey(entity.id)}
            customButtonStyles={deleteEntityButtonStyles.iconOnlyButton}
            iconColor={fontColor}
            stopEventPropagation={true}
            disabled={!isSurveyDeletable(entity)}
            tooltipConfig={{labelKey: !disabled ? "projects__surveys_delete" : undefined}}
          />
        )
      },
      key: "action",
      customStyles: styles.deleteButton
    }
  ]
}

export const getIdKeyProjectTable = (entity: ProjectModule | Survey) => entity.id

const styles = {
  deleteButton: css({
    position: "relative",
    zIndex: zIndex2,
    flex: "0 0 32px",
    padding: 0
  }),
  actionButton: css(Flex.row, {
    flex: "0 0 72px",
    justifyContent: "space-between",
    padding: 0
  }),
  fadedProgress: css({
    opacity: 0.5
  }),
  timing: css({
    flex: "0 0 200px"
  }),
  rightAlign: css({
    justifyContent: "flex-end"
  })
}
