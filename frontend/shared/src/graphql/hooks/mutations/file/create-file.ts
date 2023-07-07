import {useMutation} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CreateFileMutation, CreateFileMutationVariables} from "../../../generated/CreateFileMutation"
import {
  FilesForSampleCompanyQuery,
  FilesForSampleCompanyQueryVariables
} from "../../../generated/FilesForSampleCompanyQuery"
import {FilesForScenarioQuery, FilesForScenarioQueryVariables} from "../../../generated/FilesForScenarioQuery"
import {FileCreation} from "../../../generated/globalTypes"
import {createFileMutation} from "../../../mutations"
import {filesForSampleCompanyQuery, filesForScenarioQuery} from "../../../queries"

export interface UseCreateFileHook {
  readonly createFile: (creation: FileCreation) => Promise<Option<File>>
  readonly createFileLoading: boolean
}

interface UseCreateFileParams {
  readonly scenarioId?: UUID
  readonly sampleCompanyId?: UUID
}

// scenario id can be null, if file does not belong to an scenario
export const useCreateFile = (params?: UseCreateFileParams): UseCreateFileHook => {
  const [createFile, {loading}] = useMutation<CreateFileMutation, CreateFileMutationVariables>(createFileMutation)

  return {
    createFile: (creation: FileCreation) =>
      new Promise<Option<File>>((resolve, reject) => {
        createFile({
          variables: {creation},
          update: params
            ? params.scenarioId
              ? createEntityInCache<FilesForScenarioQuery, CreateFileMutation, FilesForScenarioQueryVariables>(
                  filesForScenarioQuery,
                  "filesForScenario",
                  query => query.filesForScenario,
                  "createFile",
                  {scenarioId: params.scenarioId}
                )
              : params.sampleCompanyId
              ? createEntityInCache<
                  FilesForSampleCompanyQuery,
                  CreateFileMutation,
                  FilesForSampleCompanyQueryVariables
                >(
                  filesForSampleCompanyQuery,
                  "filesForSampleCompany",
                  query => query.filesForSampleCompany,
                  "createFile",
                  {sampleCompanyId: params.sampleCompanyId}
                )
              : undefined
            : undefined
        })
          .then(result => resolve(Option.of(result.data?.createFile).map(toFile)))
          .catch(reject)
      }),
    createFileLoading: loading
  }
}
