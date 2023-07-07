import {useLazyQuery} from "@apollo/client"
import {RuntimeSurveyResults} from "../../../../models/runtime-survey-results"
import {
  RuntimeSurveyResultsQuery,
  RuntimeSurveyResultsQueryVariables
} from "../../../generated/RuntimeSurveyResultsQuery"
import {runtimeSurveyResultsQuery} from "../../../queries"

export interface RuntimeSurveyResultsLazyProps {
  readonly runtimeSurveyResults: Array<RuntimeSurveyResults>
  readonly runtimeSurveyResultsLoading: boolean
  readonly getRuntimeSurveyResults: (surveyId: UUID, scenarioId: UUID) => void
}

export const useRuntimeSurveyResultsLazy = (): RuntimeSurveyResultsLazyProps => {
  const [getRuntimeSurveyResults, {data, loading}] = useLazyQuery<
    RuntimeSurveyResultsQuery,
    RuntimeSurveyResultsQueryVariables
  >(runtimeSurveyResultsQuery)

  return {
    runtimeSurveyResults: data?.runtimeSurveyResults ?? [],
    runtimeSurveyResultsLoading: loading,
    getRuntimeSurveyResults: (surveyId: UUID, scenarioId: UUID) =>
      getRuntimeSurveyResults({variables: {surveyId, scenarioId}})
  }
}
