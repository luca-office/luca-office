import {useLazyQuery} from "@apollo/client"
import {Directory} from "shared/models"
import {Option, removeTypename} from "shared/utils"
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

export const useDirectoriesForSampleCompanyLazy = (): UseDirectoriesForSampleCompanyHookLazy => {
  const [getDirectoriesForSampleCompany, {data, loading}] = useLazyQuery<
    DirectoriesForSampleCompanyQuery,
    DirectoriesForSampleCompanyQueryVariables
  >(directoriesForSampleCompanyQuery)

  return {
    directoriesForSampleCompany: Option.of(data?.directoriesForSampleCompany.map(removeTypename)),
    directoriesForSampleCompanyLoading: loading,
    getDirectoriesForSampleCompany: (id: UUID) => getDirectoriesForSampleCompany({variables: {sampleCompanyId: id}})
  }
}
