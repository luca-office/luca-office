import {QuestionType} from "../graphql/generated/globalTypes"
import {LucaTFunction} from "../translations"

export const mapQuestionTypeToName = (questionType: QuestionType, t: LucaTFunction): string => {
  switch (questionType) {
    case QuestionType.FreeText:
      return t("questionnaire__free_text")
    case QuestionType.SingleChoice:
      return t("questionnaire__single_choice")
    case QuestionType.MultipleChoice:
      return t("questionnaire__multiple_choice")
  }
}
