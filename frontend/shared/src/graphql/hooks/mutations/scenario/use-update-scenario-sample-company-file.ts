import {useMutation} from "@apollo/client"
import {ScenarioSampleCompanyFile} from "../../../../models"
import {handleApolloCacheUpdate, Option} from "../../../../utils"
import {ScenarioSampleCompanyFileUpdate} from "../../../generated/globalTypes"
import {
  ScenarioSampleCompanyFilesQuery,
  ScenarioSampleCompanyFilesQueryVariables
} from "../../../generated/ScenarioSampleCompanyFilesQuery"
import {
  UpdateScenarioSampleCompanyFileMutation,
  UpdateScenarioSampleCompanyFileMutationVariables
} from "../../../generated/UpdateScenarioSampleCompanyFileMutation"
import {updateScenarioSampleCompanyFileMutation} from "../../../mutations"
import {scenarioSampleCompanyFilesQuery} from "../../../queries"

export interface UseUpdateScenarioSampleCompanyFileHook {
  readonly updateScenarioSampleCompanyFile: (
    scenarioId: UUID,
    fileId: UUID,
    update: ScenarioSampleCompanyFileUpdate
  ) => Promise<Option<ScenarioSampleCompanyFile>>
  readonly updateScenarioSampleCompanyFileLoading: boolean
}

export const useUpdateScenarioSampleCompanyFile = (): UseUpdateScenarioSampleCompanyFileHook => {
  const [updateScenarioSampleCompanyFile, {loading}] = useMutation<
    UpdateScenarioSampleCompanyFileMutation,
    UpdateScenarioSampleCompanyFileMutationVariables
  >(updateScenarioSampleCompanyFileMutation)

  return {
    updateScenarioSampleCompanyFile: (scenarioId: UUID, fileId: UUID, update: ScenarioSampleCompanyFileUpdate) =>
      new Promise<Option<ScenarioSampleCompanyFile>>((resolve, reject) => {
        updateScenarioSampleCompanyFile({
          variables: {scenarioId, fileId, update},
          update: handleApolloCacheUpdate<
            ScenarioSampleCompanyFilesQuery,
            UpdateScenarioSampleCompanyFileMutation,
            ScenarioSampleCompanyFilesQueryVariables
          >(
            scenarioSampleCompanyFilesQuery,
            (cache, data) => {
              const update = data.updateScenarioSampleCompanyFile
              return {
                ...cache,
                ...(cache.scenarioSampleCompanyFiles
                  ? {
                      scenarioSampleCompanyFiles: [
                        ...cache.scenarioSampleCompanyFiles.filter(
                          entry => entry.fileId !== update.fileId && entry.scenarioId !== update.scenarioId
                        ),
                        update
                      ]
                    }
                  : {})
              }
            },
            "scenarioSampleCompanyFiles",
            {scenarioId}
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioSampleCompanyFile)))
          .catch(reject)
      }),
    updateScenarioSampleCompanyFileLoading: loading
  }
}
