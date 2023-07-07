import {useLazyQuery} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {GetSampleCompanyQuery, GetSampleCompanyQueryVariables} from "../../../generated/GetSampleCompanyQuery"
import {sampleCompanyQuery} from "../../../queries"

export interface SampleCompanyLazyProps {
  readonly sampleCompany: Option<SampleCompany>
  readonly sampleCompanyLoading: boolean
  readonly getSampleCompany: (sampleCompanyId: UUID) => void
}

export const useSampleCompanyLazy = (): SampleCompanyLazyProps => {
  const [getSampleCompany, {data, loading}] = useLazyQuery<GetSampleCompanyQuery, GetSampleCompanyQueryVariables>(
    sampleCompanyQuery
  )

  return {
    sampleCompany: Option.of(data?.sampleCompany),
    sampleCompanyLoading: loading,
    getSampleCompany: (sampleCompanyId: UUID) => getSampleCompany({variables: {id: sampleCompanyId}})
  }
}
