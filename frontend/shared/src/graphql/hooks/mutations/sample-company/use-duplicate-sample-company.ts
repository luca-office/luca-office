import {useMutation} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  DuplicateSampleCompanyMutation,
  DuplicateSampleCompanyMutationVariables
} from "../../../generated/DuplicateSampleCompanyMutation"
import {GetSampleCompaniesQuery} from "../../../generated/GetSampleCompaniesQuery"
import {duplicateSampleCompanyMutation} from "../../../mutations"
import {sampleCompaniesQuery} from "../../../queries"

export interface UseDuplicateSampleCompanyHook {
  readonly duplicateSampleCompany: (sampleCompanyId: UUID) => Promise<Option<SampleCompany>>
  readonly duplicateSampleCompanyLoading: boolean
}

export const useDuplicateSampleCompany = (): UseDuplicateSampleCompanyHook => {
  const [duplicateSampleCompany, {loading}] = useMutation<
    DuplicateSampleCompanyMutation,
    DuplicateSampleCompanyMutationVariables
  >(duplicateSampleCompanyMutation)

  return {
    duplicateSampleCompany: (sampleCompanyId: UUID) =>
      new Promise<Option<SampleCompany>>((resolve, reject) => {
        duplicateSampleCompany({
          variables: {id: sampleCompanyId},
          update: createEntityInCache<GetSampleCompaniesQuery, DuplicateSampleCompanyMutation>(
            sampleCompaniesQuery,
            "sampleCompanies",
            query => query.sampleCompanies,
            "duplicateSampleCompany"
          )
        })
          .then(result => resolve(Option.of(result.data?.duplicateSampleCompany)))
          .catch(reject)
      }),
    duplicateSampleCompanyLoading: loading
  }
}
