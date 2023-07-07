import {useMutation} from "@apollo/client"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {AppNotification, UserAccount} from "shared/models"
import {updateNotification} from "shared/redux/actions/ui-action"
import {Option, useErrorHandler} from "shared/utils"
import {
  CreateUserAccountMutation,
  CreateUserAccountMutationVariables
} from "../../../../graphql/generated/CreateUserAccountMutation"
import {UserAccountCreation} from "../../../../graphql/generated/globalTypes"
import {createUserAccountMutation} from "../../../../graphql/mutations"

export interface UseSignUpModalHook {
  readonly signUp: (creation: UserAccountCreation) => Promise<unknown>
  readonly signUpLoading: boolean
}

export const useSignUpModal = (): UseSignUpModalHook => {
  const [register, {loading: registerLoading}] = useMutation<
    CreateUserAccountMutation,
    CreateUserAccountMutationVariables
  >(createUserAccountMutation, {errorPolicy: "all"})

  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  return {
    signUp: (creation: UserAccountCreation) =>
      new Promise<Option<UserAccount>>(resolve => {
        register({variables: {creation}}).then(({data, errors}) => {
          if (errors === undefined) {
            dispatch(
              updateNotification(
                Option.of<AppNotification>({
                  messageKey: "auth__successful_sign_up",
                  severity: NotificationSeverity.Success
                })
              )
            )

            resolve(data?.createUserAccount ? Option.of(data.createUserAccount as UserAccount) : Option.none())
          } else {
            errors.forEach(error => handleError(error))
          }
        })
      }),
    signUpLoading: registerLoading
  }
}
