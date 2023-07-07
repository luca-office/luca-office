import {useQuery} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnaireQuery} from "../../../generated/QuestionnaireQuery"
import {questionnaireQuery} from "../../../queries"

export interface QuestionnaireProps {
  readonly questionnaire: Option<Questionnaire>
  readonly questionnaireLoading: boolean
}

export const useQuestionnaire = (id: UUID): QuestionnaireProps => {
  const {data, loading} = useQuery<QuestionnaireQuery>(questionnaireQuery, {variables: {id}, skip: !id})

  return {
    questionnaire: Option.of<Questionnaire>(data?.questionnaire),
    questionnaireLoading: loading
  }
}
