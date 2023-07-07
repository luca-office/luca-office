import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteFileMutation, DeleteFileMutationVariables} from "../../../generated/DeleteFileMutation"
import {EmailFragment} from "../../../generated/EmailFragment"
import {
  FilesForSampleCompanyQuery,
  FilesForSampleCompanyQueryVariables
} from "../../../generated/FilesForSampleCompanyQuery"
import {FilesForScenarioQuery, FilesForScenarioQueryVariables} from "../../../generated/FilesForScenarioQuery"
import {deleteFileMutation} from "../../../mutations"
import {
  filesForSampleCompanyQuery,
  filesForScenarioQuery,
  sampleCompaniesQuery,
  sampleCompanyQuery
} from "../../../queries"

export const useDeleteFileFromScenario = (scenarioId: UUID): DeleteEntityHook => {
  const [deleteFile, {loading}] = useMutation<DeleteFileMutation, DeleteFileMutationVariables>(deleteFileMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteFile({
          variables: {id},
          update: deleteIdEntityFromCache<
            FilesForScenarioQuery,
            DeleteFileMutation,
            FilesForScenarioQueryVariables,
            EmailFragment
          >(filesForScenarioQuery, "filesForScenario", id, {scenarioId})
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}

export const useDeleteFileFromSampleCompany = (sampleCompanyId: UUID): DeleteEntityHook => {
  const [deleteFile, {loading}] = useMutation<DeleteFileMutation, DeleteFileMutationVariables>(deleteFileMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteFile({
          variables: {id},
          refetchQueries: [
            {query: sampleCompaniesQuery},
            {query: sampleCompanyQuery, variables: {id: sampleCompanyId}}
          ],
          update: deleteIdEntityFromCache<
            FilesForSampleCompanyQuery,
            DeleteFileMutation,
            FilesForSampleCompanyQueryVariables,
            EmailFragment
          >(filesForSampleCompanyQuery, "filesForSampleCompany", id, {sampleCompanyId})
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
