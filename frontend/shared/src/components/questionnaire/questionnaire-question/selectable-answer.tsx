import {css} from "@emotion/react"
import React from "react"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {
  backgroundColorBright,
  border,
  borderRadius,
  deepShadow,
  Flex,
  primaryColor,
  spacingCard,
  spacingMedium,
  spacingSmall,
  TextSize
} from "../../../styles"
import {Checkbox, RadioButton} from "../.."
import {Text} from "../../typography/typography"

export interface AnswerBaseType {
  readonly id: UUID
  readonly text: string
}

export interface SelectableAnswerProps<T extends AnswerBaseType> {
  readonly answer: T
  readonly handleSelectionChange: (id: string) => void
  readonly isSelected: boolean
  readonly questionType: QuestionType.SingleChoice | QuestionType.MultipleChoice
  readonly disabled?: boolean
  readonly isHighlighted?: boolean
}

export const SelectableAnswer = <T extends AnswerBaseType>({
  answer,
  handleSelectionChange,
  isSelected,
  questionType,
  disabled = false,
  isHighlighted = false
}: SelectableAnswerProps<T>) => {
  return (
    <div
      css={[styles.container, isHighlighted ? styles.highlightedBorder : undefined]}
      onClick={() => handleSelectionChange(answer.id)}
      role="button"
      className={"answer-container"}>
      {questionType === QuestionType.SingleChoice ? (
        <RadioButton disabled={disabled} selected={isSelected} />
      ) : (
        <Checkbox disabled={disabled} checked={isSelected} />
      )}
      <Text size={TextSize.Medium} customStyles={styles.text(questionType === QuestionType.SingleChoice)}>
        {answer.text}
      </Text>
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
  highlightedBorder: css({
    border: border(2, primaryColor)
  }),
  text: (isSingleChoice: boolean) =>
    css({
      marginLeft: isSingleChoice ? spacingSmall : spacingMedium // different spacing because the radio button has a margin
    })
}
