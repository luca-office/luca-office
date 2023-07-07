import {css} from "@emotion/react"
import React from "react"
import {IconName} from "../../../enums"
import {
  cardBottomColor,
  CustomStyle,
  Flex,
  fontColorBright,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Button, Icon, Text} from "../.."

export interface QuestionnaireFooterProps extends CustomStyle {
  answeredQuestionsCount: number
  totalQuestionsCount: number
  isButtonDisabled: boolean
  buttonLabel: string
  onButtonClick: () => void
  customIcon?: IconName
}

export const QuestionnaireFooter: React.FC<QuestionnaireFooterProps> = ({
  answeredQuestionsCount,
  totalQuestionsCount,
  isButtonDisabled,
  buttonLabel,
  onButtonClick,
  customIcon,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[styles.footer, customStyles]}>
      <div css={styles.completesAnswers}>
        <Icon name={customIcon ?? IconName.Bell} customStyles={styles.completesAnswersIcon} />
        <Text size={TextSize.Medium}>
          {t("questionnaire__completed_answers", {
            finishedCount: answeredQuestionsCount,
            totalCount: totalQuestionsCount
          })}
        </Text>
      </div>
      <Button disabled={isButtonDisabled} onClick={onButtonClick} icon={IconName.Check} customStyles={styles.button}>
        <Text size={TextSize.Medium} customStyles={styles.buttonText}>
          {buttonLabel}
        </Text>
      </Button>
    </div>
  )
}

const styles = {
  footer: css(Flex.row, {
    justifyContent: "space-between",
    alignItems: "center",
    background: cardBottomColor,
    borderRadius: spacing(0, 0, spacingTiny, spacingTiny),
    padding: spacing(spacingSmall, spacingLarge)
  }),
  completesAnswers: css(Flex.row),
  completesAnswersIcon: css({marginRight: spacingSmall}),
  button: css({
    width: "auto",
    padding: spacing(0, spacingHuge)
  }),
  buttonText: css({
    whiteSpace: "nowrap",
    color: fontColorBright
  })
}
