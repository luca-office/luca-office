import {FetchResult, useMutation} from "@apollo/client"
import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "../../../../enums"
import {
  RequestResetPasswordEmail,
  RequestResetPasswordEmailVariables
} from "../../../../graphql/generated/RequestResetPasswordEmail"
import {requestPasswordResetEmailMutation} from "../../../../graphql/mutations"
import {AppNotification} from "../../../../models"
import {updateNotification} from "../../../../redux/actions"
import {Option} from "../../../../utils"

export interface ResetPasswordForm {
  readonly email: string
}

export interface UseRequestResetPasswordModalHook {
  readonly formMethods: UseFormMethods<ResetPasswordForm>
  readonly requestPasswordResetEmail: (email: string) => Promise<FetchResult>
  readonly showSuccessModal: () => void
}

export const useRequestPasswordResetEmail = (): UseRequestResetPasswordModalHook => {
  const formMethods = useForm<ResetPasswordForm>()
  const dispatch = useDispatch()
  const showSuccessModal = () =>
    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          messageKey: "password_reset__mail_success",
          severity: NotificationSeverity.Success
        })
      )
    )

  const [requestPasswordResetMutation] = useMutation<RequestResetPasswordEmail, RequestResetPasswordEmailVariables>(
    requestPasswordResetEmailMutation
  )

  const handleReqeustPasswordResetMail = (email: string) => {
    return requestPasswordResetMutation({
      variables: {
        email
      }
    })
  }

  return {
    requestPasswordResetEmail: handleReqeustPasswordResetMail,
    formMethods,
    showSuccessModal
  }
}
