import {useLazyQuery} from "@apollo/client"
import {toFile} from "../../../../converters"
import {File} from "../../../../models"
import {Option} from "../../../../utils"
import {
  FilesForSampleCompanyQuery,
  FilesForSampleCompanyQueryVariables
} from "../../../generated/FilesForSampleCompanyQuery"
import {filesForSampleCompanyQuery} from "../../../queries"

interface UseFilesForSampleCompanyHookLazy {
  readonly filesForSampleCompany: Option<File[]>
  readonly filesForSampleCompanyCalled: boolean
  readonly filesForSampleCompanyLoading: boolean
  readonly getFilesForSampleCompany: (id: UUID) => void
}

export const useFilesForSampleCompanyLazy = (
  onCompleted?: (res: Option<File[]>) => void
): UseFilesForSampleCompanyHookLazy => {
  const [getFilesForSampleCompany, {data, loading, called}] = useLazyQuery<
    FilesForSampleCompanyQuery,
    FilesForSampleCompanyQueryVariables
  >(filesForSampleCompanyQuery, {
    onCompleted: response => onCompleted?.(Option.of(response?.filesForSampleCompany.map(toFile)))
  })
  return {
    filesForSampleCompany: Option.of((data?.filesForSampleCompany ?? []).map(toFile)),
    filesForSampleCompanyLoading: loading,
    filesForSampleCompanyCalled: called,
    getFilesForSampleCompany: (id: UUID) => getFilesForSampleCompany({variables: {sampleCompanyId: id}})
  }
}
