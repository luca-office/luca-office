import {css} from "@emotion/react"
import * as React from "react"
import {Icon, Text, Tooltip} from "../../components"
import {IconName} from "../../enums"
import {
  borderRadiusLarge,
  CustomStyle,
  errorColor,
  Flex,
  flex0,
  primaryColor,
  spacingHuge,
  spacingMedium,
  spacingSmall
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {formatDate, formatTime, now} from "../../utils/date"
import {useProgressTimeClock} from "./hooks/use-progress-time-clock"

export interface ProgressTimeClockProps extends CustomStyle {
  readonly maxModuleTimeInSeconds?: number
  readonly fictiveDate?: Date
}

export const ProgressTimeClock: React.FC<ProgressTimeClockProps> = ({
  maxModuleTimeInSeconds: scenarioTimeInSeconds,
  fictiveDate,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  const {timeVisible, dateValue, percentWidth, remainingTimeString, handleTimeClick, isTimeElapsed} =
    useProgressTimeClock(fictiveDate, scenarioTimeInSeconds)

  return (
    <div css={[styles.container, customStyles]} onClick={handleTimeClick}>
      <Tooltip
        customStyles={styles.clock}
        title={timeVisible && !!scenarioTimeInSeconds ? t("project__display_remaining_time") : ""}
        withPortal={true}>
        {timeVisible ? (
          <div css={Flex.row}>
            <Text customStyles={!!scenarioTimeInSeconds && styles.clockText}>{`${formatDate(dateValue)} - ${formatTime(
              now(),
              false
            )}`}</Text>
            <Icon
              name={IconName.Clock}
              customStyles={styles.clockIcon}
              hoverColor={scenarioTimeInSeconds ? primaryColor : undefined}
            />
          </div>
        ) : (
          <div css={Flex.row}>
            <div css={styles.progressBar}>
              <div css={styles.progressElement(percentWidth)} className={"progress-element"} />
            </div>
            <Text>
              {t(isTimeElapsed ? "project__additional_time" : "project__remaining_time", {time: remainingTimeString})}
            </Text>
            <Icon name={IconName.Clock} customStyles={styles.clockIcon} />
          </div>
        )}
      </Tooltip>
    </div>
  )
}

const Size = {
  container: 250,
  progressBar: 100
}

const styles = {
  container: css(Flex.row, {
    width: Size.container,
    justifyContent: "flex-end"
  }),
  clock: css(Flex.row, {
    flex: flex0,
    alignItems: "center"
  }),
  clockText: css({
    "&:hover": {
      color: primaryColor
    }
  }),
  clockIcon: css({
    marginLeft: spacingSmall
  }),
  progressBar: css({
    marginLeft: spacingHuge,
    marginRight: spacingMedium,
    background: "linear-gradient(0deg, rgb(180, 180, 180) 0%, rgb(213, 213, 213) 100%)",
    borderRadius: borderRadiusLarge,
    height: spacingSmall,
    width: Size.progressBar
  }),
  progressElement: (width: number) =>
    css({
      height: spacingSmall,
      borderRadius: borderRadiusLarge,
      width: `${width}%`,
      background: width > 10 ? primaryColor : errorColor
    })
}
