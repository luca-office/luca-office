import {useQuery} from "@apollo/client"
import {Option, removeTypename} from "shared/utils"
import {Directory} from "../../../../models"
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
    directories: data?.directoriesForScenario
      ? Option.of(data.directoriesForScenario.map(removeTypename))
      : Option.none(),
    directoriesLoading: loading
  }
}
