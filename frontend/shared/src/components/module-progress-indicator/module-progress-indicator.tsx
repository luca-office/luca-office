import {css} from "@emotion/react"
import * as React from "react"
import {Text} from "../../components"
import {ProgressIndicatorStatus} from "../../enums"
import {
  chartCompleteBarColor,
  chartIncompleteBarColor,
  gradientPrimary,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../styles"

export interface ProgressIndicatorProps {
  readonly progressEntities: ProgressIndicatorStatus[]
}

export const ModuleProgressIndicator: React.FC<ProgressIndicatorProps> = ({progressEntities}) => {
  const renderProgressIndicatorEntry = (index: number, status: ProgressIndicatorStatus) => (
    <div
      key={`project_module_${index}`}
      css={styles.indicator(status)}
      className={getClassNameByProgressIndicatorStatus(status)}
    />
  )

  return (
    <div css={styles.content}>
      <Text size={TextSize.Medium}>{`${progressEntities.filter(e => e === ProgressIndicatorStatus.Completed).length}/${
        progressEntities.length
      }`}</Text>
      <div css={styles.indicatorWrapper(progressEntities.length)}>
        {progressEntities.map((progress, index) => {
          return renderProgressIndicatorEntry(index, progress)
        })}
      </div>
    </div>
  )
}

export const getClassNameByProgressIndicatorStatus = (status: ProgressIndicatorStatus): string =>
  status === ProgressIndicatorStatus.Completed
    ? "completed-indicator"
    : status === ProgressIndicatorStatus.InProgress
    ? "in-progress-indicator"
    : "open-indicator"

const Sizes = {
  indicator: spacingSmall
}

const styles = {
  content: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  indicatorWrapper: (projectModulesCount: number) =>
    css({
      display: "grid",
      gridTemplateColumns: `repeat(${projectModulesCount}, 1fr)`,
      gridColumnGap: spacingTiny
    }),
  indicator: (status: ProgressIndicatorStatus) =>
    css({
      height: Sizes.indicator,
      background:
        status === ProgressIndicatorStatus.Completed
          ? chartCompleteBarColor
          : status === ProgressIndicatorStatus.InProgress
          ? gradientPrimary
          : chartIncompleteBarColor
    })
}
