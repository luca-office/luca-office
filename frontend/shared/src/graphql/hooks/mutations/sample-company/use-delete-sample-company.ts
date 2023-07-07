import {useMutation} from "@apollo/client"
import {DeleteEntityHook, SampleCompany} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {
  DeleteSampleCompanyMutation,
  DeleteSampleCompanyMutationVariables
} from "../../../generated/DeleteSampleCompanyMutation"
import {GetSampleCompaniesQuery} from "../../../generated/GetSampleCompaniesQuery"
import {deleteSampleCompanyMutation} from "../../../mutations"
import {sampleCompaniesQuery} from "../../../queries"

export const useDeleteSampleCompany = (): DeleteEntityHook => {
  const [deleteSampleCompany, {loading}] = useMutation<
    DeleteSampleCompanyMutation,
    DeleteSampleCompanyMutationVariables
  >(deleteSampleCompanyMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteSampleCompany({
          variables: {id},
          update: deleteIdEntityFromCache<GetSampleCompaniesQuery, DeleteSampleCompanyMutation, unknown, SampleCompany>(
            sampleCompaniesQuery,
            "sampleCompanies",
            id
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
