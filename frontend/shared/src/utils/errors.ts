import {GraphQLError} from "graphql"
import {useDispatch} from "react-redux"
import {NotificationSeverity} from "../enums"
import {AppNotification} from "../models"
import {updateNotification} from "../redux/actions"
import {LucaI18nLangKey} from "../translations"
import {Option} from "../utils"

export enum LucaErrorType {
  GeneralError = "GeneralError",
  LoginFailed = "LoginFailed",
  EmailAddressAlreadyRegistered = "EmailAddressAlreadyRegistered",
  TokenAlreadyUsed = "TokenAlreadyUsed",
  UserAccountHasAlreadyParticipated = "UserAccountHasAlreadyParticipated",
  SurveyAlreadyEnded = "SurveyAlreadyEnded",
  EntityIsInUse = "EntityIsInUse",
  ResetPasswordTokensDontMatch = "ResetPasswordTokensDontMatch"
}

export const mapErrorToNotification = (error: LucaErrorType): AppNotification | null => {
  switch (error) {
    case LucaErrorType.LoginFailed:
      return {
        messageKey: "error_login_message",
        severity: NotificationSeverity.Error,
        titleKey: "error_login"
      }
    case LucaErrorType.TokenAlreadyUsed:
      return {
        messageKey: "auth__enter_code_error_survey_already_completed",
        severity: NotificationSeverity.Error
      }
    case LucaErrorType.EmailAddressAlreadyRegistered:
      return {
        messageKey: "error_sign_up_email_already_registered_message",
        severity: NotificationSeverity.Error,
        titleKey: "error_sign_up"
      }
    case LucaErrorType.GeneralError:
      return {
        messageKey: "error_general",
        severity: NotificationSeverity.Error
      }
    case LucaErrorType.UserAccountHasAlreadyParticipated:
      return {
        messageKey: "error_login_already_participated",
        severity: NotificationSeverity.Error
      }
    case LucaErrorType.SurveyAlreadyEnded:
      return {
        messageKey: "error_login_survey_already_ended",
        severity: NotificationSeverity.Error
      }
    case LucaErrorType.EntityIsInUse:
      return {
        messageKey: "error_entity_in_use",
        severity: NotificationSeverity.Error
      }
    case LucaErrorType.ResetPasswordTokensDontMatch:
      return {
        messageKey: "error_reset_password_token",
        titleKey: "error_reset_password_token_title",
        severity: NotificationSeverity.Error
      }
    default:
      return null
  }
}

export const isSpecificError = (error: LucaErrorType): boolean => mapErrorToNotification(error) !== null

export const useErrorHandler = () => {
  const dispatch = useDispatch()

  const handleError = (error: GraphQLError, customMessageKey?: LucaI18nLangKey) => {
    const errorType = error.extensions?.type as LucaErrorType
    const notification = errorType ? mapErrorToNotification(errorType) : null

    if (notification !== null) {
      dispatch(
        updateNotification(
          Option.of({
            ...notification,
            messageKey: customMessageKey !== undefined ? customMessageKey : notification.messageKey
          })
        )
      )
    }
  }

  return handleError
}
