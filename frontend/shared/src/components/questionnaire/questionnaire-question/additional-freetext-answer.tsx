import {css} from "@emotion/react"
import React from "react"
import {InputType} from "../../../enums"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {
  backgroundColorBright,
  border,
  borderRadius,
  deepShadow,
  Flex,
  flex1,
  primaryColor,
  spacingCard,
  spacingMedium,
  spacingSmall
} from "../../../styles"
import {Checkbox, RadioButton} from "../.."
import {TextInput} from "../../input"
import {STATIC_FREETEXT_ANSWER_ID} from "../config/common"

export interface AdditionalFreeTextAnswerPropsProps {
  readonly questionType: QuestionType.SingleChoice | QuestionType.MultipleChoice
  readonly onClick: (id: typeof STATIC_FREETEXT_ANSWER_ID) => void
  readonly isSelected: boolean
  readonly isDisabled?: boolean
  readonly onChangeFreeText?: (text: string) => void
  readonly initialText?: string
  readonly isHighlighted?: boolean
}

export const AdditionalFreeTextAnswer: React.FC<AdditionalFreeTextAnswerPropsProps> = ({
  onClick,
  isSelected,
  questionType,
  isDisabled = false,
  onChangeFreeText,
  initialText,
  isHighlighted = false
}) => {
  return (
    <div css={[styles.container, isHighlighted ? styles.highlightedBorder : undefined]}>
      {questionType === QuestionType.SingleChoice ? (
        <RadioButton selected={isSelected} onChange={() => onClick(STATIC_FREETEXT_ANSWER_ID)} disabled={isDisabled} />
      ) : (
        <Checkbox checked={isSelected} onChange={() => onClick(STATIC_FREETEXT_ANSWER_ID)} disabled={isDisabled} />
      )}
      <TextInput
        disabled={isDisabled}
        value={initialText}
        customStyles={styles.text(questionType === QuestionType.SingleChoice)}
        customInputContainerStyles={styles.textInputContainer}
        type={InputType.text}
        onChange={onChangeFreeText}
      />
    </div>
  )
}

const styles = {
  container: css(Flex.row, {
    backgroundColor: backgroundColorBright,
    boxShadow: deepShadow,
    borderRadius,
    padding: spacingCard
  }),
  text: (isSingleChoice: boolean) =>
    css({
      marginLeft: isSingleChoice ? spacingSmall : spacingMedium, // different spacing because the radio button has a margin
      flex: flex1
    }),
  highlightedBorder: css({
    border: border(2, primaryColor)
  }),
  textInputContainer: css({
    marginLeft: 0
  })
}
