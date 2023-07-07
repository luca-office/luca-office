import {useMutation} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {
  PublishSampleCompanyMutation,
  PublishSampleCompanyMutationVariables
} from "../../../generated/PublishSampleCompanyMutation"
import {publishSampleCompanyMutation} from "../../../mutations"

export interface UseFinalizeSampleCompanyHook {
  readonly publishSampleCompany: (id: UUID) => Promise<Option<SampleCompany>>
  readonly isPublishSampleCompanyLoading: boolean
}

export const usePublishSampleCompany = (): UseFinalizeSampleCompanyHook => {
  const [publishSampleCompanyHook, {loading}] = useMutation<
    PublishSampleCompanyMutation,
    PublishSampleCompanyMutationVariables
  >(publishSampleCompanyMutation)

  return {
    publishSampleCompany: (id: UUID) =>
      new Promise<Option<SampleCompany>>((resolve, reject) => {
        publishSampleCompanyHook({
          variables: {id}
        })
          .then(result => resolve(Option.of(result.data?.publishSampleCompany)))
          .catch(reject)
      }),
    isPublishSampleCompanyLoading: loading
  }
}
