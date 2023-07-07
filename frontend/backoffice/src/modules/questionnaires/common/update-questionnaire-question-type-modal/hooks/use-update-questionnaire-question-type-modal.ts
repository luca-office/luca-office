import * as React from "react"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {useUpdateQuestionnaireAnswer, useUpdateQuestionnaireQuestion} from "shared/graphql/hooks"
import {QuestionnaireQuestion} from "shared/models"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {isScoringResetNecessary} from "../../../utils"

export interface UseUpdateQuestionnaireQuestionTypeModalHook {
  readonly updateQuestion: (questionType: QuestionType) => Promise<Option<QuestionnaireQuestion>>
  readonly actionLoading: boolean
  readonly selectedQuestionType: Option<QuestionType>
  readonly setSelectedQuestionType: (questionType: QuestionType) => void
  readonly errorMessage: Option<string>
}

export const useUpdateQuestionnaireQuestionTypeModal = (
  question: QuestionnaireQuestion
): UseUpdateQuestionnaireQuestionTypeModalHook => {
  const {t} = useLucaTranslation()

  const {updateQuestionnaireQuestion, updateQuestionnaireQuestionLoading} = useUpdateQuestionnaireQuestion(question.id)
  const {updateQuestionnaireAnswer, updateQuestionnaireAnswerLoading} = useUpdateQuestionnaireAnswer(question.id)

  const [selectedQuestionType, setSelectedQuestionType] = React.useState<Option<QuestionType>>(
    Option.of(question.questionType)
  )

  const isChangingFromSingleOrMultipleChoiceToFreeText = (questionType: QuestionType) =>
    (question.questionType === QuestionType.SingleChoice || question.questionType === QuestionType.MultipleChoice) &&
    questionType === QuestionType.FreeText
  const isChangingFromFreeTextToSingleOrMultipleChoice = (questionType: QuestionType) =>
    question.questionType === QuestionType.FreeText &&
    (questionType === QuestionType.SingleChoice || questionType === QuestionType.MultipleChoice)

  const errorMessage = selectedQuestionType
    .flatMap(questionType => {
      if (isChangingFromSingleOrMultipleChoiceToFreeText(questionType)) {
        return Option.of<LucaI18nLangKey>("questionnaire_question__update_to_free_text_question_waning")
      }

      if (
        isChangingFromFreeTextToSingleOrMultipleChoice(questionType) &&
        question.scoringType !== QuestionScoringType.None
      ) {
        return Option.of<LucaI18nLangKey>("questionnaire_question__update_from_free_text_question_waning")
      }
      return Option.none<LucaI18nLangKey>()
    })
    .map(t)

  const handleSetSelectedQuestionType = (questionType: QuestionType) => {
    setSelectedQuestionType(Option.of(questionType))
  }

  const updateQuestion = (questionType: QuestionType) => {
    if (question.questionType !== QuestionType.SingleChoice && questionType === QuestionType.SingleChoice) {
      question.answers
        .filter(answer => answer.isCorrect)
        .forEach(answer => {
          updateQuestionnaireAnswer(answer.id, {text: answer.text, isCorrect: false})
        })
    }

    return updateQuestionnaireQuestion({
      text: question.text,
      questionType,
      isAdditionalTextAnswerAllowed: false,
      binaryFileId: question.binaryFileId,
      // if target question type does not support current scoring, switch to None
      scoringType: isScoringResetNecessary(
        question.scoringType !== QuestionScoringType.None,
        question.questionType,
        questionType
      )
        ? QuestionScoringType.None
        : question.scoringType,
      score: question.score
    })
  }

  return {
    updateQuestion,
    actionLoading: updateQuestionnaireAnswerLoading || updateQuestionnaireQuestionLoading,
    selectedQuestionType,
    setSelectedQuestionType: handleSetSelectedQuestionType,
    errorMessage
  }
}
