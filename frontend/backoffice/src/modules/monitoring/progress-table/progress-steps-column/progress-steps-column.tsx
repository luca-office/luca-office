import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {ProjectModuleProgressType, ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ParticipantProjectProgress, ProjectModule} from "shared/models"
import {Flex, spacingHuge, spacingMedium, spacingSmall, spacingTiny, successColor, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getSurveyStatusLabelKey, Option} from "shared/utils"
import {getProgressColor} from "../../../dashboard/utils"

export interface ProgressTableColumnProps {
  readonly lastProjectModuleOfSurvey: Option<ProjectModule>
  readonly moduleCount: number
  readonly progressElement: ParticipantProjectProgress
  readonly hasSurveyEnded?: boolean
}

export const ProgressStepsColumn: React.FunctionComponent<ProgressTableColumnProps> = ({
  progressElement,
  moduleCount,
  hasSurveyEnded,
  lastProjectModuleOfSurvey
}) => {
  const completedCount = progressElement.moduleProgress.filter(
    progress => progress.status === ProjectModuleProgressType.Completed
  ).length
  const countLabel = `${completedCount} / ${moduleCount}`

  const isLastModuleCompleted =
    progressElement.moduleProgress.find(
      module =>
        module.moduleId ===
        lastProjectModuleOfSurvey
          .map(module =>
            module.moduleType === ProjectModuleType.Questionnaire ? module.questionnaireId : module.scenarioId
          )
          .orNull()
    )?.status === ProjectModuleProgressType.Completed

  const {t} = useLucaTranslation()

  return (
    <div css={Flex.row}>
      <Text size={TextSize.Medium}>{countLabel}</Text>
      <div css={styles.progressBar}>
        {progressElement.moduleProgress.map((progress, index) => (
          <Tooltip key={index} title={t(getSurveyStatusLabelKey(progress.status, hasSurveyEnded))}>
            <div key={index} css={styles.progressElement(getProgressColor(progress))} className="progress-item" />
          </Tooltip>
        ))}
      </div>
      <div css={styles.icon}>{isLastModuleCompleted && <Icon name={IconName.Check} color={successColor} />}</div>
    </div>
  )
}

const styles = {
  progressBar: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(16px, 1fr))",
    gridColumnGap: spacingTiny,
    marginLeft: spacingHuge,
    marginRight: spacingSmall,
    width: "100%"
  }),
  progressElement: (background: string) =>
    css({
      height: spacingSmall,
      width: "100%",
      background
    }),
  icon: css({
    width: spacingMedium
  })
}
