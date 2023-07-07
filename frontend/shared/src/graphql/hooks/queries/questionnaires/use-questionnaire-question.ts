import {useQuery} from "@apollo/client"
import {QuestionnaireQuestion} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnaireQuestionQuery} from "../../../generated/QuestionnaireQuestionQuery"
import {questionnaireQuestionQuery} from "../../../queries"

export interface QuestionnaireQuestionProps {
  readonly questionnaireQuestion: Option<QuestionnaireQuestion>
  readonly questionnaireQuestionLoading: boolean
}

export const useQuestionnaireQuestion = (id?: UUID): QuestionnaireQuestionProps => {
  const {data, loading} = useQuery<QuestionnaireQuestionQuery>(questionnaireQuestionQuery, {variables: {id}, skip: !id})

  return {
    questionnaireQuestion: Option.of<QuestionnaireQuestion>(data?.questionnaireQuestion),
    questionnaireQuestionLoading: loading
  }
}
