import {css} from "@emotion/react"
import * as React from "react"
import {Paper, Text} from "shared/components"
import {
  Flex,
  inputHeight,
  ratingIndicatorFinished,
  ratingIndicatorInProgress,
  spacing,
  spacingCard,
  spacingSmall,
  textEllipsis,
  TextSize
} from "shared/styles"

export interface RaterPaperProps {
  readonly email: string
  readonly inProgress: boolean
}

export const RaterPaper: React.FC<RaterPaperProps> = ({email, inProgress}) => {
  return (
    <Paper customStyles={styles.paper}>
      <div css={styles.content}>
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {email}
        </Text>
        <div css={styles.indicator(inProgress)} className={"progress-indicator"} />
      </div>
    </Paper>
  )
}

const Size = {
  indicator: 16
}

const styles = {
  paper: css(Flex.column, {
    justifyContent: "center",
    height: inputHeight,
    padding: spacing(0, spacingCard)
  }),
  content: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  label: css(textEllipsis),
  indicator: (inProgress: boolean) =>
    css({
      width: Size.indicator,
      height: Size.indicator,
      borderRadius: "50%",
      backgroundColor: inProgress ? ratingIndicatorInProgress : ratingIndicatorFinished
    })
}
