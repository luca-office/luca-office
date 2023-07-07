import {useMutation} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateSampleCompanyMutation,
  CreateSampleCompanyMutationVariables
} from "../../../generated/CreateSampleCompanyMutation"
import {GetSampleCompaniesQuery} from "../../../generated/GetSampleCompaniesQuery"
import {SampleCompanyCreation} from "../../../generated/globalTypes"
import {createSampleCompanyMutation} from "../../../mutations"
import {sampleCompaniesQuery} from "../../../queries"

export interface CreateSampleCompanyProps {
  readonly createSampleCompany: (creation: SampleCompanyCreation) => Promise<Option<SampleCompany>>
  readonly isCreateSampleCompanyLoading: boolean
}

export const useCreateSampleCompany = (): CreateSampleCompanyProps => {
  const [createSampleCompany, {loading}] = useMutation<
    CreateSampleCompanyMutation,
    CreateSampleCompanyMutationVariables
  >(createSampleCompanyMutation)

  return {
    createSampleCompany: (creation: SampleCompanyCreation) =>
      new Promise<Option<SampleCompany>>((resolve, reject) => {
        createSampleCompany({
          variables: {creation},
          update: createEntityInCache<GetSampleCompaniesQuery, CreateSampleCompanyMutation>(
            sampleCompaniesQuery,
            "sampleCompanies",
            query => query.sampleCompanies,
            "createSampleCompany"
          )
        })
          .then(result => resolve(Option.of(result.data?.createSampleCompany)))
          .catch(reject)
      }),
    isCreateSampleCompanyLoading: loading
  }
}
