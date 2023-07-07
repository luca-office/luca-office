import {useQuery} from "@apollo/client"
import {QuestionnaireQuestion} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnaireQuestionsQuery} from "../../../generated/QuestionnaireQuestionsQuery"
import {questionnaireQuestionsQuery} from "../../../queries"

export interface QuestionnaireQuestionsProps {
  readonly questionnaireQuestions: Option<QuestionnaireQuestion[]>
  readonly questionnaireQuestionsLoading: boolean
}

export const useQuestionnaireQuestions = (questionnaireId: UUID): QuestionnaireQuestionsProps => {
  const {data, loading} = useQuery<QuestionnaireQuestionsQuery>(questionnaireQuestionsQuery, {
    variables: {questionnaireId}
  })

  return {
    questionnaireQuestions: Option.of(data?.questionnaireQuestions),
    questionnaireQuestionsLoading: loading
  }
}
