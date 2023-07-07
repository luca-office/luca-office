import {useQuery} from "@apollo/client"
import {QuestionnaireLight} from "../../../../models"
import {Option} from "../../../../utils"
import {QuestionnairesLightQuery} from "../../../generated/QuestionnairesLightQuery"
import {questionnairesLightQuery} from "../../../queries"

export interface QuestionnairesLightProps {
  readonly questionnaires: Option<QuestionnaireLight[]>
  readonly questionnairesLoading: boolean
}

export const useLightQuestionnaires = (isRuntimeSurvey: boolean): QuestionnairesLightProps => {
  const {data, loading} = useQuery<QuestionnairesLightQuery>(questionnairesLightQuery, {variables: {isRuntimeSurvey}})

  return {
    questionnaires: Option.of<QuestionnaireLight[]>(data?.questionnaires),
    questionnairesLoading: loading
  }
}
