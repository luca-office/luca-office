import {useQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {
  UserAccountsForProjectQuery,
  UserAccountsForProjectQueryVariables
} from "../../../generated/UserAccountsForProjectQuery"
import {userAccountsForProjectQuery} from "../../../queries"

export interface UseUserAccountsForProjectHook {
  readonly userAccountsForProject: UserAccount[]
  readonly userAccountsForProjectLoading: boolean
}

export const useUserAccountsForProject = (projectId: UUID): UseUserAccountsForProjectHook => {
  const {data, loading} = useQuery<UserAccountsForProjectQuery, UserAccountsForProjectQueryVariables>(
    userAccountsForProjectQuery,
    {variables: {projectId}}
  )

  return {
    userAccountsForProject: data?.userAccountsForProject ?? [],
    userAccountsForProjectLoading: loading
  }
}
