import {useQuery} from "@apollo/client"
import {Questionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnairesQuery} from "../../../generated/QuestionnairesQuery"
import {questionnairesQuery} from "../../../queries"

export interface QuestionnairesProps {
  readonly questionnaires: Option<Questionnaire[]>
  readonly questionnairesLoading: boolean
}

export const useQuestionnaires = (isRuntimeSurvey: boolean): QuestionnairesProps => {
  const {data, loading} = useQuery<QuestionnairesQuery>(questionnairesQuery, {variables: {isRuntimeSurvey}})

  return {
    questionnaires: Option.of<Questionnaire[]>(data?.questionnaires),
    questionnairesLoading: loading
  }
}
