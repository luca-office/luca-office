import {useQuery} from "@apollo/client"
import {Survey} from "../../../../models"
import {Option} from "../../../../utils"
import {GetSurveyQuery, GetSurveyQueryVariables} from "../../../generated/GetSurveyQuery"
import {surveyQuery} from "../../../queries"

export interface SurveyProps {
  readonly survey: Option<Survey>
  readonly surveyLoading: boolean
}

export const useSurvey = (
  surveyId: UUID,
  pollIntervallInMillis?: number,
  skip?: boolean,
  onCompleted?: (data: Option<Survey>) => void
): SurveyProps => {
  const {data, loading} = useQuery<GetSurveyQuery, GetSurveyQueryVariables>(surveyQuery, {
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
