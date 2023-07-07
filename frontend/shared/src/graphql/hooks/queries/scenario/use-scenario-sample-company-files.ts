import {useQuery} from "@apollo/client"
import {ScenarioSampleCompanyFile} from "../../../../models"
import {
  ScenarioSampleCompanyFilesQuery,
  ScenarioSampleCompanyFilesQueryVariables
} from "../../../generated/ScenarioSampleCompanyFilesQuery"
import {scenarioSampleCompanyFilesQuery} from "../../../queries"

export interface UseScenarioSampleCompanyFilesHook {
  readonly scenarioSampleCompanyFiles: ScenarioSampleCompanyFile[]
  readonly scenarioSampleCompanyFilesLoading: boolean
}

export const useScenarioSampleCompanyFiles = (scenarioId: UUID): UseScenarioSampleCompanyFilesHook => {
  const {data, loading} = useQuery<ScenarioSampleCompanyFilesQuery, ScenarioSampleCompanyFilesQueryVariables>(
    scenarioSampleCompanyFilesQuery,
    {variables: {scenarioId}}
  )

  return {
    scenarioSampleCompanyFiles: data?.scenarioSampleCompanyFiles ?? [],
    scenarioSampleCompanyFilesLoading: loading
  }
}
