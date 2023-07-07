import {useQuery} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {FilesForScenarioQuery, FilesForScenarioQueryVariables} from "../../../generated/FilesForScenarioQuery"
import {filesForScenarioQuery} from "../../../queries"

export interface UseFilesForScenarioHook {
  readonly files: Option<File[]>
  readonly filesLoading: boolean
}

export const useFilesForScenario = (scenarioId: string, skip?: boolean): UseFilesForScenarioHook => {
  const {data, loading} = useQuery<FilesForScenarioQuery, FilesForScenarioQueryVariables>(filesForScenarioQuery, {
    variables: {scenarioId},
    skip
  })
  return {
    files: Option.of(data?.filesForScenario?.map(toFile)),
    filesLoading: loading
  }
}
