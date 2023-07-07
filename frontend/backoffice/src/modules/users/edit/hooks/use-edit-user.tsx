import {PureQueryOptions, RefetchQueriesFunction} from "@apollo/client"
import {UserAccountUpdate} from "shared/graphql/generated/globalTypes"
import {useCheckLogin, useUpdateUserAccount} from "shared/graphql/hooks"
import {UserAccountForLogin} from "shared/models"
import {Option} from "shared/utils"
import {UserAccount} from "../../../../models"

export interface UseEditUserHook {
  readonly userAccount: Option<UserAccountForLogin>
  readonly updateAccount: (id: UUID, update: UserAccountUpdate) => Promise<Option<UserAccount>>
  readonly updateLoading: boolean
}

export const useEditUser = (
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction | undefined
): UseEditUserHook => {
  const {account: userAccount} = useCheckLogin()
  const {updateUserAccount, updateUserAccountLoading} = useUpdateUserAccount(refetchQueries)

  return {
    updateAccount: (id: UUID, update: UserAccountUpdate) => updateUserAccount(id, update),
    updateLoading: updateUserAccountLoading,
    userAccount
  }
}
