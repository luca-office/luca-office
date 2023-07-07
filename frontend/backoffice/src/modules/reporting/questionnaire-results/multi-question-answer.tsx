import {css} from "@emotion/react"
import * as React from "react"
import {Text} from "shared/components"
import {FreetextAnswerFragment} from "shared/graphql/generated/FreetextAnswerFragment"
import {
  backgroundColorBright,
  backgroundMenuInactive,
  borderRadius,
  deepShadow,
  Flex,
  flex1,
  FontWeight,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {FreeTextAnswerSwitch} from "./free-text-answer-switch/free-text-answer-switch"

export interface MultiQuestionAnswerProps {
  readonly percent: string
  readonly text?: string
  readonly selectionCount: number
  readonly freeTextAnswers?: FreetextAnswerFragment[]
  readonly participantCount: number
  readonly participantNames: Record<UUID, string>
}

export const MultiQuestionAnswer: React.FC<MultiQuestionAnswerProps> = props => {
  const {t} = useLucaTranslation()
  const {percent, text, selectionCount, freeTextAnswers, participantCount, participantNames} = props

  return (
    <div css={styles.container}>
      <div css={styles.percentage}>
        <Text size={TextSize.Medium} css={styles.label}>
          {percent}
        </Text>
      </div>
      <div css={styles.textContainer}>
        <Text size={TextSize.Medium} css={styles.label}>
          {t("common__x_of_y", {x: selectionCount, y: participantCount})}
        </Text>
        {freeTextAnswers !== undefined && freeTextAnswers.length > 0 ? (
          <FreeTextAnswerSwitch freeTextAnswers={freeTextAnswers} participantNames={participantNames} />
        ) : (
          <Text size={TextSize.Medium}>{text}</Text>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: css(Flex.row, {
    backgroundColor: backgroundColorBright,
    boxShadow: deepShadow,
    borderRadius: borderRadius,
    boxSizing: "border-box"
  }),
  percentage: css({
    boxSizing: "border-box",
    width: 64,
    height: "100%",
    backgroundColor: backgroundMenuInactive,
    padding: spacingSmall
  }),
  textContainer: css({
    flex: flex1,
    padding: spacingSmall
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingSmall
  })
}
