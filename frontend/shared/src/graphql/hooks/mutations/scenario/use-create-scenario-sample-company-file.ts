import {useMutation} from "@apollo/client"
import {ScenarioSampleCompanyFile} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioSampleCompanyFileMutation,
  CreateScenarioSampleCompanyFileMutationVariables
} from "../../../generated/CreateScenarioSampleCompanyFileMutation"
import {ScenarioSampleCompanyFileCreation} from "../../../generated/globalTypes"
import {
  ScenarioSampleCompanyFilesQuery,
  ScenarioSampleCompanyFilesQueryVariables
} from "../../../generated/ScenarioSampleCompanyFilesQuery"
import {createScenarioSampleCompanyFileMutation} from "../../../mutations"
import {scenarioSampleCompanyFilesQuery} from "../../../queries"

export interface UseCreateScenarioSampleCompanyFileHook {
  readonly createScenarioSampleCompanyFile: (
    creation: ScenarioSampleCompanyFileCreation
  ) => Promise<Option<ScenarioSampleCompanyFile>>
  readonly createScenarioSampleCompanyFileLoading: boolean
}

export const useCreateScenarioSampleCompanyFile = (): UseCreateScenarioSampleCompanyFileHook => {
  const [createScenarioSampleCompanyFile, {loading}] = useMutation<
    CreateScenarioSampleCompanyFileMutation,
    CreateScenarioSampleCompanyFileMutationVariables
  >(createScenarioSampleCompanyFileMutation)

  return {
    createScenarioSampleCompanyFile: (creation: ScenarioSampleCompanyFileCreation) =>
      new Promise<Option<ScenarioSampleCompanyFile>>((resolve, reject) => {
        createScenarioSampleCompanyFile({
          variables: {creation},
          update: createEntityInCache<
            ScenarioSampleCompanyFilesQuery,
            CreateScenarioSampleCompanyFileMutation,
            ScenarioSampleCompanyFilesQueryVariables
          >(
            scenarioSampleCompanyFilesQuery,
            "scenarioSampleCompanyFiles",
            query => query.scenarioSampleCompanyFiles,
            "createScenarioSampleCompanyFile",
            {scenarioId: creation.scenarioId}
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioSampleCompanyFile)))
          .catch(reject)
      }),
    createScenarioSampleCompanyFileLoading: loading
  }
}
