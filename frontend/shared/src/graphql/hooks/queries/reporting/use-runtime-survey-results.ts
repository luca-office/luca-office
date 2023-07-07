import {useQuery} from "@apollo/client"
import {RuntimeSurveyResults} from "../../../../models/runtime-survey-results"
import {
  RuntimeSurveyResultsQuery,
  RuntimeSurveyResultsQueryVariables
} from "../../../generated/RuntimeSurveyResultsQuery"
import {runtimeSurveyResultsQuery} from "../../../queries"

export interface RuntimeSurveyResultsProps {
  readonly runtimeSurveyResults: Array<RuntimeSurveyResults>
  readonly runtimeSurveyResultsLoading: boolean
}

export const useRuntimeSurveyResults = (
  surveyId: UUID,
  scenarioId: UUID,
  pollingRateInMillis?: number,
  skip?: boolean
): RuntimeSurveyResultsProps => {
  const {data, loading} = useQuery<RuntimeSurveyResultsQuery, RuntimeSurveyResultsQueryVariables>(
    runtimeSurveyResultsQuery,
    {variables: {surveyId, scenarioId}, pollInterval: pollingRateInMillis, skip}
  )

  return {
    runtimeSurveyResults: data?.runtimeSurveyResults ?? [],
    runtimeSurveyResultsLoading: loading
  }
}
