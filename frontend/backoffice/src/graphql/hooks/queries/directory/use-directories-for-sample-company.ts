import {useQuery} from "@apollo/client"
import {Directory} from "shared/models"
import {Option, removeTypename} from "shared/utils"
import {
  DirectoriesForSampleCompanyQuery,
  DirectoriesForSampleCompanyQueryVariables
} from "../../../generated/DirectoriesForSampleCompanyQuery"
import {directoriesForSampleCompanyQuery} from "../../../queries"

export interface UseDirectoriesForSampleCompanyHook {
  readonly directories: Option<Directory[]>
  readonly directoriesLoading: boolean
}

export const useDirectoriesForSampleCompany = (sampleCompanyId: string): UseDirectoriesForSampleCompanyHook => {
  const {data, loading} = useQuery<DirectoriesForSampleCompanyQuery, DirectoriesForSampleCompanyQueryVariables>(
    directoriesForSampleCompanyQuery,
    {
      variables: {sampleCompanyId}
    }
  )

  return {
    directories: Option.of(data?.directoriesForSampleCompany.map(removeTypename)),
    directoriesLoading: loading
  }
}
