import {useQuery} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {
  FilesForSampleCompanyQuery,
  FilesForSampleCompanyQueryVariables
} from "../../../generated/FilesForSampleCompanyQuery"
import {filesForSampleCompanyQuery} from "../../../queries"

export interface UseFilesForSampleCompanyHook {
  readonly files: Option<File[]>
  readonly filesLoading: boolean
}

export const useFilesForSampleCompany = (sampleCompanyId: string, skip = false): UseFilesForSampleCompanyHook => {
  const {data, loading} = useQuery<FilesForSampleCompanyQuery, FilesForSampleCompanyQueryVariables>(
    filesForSampleCompanyQuery,
    {
      variables: {sampleCompanyId},
      skip
    }
  )
  return {
    files: Option.of((data?.filesForSampleCompany ?? []).map(toFile)),
    filesLoading: loading
  }
}
