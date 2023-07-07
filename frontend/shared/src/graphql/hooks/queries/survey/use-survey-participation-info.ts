import {useQuery} from "@apollo/client"
import {SurveyParticipationInfo} from "../../../../models"
import {Option} from "../../../../utils/option"
import {
  SurveyParticipationInfoQuery,
  SurveyParticipationInfoQueryVariables
} from "../../../generated/SurveyParticipationInfoQuery"
import {surveyParticipationInfoQuery} from "../../../queries"

export interface UseSurveyParticipationInfoHook {
  readonly surveyParticipationInfoLoading: boolean
  readonly surveyParticipationInfo: Option<SurveyParticipationInfo>
}

export const useSurveyParticipationInfo = (token: string): UseSurveyParticipationInfoHook => {
  const {loading, data} = useQuery<SurveyParticipationInfoQuery, SurveyParticipationInfoQueryVariables>(
    surveyParticipationInfoQuery,
    {variables: {token}}
  )

  return {surveyParticipationInfoLoading: loading, surveyParticipationInfo: Option.of(data?.surveyParticipationInfo)}
}
