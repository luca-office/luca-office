import {IconName} from "../../../enums"
import {QuestionScoringType, QuestionType} from "../../../graphql/generated/globalTypes"
import {LucaTFunction} from "../../../translations"

// eslint-disable-next-line consistent-return
export const getQuestionTypeTitle = (t: LucaTFunction, type: QuestionType) => {
  switch (type) {
    case QuestionType.SingleChoice:
      return t("questionnaire__single_choice")
    case QuestionType.MultipleChoice:
      return t("questionnaire__multiple_choice")
    case QuestionType.FreeText:
      return t("questionnaire__free_text")
  }
}

// eslint-disable-next-line consistent-return
export const getQuestionTypeIconName = (type: QuestionType) => {
  switch (type) {
    case QuestionType.SingleChoice:
      return IconName.SingleChoice
    case QuestionType.MultipleChoice:
      return IconName.MultipleChoice
    case QuestionType.FreeText:
      return IconName.SpeechBubble
  }
}

// eslint-disable-next-line consistent-return
export const getQuestionScoringTypeIconName = (type: QuestionScoringType) => {
  switch (type) {
    case QuestionScoringType.Holistic:
      return IconName.SingleChoice
    case QuestionScoringType.Analytical:
      return IconName.MultipleChoice
    case QuestionScoringType.None:
      return IconName.Information
  }
}

// eslint-disable-next-line consistent-return
export const getAnswersTitle = (t: LucaTFunction, type: QuestionType) => {
  switch (type) {
    case QuestionType.SingleChoice:
      return t("questionnaire__single_choice_title")
    case QuestionType.MultipleChoice:
      return t("questionnaire__multiple_choice_title")
    case QuestionType.FreeText:
      return t("questionnaire__free_text_title")
  }
}
