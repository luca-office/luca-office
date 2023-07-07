import {useQuery} from "@apollo/client"
import {SampleCompany} from "../../../../models"
import {Option} from "../../../../utils"
import {GetSampleCompanyQuery, GetSampleCompanyQueryVariables} from "../../../generated/GetSampleCompanyQuery"
import {sampleCompanyQuery} from "../../../queries"

export interface SampleCompanyProps {
  readonly sampleCompany: Option<SampleCompany>
  readonly sampleCompanyLoading: boolean
}

export const useSampleCompany = (companyId: UUID): SampleCompanyProps => {
  const {data, loading} = useQuery<GetSampleCompanyQuery, GetSampleCompanyQueryVariables>(sampleCompanyQuery, {
    variables: {id: companyId}
  })

  return {
    sampleCompany: Option.of(data?.sampleCompany),
    sampleCompanyLoading: loading
  }
}
