import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName} from "../../enums"
import {
  borderRadiusLarge,
  chartBackgroundColor,
  chartCompleteBarColor,
  CustomStyle,
  Flex,
  primaryColor,
  spacingHuge,
  spacingMedium,
  spacingSmall,
  successColor,
  TextSize
} from "../../styles"
import {toPercent} from "../../utils"
import {Icon} from "../icon/icon"
import {Text} from "../typography/typography"

export interface ProgressTableColumnProps extends CustomStyle {
  readonly progressCount: number
  readonly overallCount: number
  readonly customProgressBarStyles?: CSSInterpolation
  readonly displayLabel?: boolean
  readonly displayCompleteIcon?: boolean
  readonly barColor?: string
  readonly completedColor?: string
}

export const ProgressBarColumn: React.FunctionComponent<ProgressTableColumnProps> = ({
  progressCount,
  overallCount,
  customProgressBarStyles,
  displayLabel = true,
  displayCompleteIcon = true,
  barColor = primaryColor,
  completedColor = chartCompleteBarColor,
  customStyles
}) => {
  const countLabel = `${progressCount} / ${overallCount}`
  const isCompleted = progressCount === overallCount && overallCount !== 0
  const percentWidth = toPercent(progressCount, overallCount)
  return (
    <div css={[displayLabel && Flex.row, customStyles]}>
      {displayLabel && <Text size={TextSize.Medium}>{countLabel}</Text>}
      <div css={[styles.progressBar, customProgressBarStyles]}>
        <div
          css={styles.progressElement(!isCompleted ? barColor : completedColor, percentWidth)}
          className={"progress-element"}
        />
      </div>
      {displayCompleteIcon && (
        <div css={styles.icon}>{isCompleted && <Icon name={IconName.Check} color={successColor} />}</div>
      )}
    </div>
  )
}

const styles = {
  progressBar: css({
    marginLeft: spacingHuge,
    marginRight: spacingMedium,
    background: chartBackgroundColor,
    borderRadius: borderRadiusLarge,
    height: spacingSmall,
    width: "100%"
  }),
  progressElement: (background: string, width: number) =>
    css({
      height: spacingSmall,
      borderRadius: borderRadiusLarge,
      width: `${width}%`,
      background
    }),
  icon: css({
    width: spacingMedium
  })
}
