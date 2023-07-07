import {useMutation} from "@apollo/client"
import * as React from "react"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {
  CreateUserAccountMutation,
  CreateUserAccountMutationVariables
} from "shared/graphql/generated/CreateUserAccountMutation"
import {UserAccountCreation} from "shared/graphql/generated/globalTypes"
import {createUserAccountMutation} from "shared/graphql/mutations"
import {AppNotification} from "shared/models"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {updateNotification} from "../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../routes"
import {useErrorHandler} from "../../../utils/errors"
import {Signup} from "./signup"

export const SignupContainer: React.FC = () => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  const [register, {loading: registerLoading}] = useMutation<
    CreateUserAccountMutation,
    CreateUserAccountMutationVariables
  >(createUserAccountMutation, {errorPolicy: "all"})

  const navigateToLogin = () => dispatch(navigateToRouteAction(Route.Scenarios))

  const onSubmit = (creation: UserAccountCreation) =>
    register({variables: {creation}}).then(({errors}) => {
      if (errors === undefined) {
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Success,
              titleKey: "notification__title_successful_registration",
              messageKey: "notification__message_successful_registration"
            })
          )
        )
        dispatch(navigateToRouteAction(Route.Scenarios))
      } else {
        errors?.forEach(handleError)
      }
    })

  return <Signup navigateToLogin={navigateToLogin} onSubmit={onSubmit} registerLoading={registerLoading} />
}
