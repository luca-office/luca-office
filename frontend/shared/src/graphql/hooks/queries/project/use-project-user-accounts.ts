import {useQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {ProjectUserAccountsQuery, ProjectUserAccountsQueryVariables} from "../../../generated/ProjectUserAccountsQuery"
import {projectUserAccountsQuery} from "../../../queries"

export interface ProjectUserAccountsHook {
  readonly projectUserAccounts: Option<UserAccount[]>
  readonly projectUserAccountsLoading: boolean
}

export const useProjectUserAccounts = (projectId: UUID): ProjectUserAccountsHook => {
  const {data, loading} = useQuery<ProjectUserAccountsQuery, ProjectUserAccountsQueryVariables>(
    projectUserAccountsQuery,
    {
      variables: {projectId}
    }
  )

  return {
    projectUserAccounts: Option.of(data?.userAccountsForProject?.map(removeTypename) as UserAccount[]),
    projectUserAccountsLoading: loading
  }
}
