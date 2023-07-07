import {useMutation} from "@apollo/client"
import {ScenarioSampleCompanyFile} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioSampleCompanyFileMutation,
  DeleteScenarioSampleCompanyFileMutationVariables
} from "../../../generated/DeleteScenarioSampleCompanyFileMutation"
import {
  ScenarioSampleCompanyFilesQuery,
  ScenarioSampleCompanyFilesQueryVariables
} from "../../../generated/ScenarioSampleCompanyFilesQuery"
import {deleteScenarioSampleCompanyFileMutation} from "../../../mutations"
import {scenarioSampleCompanyFilesQuery} from "../../../queries"

export interface UseDeleteScenarioSampleCompanyFileHook {
  readonly deleteScenarioSampleCompanyFile: (
    scenarioId: UUID,
    fileId: UUID
  ) => Promise<Option<ScenarioSampleCompanyFile>>
  readonly deleteScenarioSampleCompanyFileLoading: boolean
}

export const useDeleteScenarioSampleCompanyFile = (): UseDeleteScenarioSampleCompanyFileHook => {
  const [deleteScenarioSampleCompanyFile, {loading}] = useMutation<
    DeleteScenarioSampleCompanyFileMutation,
    DeleteScenarioSampleCompanyFileMutationVariables
  >(deleteScenarioSampleCompanyFileMutation)

  return {
    deleteScenarioSampleCompanyFile: (scenarioId: UUID, fileId: UUID) =>
      new Promise((resolve, reject) => {
        deleteScenarioSampleCompanyFile({
          variables: {scenarioId, fileId},
          update: deleteEntityFromCache<
            ScenarioSampleCompanyFilesQuery,
            DeleteScenarioSampleCompanyFileMutation,
            ScenarioSampleCompanyFilesQueryVariables,
            ScenarioSampleCompanyFile
          >(
            scenarioSampleCompanyFilesQuery,
            "scenarioSampleCompanyFiles",
            scenarioSampleCompanyFile =>
              scenarioSampleCompanyFile.scenarioId === scenarioId && scenarioSampleCompanyFile.fileId === fileId,
            {scenarioId}
          )
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioSampleCompanyFile)))
          .catch(reject)
      }),
    deleteScenarioSampleCompanyFileLoading: loading
  }
}
