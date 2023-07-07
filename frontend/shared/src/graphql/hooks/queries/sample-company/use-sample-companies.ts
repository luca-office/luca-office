import {useQuery} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {GetSampleCompaniesQuery} from "../../../generated/GetSampleCompaniesQuery"
import {sampleCompaniesQuery} from "../../../queries"

export interface SampleCompaniesProps {
  readonly sampleCompanies: SampleCompany[]
  readonly sampleCompaniesLoading: boolean
}

export const useSampleCompanies = (): SampleCompaniesProps => {
  const {data, loading} = useQuery<GetSampleCompaniesQuery>(sampleCompaniesQuery)

  return {
    sampleCompanies: data?.sampleCompanies ?? [],
    sampleCompaniesLoading: loading
  }
}
