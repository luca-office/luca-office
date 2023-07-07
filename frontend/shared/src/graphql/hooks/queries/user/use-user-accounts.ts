import {useQuery} from "@apollo/client"
import {UserAccount} from "../../../../models"
import {UserAccountsQuery} from "../../../generated/UserAccountsQuery"
import {userAccountsQuery} from "../../../queries"

export interface UseUserAccountsHook {
  readonly userAccounts: UserAccount[]
  readonly userAccountsLoading: boolean
}

export const useUserAccounts = (): UseUserAccountsHook => {
  const {data, loading} = useQuery<UserAccountsQuery>(userAccountsQuery)
  return {
    userAccounts: data?.userAccounts ?? [],
    userAccountsLoading: loading
  }
}
