import {css} from "@emotion/react"
import React from "react"
import {borderRadius, borderRadiusLarge, CustomStyle, errorColor, primaryColor} from "../../styles"
import {Tooltip} from "../tooltip/tooltip"

interface Props extends CustomStyle {
  readonly progressInPercent: number
  readonly verticalLinePositionInPercent?: number
  readonly customHeight?: number
  readonly verticalLineTooltipText?: string
  readonly progressBarColor?: string
}

export const ProgressBar: React.FC<Props> = ({
  progressInPercent,
  verticalLinePositionInPercent,
  customHeight = 8,
  verticalLineTooltipText,
  progressBarColor,
  customStyles
}) => {
  const sanitizedProgress = progressInPercent > 100 ? 100 : progressInPercent
  const sanitizedVerticalLinePositionInPercent =
    verticalLinePositionInPercent !== undefined
      ? verticalLinePositionInPercent > 100
        ? 100
        : verticalLinePositionInPercent < 0
        ? 0
        : verticalLinePositionInPercent
      : undefined

  const verticalLine =
    sanitizedVerticalLinePositionInPercent !== undefined ? (
      <div
        css={styles.verticalLine(
          sanitizedVerticalLinePositionInPercent,
          customHeight,
          verticalLineTooltipText !== undefined
        )}
      />
    ) : null

  return (
    <div css={[styles.progressBar(customHeight), customStyles]}>
      <div
        css={styles.progressElement(sanitizedProgress, customHeight, progressBarColor)}
        className={"progress-element"}
      />
      {verticalLine !== null ? (
        verticalLineTooltipText !== undefined ? (
          <Tooltip title={verticalLineTooltipText}>{verticalLine}</Tooltip>
        ) : (
          verticalLine
        )
      ) : null}
    </div>
  )
}

const styles = {
  progressBar: (height: number) =>
    css({
      position: "relative",
      background: "linear-gradient(0deg, rgb(180, 180, 180) 0%, rgb(213, 213, 213) 100%)",
      borderRadius: borderRadiusLarge,
      height: height,
      width: "auto"
    }),
  progressElement: (width: number, height: number, progressBarColor?: string) =>
    css({
      height: height,
      borderRadius: borderRadiusLarge,
      width: `${width}%`,
      background: progressBarColor !== undefined ? progressBarColor : width > 10 ? primaryColor : errorColor
    }),
  verticalLine: (verticalLinePositionInPercent: number, height: number, hasTooltip: boolean) =>
    // to resize the vertical line of the progressbar, height and width are calculated depending on the given size.
    css({
      position: "absolute",
      height: height * 2,
      width: height / 2.5,
      bottom: -height / 2,
      left: `${verticalLinePositionInPercent - 0.2}%`, // 0.2 % is needed to adjust the vertical line to the end of progress element without a gap
      borderRadius: borderRadius,
      backgroundColor: "black",
      cursor: hasTooltip ? "pointer" : "default"
    })
}
