import {css} from "@emotion/react"
import * as React from "react"
import {Button, Icon, Text} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {FreetextAnswerFragment} from "shared/graphql/generated/FreetextAnswerFragment"
import {
  borderRadius,
  Flex,
  insetShadow,
  primaryColor,
  spacingHuge,
  spacingHuger,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {useFreeTextAnswerSwitch} from "./use-free-text-answer-switch"

export interface FreeTextAnswerSwitchProps {
  readonly freeTextAnswers: FreetextAnswerFragment[]
  readonly participantNames: Record<UUID, string>
}

export const FreeTextAnswerSwitch: React.FC<FreeTextAnswerSwitchProps> = ({freeTextAnswers, participantNames}) => {
  const {currentAnswerIndex, next, previous, totalNumberOfAnswers, currentAnswer} = useFreeTextAnswerSwitch(
    freeTextAnswers
  )
  const participantName = participantNames[currentAnswer?.surveyInvitationId ?? ""] ?? ""

  return currentAnswer !== undefined ? (
    <div css={styles.container}>
      <Text size={TextSize.Medium}>{currentAnswer.text}</Text>
      <div css={styles.switch}>
        <div css={styles.rowWithGap}>
          <Icon color={primaryColor} name={IconName.Student} />
          <Text customStyles={styles.text} size={TextSize.Medium}>
            {participantName} ({currentAnswerIndex + 1}/{totalNumberOfAnswers})
          </Text>
        </div>
        <div css={styles.rowWithGap}>
          <Button variant={ButtonVariant.IconOnly} icon={IconName.TriangleLeft} onClick={previous} />
          <Button variant={ButtonVariant.IconOnly} icon={IconName.TriangleRight} onClick={next} />
        </div>
      </div>
    </div>
  ) : null
}

const styles = {
  container: css(Flex.column),
  switch: css(Flex.row, {
    justifyContent: "space-between",
    borderRadius: borderRadius,
    height: spacingHuger,
    boxShadow: insetShadow,
    padding: spacingSmall,
    paddingLeft: spacingMedium,
    boxSizing: "border-box",
    marginTop: spacingHuge
  }),
  text: css({
    color: primaryColor
  }),
  rowWithGap: css(Flex.row, {
    gap: spacingSmall
  })
}
