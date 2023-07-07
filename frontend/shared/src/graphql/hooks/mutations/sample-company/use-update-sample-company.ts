import {useMutation} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {SampleCompanyUpdate} from "../../../generated/globalTypes"
import {
  UpdateSampleCompanyMutation,
  UpdateSampleCompanyMutationVariables
} from "../../../generated/UpdateSampleCompanyMutation"
import {updateSampleCompanyMutation} from "../../../mutations"

export interface UseUpdateSampleCompanyHook {
  readonly updateSampleCompany: (id: UUID, update: SampleCompanyUpdate) => Promise<Option<SampleCompany>>
  readonly updateSampleCompanyLoading: boolean
}

export const useUpdateSampleCompany = (): UseUpdateSampleCompanyHook => {
  const [updateSampleCompany, {loading}] = useMutation<
    UpdateSampleCompanyMutation,
    UpdateSampleCompanyMutationVariables
  >(updateSampleCompanyMutation)

  return {
    updateSampleCompany: (id: UUID, update: SampleCompanyUpdate) =>
      new Promise<Option<SampleCompany>>((resolve, reject) => {
        updateSampleCompany({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateSampleCompany)))
          .catch(reject)
      }),
    updateSampleCompanyLoading: loading
  }
}
