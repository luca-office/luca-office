import {css} from "@emotion/react"
import * as React from "react"
import {HeadingLevel, IconName, ProjectProgressType} from "../../enums"
import {ProjectModuleType} from "../../graphql/generated/globalTypes"
import {ModuleProgress} from "../../models"
import {Flex, FontWeight, iconDisabledColor, spacingMedium, spacingSmall, TextSize} from "../../styles"
import {LucaTFunction} from "../../translations"
import {getSurveyStatusLabelKey} from "../../utils"
import {Icon} from "../icon/icon"
import {ColumnProps} from "../table/table"
import {Tooltip} from "../tooltip/tooltip"
import {Heading, Text} from "../typography/typography"

interface GetReportParticipantOverviewTableColumnsParams {
  readonly t: LucaTFunction
  readonly entityCount: number
  readonly projectProgress: ProjectProgressType
  readonly showFinalScore?: boolean
  readonly showProjectModuleCount?: boolean
}

export const getReportParticipantOverviewTableColumns = ({
  t,
  entityCount,
  projectProgress,
  showFinalScore = false,
  showProjectModuleCount = true
}: GetReportParticipantOverviewTableColumnsParams): ColumnProps<ModuleProgress>[] => [
  {
    key: "elements",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {showProjectModuleCount
          ? t("dashboard__attendee_elements_header", {count: entityCount})
          : t("rater_rating_details__project_module")}
      </Heading>
    ),
    content: (element, index) => `${(index || 0) + 1}. ${element.name}`
  },
  {
    key: "type",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("dashboard__attendee_type_header")}
      </Heading>
    ),
    content: element => (
      <div css={Flex.row}>
        <Icon
          name={element.moduleType === ProjectModuleType.Questionnaire ? IconName.Questionnaire : IconName.Monitor}
          customStyles={css({paddingRight: spacingSmall})}
        />
        {element.moduleType === ProjectModuleType.Scenario
          ? t("dashboard__attendee_type_scenario")
          : t("dashboard__attendee_type_questionnaire")}
      </div>
    )
  },
  ...(showFinalScore
    ? [
        {
          key: "finalScore",
          header: (
            <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {t("reporting_overview_detail_view_final_score")}
            </Heading>
          ),
          content: (element: ModuleProgress) => (
            <Text size={TextSize.Medium}>
              {t("reporting_participant_overview_total_points", {points: element.score, maxPoints: element.maxScore})}
            </Text>
          )
        }
      ]
    : [
        {
          key: "status",
          header: (
            <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
              {projectProgress === ProjectProgressType.NotStarted ||
              projectProgress === ProjectProgressType.SurveyInProgress
                ? t("dashboard__attendee_status_header")
                : t("dashboard__attendee_final_score_header")}
            </Heading>
          ),
          content: (element: ModuleProgress) =>
            projectProgress === ProjectProgressType.NotStarted ||
            projectProgress === ProjectProgressType.SurveyInProgress ? (
              t(getSurveyStatusLabelKey(element.status))
            ) : element.score === null ? (
              <Icon name={IconName.Minimize} />
            ) : (
              t("reporting_participant_overview_total_points", {points: element.score, maxPoints: element.maxScore})
            )
        },
        {
          key: "finalScoreCheck",
          customStyles: css({flex: `0 0 ${spacingMedium}px`}),
          header: (
            <Tooltip title={t("reporting_participant_overview_final_score_tooltip")}>
              <Icon
                name={IconName.PaperComplete}
                customStyles={
                  projectProgress === ProjectProgressType.NotStarted ? css({color: iconDisabledColor}) : undefined
                }
              />
            </Tooltip>
          ),
          content: (element: ModuleProgress) =>
            showFinalScoreSetIcon(element, projectProgress) ? <Icon name={IconName.Check} /> : null
        }
      ])
]

const showFinalScoreSetIcon = (progress: ModuleProgress, projectProgress: ProjectProgressType) => {
  if (projectProgress !== ProjectProgressType.NotStarted) {
    if (progress.moduleType === ProjectModuleType.Questionnaire && progress.status !== undefined) {
      return progress.score !== null
    } else if (progress.moduleType === ProjectModuleType.Scenario) {
      return progress.isScoringOfScenarioCompleted === true
    } else {
      return false
    }
  } else {
    return false
  }
}
