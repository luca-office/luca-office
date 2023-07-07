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
import {FileCreation} from "../../../generated/globalTypes"
import {createFileMutation} from "../../../mutations"
import {filesForSampleCompanyQuery} from "../../../queries"

export interface UseCreateSampleCompanyFileHook {
  readonly createSampleCompanyFile: (creation: FileCreation) => Promise<Option<File>>
  readonly createSampleCompanyFileLoading: boolean
}

export const useCreateSampleCompanyFile = (sampleCompanyId: UUID): UseCreateSampleCompanyFileHook => {
  const [createFile, {loading}] = useMutation<CreateFileMutation, CreateFileMutationVariables>(createFileMutation)

  return {
    createSampleCompanyFile: (creation: FileCreation) =>
      new Promise<Option<File>>((resolve, reject) => {
        createFile({
          variables: {creation},
          update: createEntityInCache<
            FilesForSampleCompanyQuery,
            CreateFileMutation,
            FilesForSampleCompanyQueryVariables
          >(filesForSampleCompanyQuery, "filesForSampleCompany", query => query.filesForSampleCompany, "createFile", {
            sampleCompanyId
          })
        })
          .then(result => resolve(Option.of(result.data?.createFile).map(toFile)))
          .catch(reject)
      }),
    createSampleCompanyFileLoading: loading
  }
}
