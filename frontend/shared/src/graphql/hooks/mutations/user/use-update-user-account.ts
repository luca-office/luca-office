import {useMutation} from "@apollo/client"
import {PureQueryOptions} from "@apollo/client/core"
import {RefetchQueriesFunction} from "@apollo/client/react/types/types"
import {UserAccount} from "../../../../models"
import {Option} from "../../../../utils"
import {UserAccountUpdate} from "../../../generated/globalTypes"
import {
  UpdateUserAccountMutation,
  UpdateUserAccountMutationVariables
} from "../../../generated/UpdateUserAccountMutation"
import {updateUserAccountMutation} from "../../../mutations"

export interface UseUpdateUserAccountHook {
  readonly updateUserAccount: (id: UUID, update: UserAccountUpdate) => Promise<Option<UserAccount>>
  readonly updateUserAccountLoading: boolean
}

export const useUpdateUserAccount = (
  refetchQueries?: Array<string | PureQueryOptions> | RefetchQueriesFunction
): UseUpdateUserAccountHook => {
  const [updateUserAccount, {loading}] = useMutation<UpdateUserAccountMutation, UpdateUserAccountMutationVariables>(
    updateUserAccountMutation
  )

  return {
    updateUserAccount: (id: UUID, update: UserAccountUpdate) =>
      new Promise<Option<UserAccount>>((resolve, reject) => {
        updateUserAccount({variables: {id, update}, refetchQueries})
          .then(result => resolve(Option.of(result?.data?.updateUserAccount)))
          .catch(reject)
      }),
    updateUserAccountLoading: loading
  }
}
