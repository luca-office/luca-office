import {useMutation} from "@apollo/client"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {AppNotification} from "shared/models"
import {Option, useErrorHandler} from "shared/utils"
import {resetPassword, resetPasswordVariables} from "../../../../graphql/generated/resetPassword"
import {resetPasswordMutation} from "../../../../graphql/mutations"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../../routes"

export interface UseResetPasswordHook {
  readonly resetPassword: (email: string, password: string, token: string) => void
  readonly formMethods: UseFormMethods<FormData>
}

interface FormData {
  readonly password: string
  readonly passwordConfirm: string
}

export const useResetPassword = (): UseResetPasswordHook => {
  const [resetPasswordHook] = useMutation<resetPassword, resetPasswordVariables>(resetPasswordMutation, {
    errorPolicy: "all"
  })
  const formMethods = useForm<FormData>()
  const handleError = useErrorHandler()

  const dispatch = useDispatch()

  const navigate = (route: Route) => dispatch(navigateToRouteAction(route))

  const handleResetPassword = (email: string, password: string, token: string) => {
    resetPasswordHook({
      variables: {
        email,
        password,
        token
      }
    }).then(({errors}) => {
      if (errors === undefined) {
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Success,
              messageKey: "password_reset__success"
            })
          )
        )
        navigate(Route.Scenarios)
      } else {
        errors.forEach(e => handleError(e))
      }
    })
  }
  return {
    resetPassword: handleResetPassword,
    formMethods
  }
}
