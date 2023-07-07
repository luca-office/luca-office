import {useEffect, useState} from "react"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "../../../models"

export interface QuestionsState {
  [index: string]: QuestionState
}

export type QuestionState =
  | {
      type: QuestionType.FreeText
      answer: string
    }
  | {
      type: QuestionType.SingleChoice | QuestionType.MultipleChoice
      answers: Array<UUID>
      hasAdditionalFreeTextAnswer: false
    }
  | {
      type: QuestionType.SingleChoice | QuestionType.MultipleChoice
      answers: Array<UUID>
      hasAdditionalFreeTextAnswer: true
      freeText: string
    }

export const useQuestionsState = (questions: Array<QuestionnaireQuestion>) => {
  const [questionsState, setQuestionsState] = useState<QuestionsState>()

  useEffect(() => {
    if (questions.length > 0) {
      const state = questions.reduce((state: QuestionsState, question) => {
        let questionState: QuestionState

        if (question.questionType === QuestionType.FreeText) {
          questionState = {
            type: QuestionType.FreeText,
            answer: ""
          }
        } else {
          if (question.isAdditionalFreeTextAnswerEnabled) {
            questionState = {
              type: question.questionType,
              answers: [],
              hasAdditionalFreeTextAnswer: true,
              freeText: ""
            }
          } else {
            questionState = {
              type: question.questionType,
              hasAdditionalFreeTextAnswer: false,
              answers: []
            }
          }
        }

        return {...state, [question.id]: questionState}
      }, {} as QuestionsState)

      setQuestionsState(state)
    }
  }, [questions])

  return {questionsState, setQuestionsState}
}
