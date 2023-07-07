import * as React from "react"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {useCreateQuestionnaireQuestion} from "shared/graphql/hooks"
import {Option} from "shared/utils"

export interface UseCreateQuestionnaireQuestionModalHook {
  readonly createQuestion: (questionType: QuestionType) => void
  readonly selectedQuestionType: Option<QuestionType>
  readonly setSelectedQuestionType: (questionType: QuestionType) => void
}

export const useCreateQuestionnaireQuestionModal = (
  questionnaireId: UUID,
  navigateToQuestion: (questionId: UUID) => void
): UseCreateQuestionnaireQuestionModalHook => {
  const [selectedQuestionType, setSelectedQuestionType] = React.useState<Option<QuestionType>>(Option.none())

  const {createQuestionnaireQuestion} = useCreateQuestionnaireQuestion()

  const handleSetSelectedQuestionType = (questionType: QuestionType) => setSelectedQuestionType(Option.of(questionType))

  const createQuestion = (questionType: QuestionType) => {
    createQuestionnaireQuestion({
      text: "",
      questionType,
      isAdditionalFreeTextAnswerEnabled: false,
      questionnaireId,
      scoringType: QuestionScoringType.None,
      score: selectedQuestionType.map(type => (type === QuestionType.SingleChoice ? 1 : 0)).getOrElse(0)
    }).then(result => {
      result.forEach(question => {
        navigateToQuestion(question.id)
      })
    })
  }

  return {createQuestion, selectedQuestionType, setSelectedQuestionType: handleSetSelectedQuestionType}
}
