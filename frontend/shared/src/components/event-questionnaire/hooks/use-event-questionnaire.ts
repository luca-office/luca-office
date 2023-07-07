import {useQuestionnaireQuestionState} from "../../../components"
import {useQuestionnaire} from "../../../graphql/hooks"
import {Questionnaire} from "../../../models"
import {Option} from "../../../utils"

export interface EventQuestionnaireProps {
  readonly questionnaire: Option<Questionnaire>
  readonly questionnaireLoading: boolean
  readonly isQuestionnaireFinished: boolean
  readonly numberOfAnsweredQuestions: number
  readonly onSelectAnswer: (questionId: string, answerId: string) => void
  readonly onDeselectAnswer: (questionId: string, answerId: string) => void
  readonly onUpdateFreeText: (questionId: string, text: string) => void
}

export interface UseEventQuestionnaireProps {
  id: UUID
}

export const useEventQuestionnaire = ({id}: UseEventQuestionnaireProps): EventQuestionnaireProps => {
  const {questionnaire, questionnaireLoading} = useQuestionnaire(id)
  const {
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions
  } = useQuestionnaireQuestionState(questionnaire.map(({questions}) => questions).getOrElse([]))

  return {
    questionnaire,
    questionnaireLoading,
    isQuestionnaireFinished,
    numberOfAnsweredQuestions,
    onSelectAnswer,
    onDeselectAnswer,
    onUpdateFreeText
  }
}
