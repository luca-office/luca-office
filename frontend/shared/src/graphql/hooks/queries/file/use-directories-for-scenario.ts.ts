import {useQuery} from "@apollo/client"
import {Directory} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  DirectoriesForScenarioQuery,
  DirectoriesForScenarioQueryVariables
} from "../../../generated/DirectoriesForScenarioQuery"
import {directoriesForScenarioQuery} from "../../../queries"

export interface UseDirectoriesHook {
  readonly directories: Option<Directory[]>
  readonly directoriesLoading: boolean
}

export const useDirectoriesForScenario = (scenarioId: string): UseDirectoriesHook => {
  const {data, loading} = useQuery<DirectoriesForScenarioQuery, DirectoriesForScenarioQueryVariables>(
    directoriesForScenarioQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    directories: Option.of(data?.directoriesForScenario.map(removeTypename)),
    directoriesLoading: loading
  }
}
