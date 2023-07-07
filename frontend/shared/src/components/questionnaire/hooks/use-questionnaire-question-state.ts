import {QuestionType} from "../../../graphql/generated/globalTypes"
import {QuestionnaireQuestion} from "../../../models"
import {useQuestionnaireState} from "./use-questionnaire-state"
import {useQuestionsState} from "./use-questions-state"

export const useQuestionnaireQuestionState = (questions: Array<QuestionnaireQuestion>) => {
  const {questionsState, setQuestionsState} = useQuestionsState(questions)
  const {numberOfAnsweredQuestions, isQuestionnaireFinished} = useQuestionnaireState(questionsState)

  const onSelectAnswer = (questionId: UUID, answerId: UUID) => {
    if (questionsState !== undefined) {
      const oldState = questionsState[questionId]
      if (oldState.type === QuestionType.SingleChoice) {
        setQuestionsState({...questionsState, [questionId]: {...oldState, answers: [answerId]}})
      } else if (oldState.type === QuestionType.MultipleChoice) {
        setQuestionsState({...questionsState, [questionId]: {...oldState, answers: [...oldState.answers, answerId]}})
      }
    }
  }

  const onDeselectAnswer = (questionId: UUID, answerId: UUID) => {
    if (questionsState !== undefined) {
      const oldState = questionsState[questionId]
      if (oldState.type === QuestionType.SingleChoice) {
        setQuestionsState({...questionsState, [questionId]: {...oldState, answers: []}})
      } else if (oldState.type === QuestionType.MultipleChoice) {
        setQuestionsState({
          ...questionsState,
          [questionId]: {...oldState, answers: oldState.answers.filter(id => id !== answerId)}
        })
      }
    }
  }

  const onUpdateFreeText = (questionId: UUID, text: string) => {
    if (questionsState !== undefined) {
      const oldState = questionsState[questionId]
      if (oldState.type === QuestionType.FreeText) {
        setQuestionsState({...questionsState, [questionId]: {...oldState, answer: text}})
      } else if (oldState.hasAdditionalFreeTextAnswer) {
        setQuestionsState({...questionsState, [questionId]: {...oldState, freeText: text}})
      }
    }
  }

  return {
    isQuestionnaireFinished,
    numberOfAnsweredQuestions,
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText
  }
}
