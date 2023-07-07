import {useQuery} from "@apollo/client"
import {QuestionnaireQuery} from "shared/graphql/generated/QuestionnaireQuery"
import {questionnaireQuery} from "shared/graphql/queries"
import {Questionnaire} from "shared/models"
import {Option} from "shared/utils"

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
