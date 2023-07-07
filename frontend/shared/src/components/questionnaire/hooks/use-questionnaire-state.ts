import {useEffect, useState} from "react"
import {QuestionType} from "../../../graphql/generated/globalTypes"
import {STATIC_FREETEXT_ANSWER_ID} from "../config/common"
import {QuestionsState} from "./use-questions-state"

export const useQuestionnaireState = (questionsState?: QuestionsState) => {
  const [isQuestionnaireFinished, setIsQuestionnaireFinished] = useState(false)
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0)

  useEffect(() => {
    if (questionsState !== undefined) {
      const numOfAnsweredQuestions = Object.values(questionsState).reduce((count, questionState) => {
        if (questionState.type === QuestionType.FreeText) {
          return questionState.answer.length > 0 ? count + 1 : count
        } else {
          if (questionState.hasAdditionalFreeTextAnswer) {
            const isFreeTextAnswerSelected = questionState.answers.includes(STATIC_FREETEXT_ANSWER_ID)
            return (isFreeTextAnswerSelected && questionState.freeText !== "") ||
              (!isFreeTextAnswerSelected && questionState.answers.length > 0)
              ? count + 1
              : count
          } else {
            return questionState.answers.length > 0 ? count + 1 : count
          }
        }
      }, 0)

      setNumberOfAnsweredQuestions(numOfAnsweredQuestions)
      setIsQuestionnaireFinished(numOfAnsweredQuestions === Object.keys(questionsState).length)
    }
  }, [questionsState])

  return {numberOfAnsweredQuestions, isQuestionnaireFinished}
}
