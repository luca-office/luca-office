import * as React from "react"
import {useDispatch} from "react-redux"
import {SelectOptionCustomized} from "shared/components"
import {NotificationSeverity} from "shared/enums"
import {EmailDirectory, EmailUpdate} from "shared/graphql/generated/globalTypes"
import {AppNotification, Email} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {EmailUnreadIndicator} from "../../../../../../../../components"
import {EmailStatus} from "../../../../../../../../enums"
import {navigateToRouteAction} from "../../../../../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../../../../../redux/actions/ui/common-ui-action"
import {Route} from "../../../../../../../../routes"
import {getDirectoryOptions} from "../../../../../../utils/directory"

export interface UseEmailBodySettingsHook {
  readonly directoryOptions: SelectOptionCustomized[]
  readonly hideDelayOverlay: () => void
  readonly isDelayOverlayVisible: boolean
  readonly markerOptions: SelectOptionCustomized[]
  readonly moveEmail: (directory: EmailDirectory) => void
  readonly showDelayOverlay: () => void
}

export const useEmailBodySettings = (
  email: Email,
  updateEmail: (update: Partial<EmailUpdate>, onSuccess?: () => void) => Promise<Option<Email>>
): UseEmailBodySettingsHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()
  const [isDelayOverlayVisible, setDelayOverlayVisible] = React.useState<boolean>(false)
  const switchDirectory = (directory: EmailDirectory) =>
    dispatch(navigateToRouteAction(Route.ScenarioEmails, {scenarioId: email.scenarioId, directory, emailId: email.id}))
  const showMoveWarning = () =>
    dispatch(
      updateNotification(
        Option.of<AppNotification>({
          severity: NotificationSeverity.Warning,
          messageKey: "notification__message_email_folder_delay"
        })
      )
    )
  const moveEmail = (directory: EmailDirectory) => {
    const successFn = () => switchDirectory(directory)

    if (
      email.directory === EmailDirectory.Inbox &&
      email.receptionDelayInSeconds > 0 &&
      directory !== EmailDirectory.Inbox
    ) {
      updateEmail({directory, receptionDelayInSeconds: 0}, () => {
        showMoveWarning()
        successFn()
      })
    } else {
      updateEmail({directory}, successFn)
    }
  }
  const markerOptions = React.useMemo<SelectOptionCustomized[]>(
    () => [
      {
        value: EmailStatus.Read,
        label: t("email__status_read")
      },
      {
        value: EmailStatus.Unread,
        label: t("email__status_unread"),
        renderOptionLabel: label => <EmailUnreadIndicator text={label} />
      }
    ],
    [email]
  )

  const showDelayOverlay = () => setDelayOverlayVisible(true)
  const hideDelayOverlay = () => setDelayOverlayVisible(false)

  return {
    directoryOptions: getDirectoryOptions(t),
    hideDelayOverlay,
    isDelayOverlayVisible,
    markerOptions,
    moveEmail,
    showDelayOverlay
  }
}
