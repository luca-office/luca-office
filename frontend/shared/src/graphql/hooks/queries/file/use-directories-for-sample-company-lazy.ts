import {useLazyQuery} from "@apollo/client"
import {Directory} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  DirectoriesForSampleCompanyQuery,
  DirectoriesForSampleCompanyQueryVariables
} from "../../../generated/DirectoriesForSampleCompanyQuery"
import {directoriesForSampleCompanyQuery} from "../../../queries"

interface UseDirectoriesForSampleCompanyHookLazy {
  readonly directoriesForSampleCompany: Option<Directory[]>
  readonly directoriesForSampleCompanyLoading: boolean
  readonly getDirectoriesForSampleCompany: (id: UUID) => void
}

export const useDirectoriesForSampleCompanyLazy = (
  onCompleted: (res: Option<Directory[]>) => void
): UseDirectoriesForSampleCompanyHookLazy => {
  const [getFilesForSampleCompany, {data, loading}] = useLazyQuery<
    DirectoriesForSampleCompanyQuery,
    DirectoriesForSampleCompanyQueryVariables
  >(directoriesForSampleCompanyQuery, {
    onCompleted: response => onCompleted(Option.of(response?.directoriesForSampleCompany.map(removeTypename)))
  })
  return {
    directoriesForSampleCompany: Option.of(data?.directoriesForSampleCompany.map(removeTypename)),
    directoriesForSampleCompanyLoading: loading,
    getDirectoriesForSampleCompany: (id: UUID) => getFilesForSampleCompany({variables: {sampleCompanyId: id}})
  }
}
