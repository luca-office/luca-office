import {useQuery} from "@apollo/client"
import {SurveyLight} from "../../../../models"
import {Option} from "../../../../utils"
import {GetSurveyLightQuery, GetSurveyLightQueryVariables} from "../../../generated/GetSurveyLightQuery"
import {surveyLightQuery} from "../../../queries"

export interface SurveyLightProps {
  readonly survey: Option<SurveyLight>
  readonly surveyLoading: boolean
}

export const useSurveyLight = (
  surveyId: UUID,
  pollIntervallInMillis?: number,
  skip?: boolean,
  onCompleted?: (data: Option<SurveyLight>) => void
): SurveyLightProps => {
  const {data, loading} = useQuery<GetSurveyLightQuery, GetSurveyLightQueryVariables>(surveyLightQuery, {
    variables: {id: surveyId},
    pollInterval: pollIntervallInMillis,
    skip,
    onCompleted: data => onCompleted?.(Option.of(data?.survey))
  })

  return {
    survey: Option.of(data?.survey),
    surveyLoading: loading
  }
}
