import "./toastify-modified.css"
import {css} from "@emotion/react"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {Bounce, toast, ToastContainer} from "react-toastify"
import {HeadingLevel, IconName, NotificationSeverity} from "../../enums"
import {AppNotification as AppNotificationModel} from "../../models"
import {
  borderRadiusLarge,
  errorColor,
  Flex,
  fontColor,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  successColor,
  warningColor,
  zIndexNotification
} from "../../styles"
import {LucaI18nLangKey, LucaTFunction, useLucaTranslation} from "../../translations"
import {Option} from "../../utils"
import {Heading, Icon, Text} from ".."

export interface AppNotificationProps {
  readonly notification: Option<AppNotificationModel>
}

interface ContentProps {
  readonly notification: Option<AppNotificationModel>
  readonly hideNotification: () => void
}

const NotificationContent: React.FC<ContentProps> = ({notification: notificationOption, hideNotification}) => {
  const {t} = useLucaTranslation()
  return notificationOption
    .map(notification => {
      const layout = getSeverityConfig(notification.severity, t)
      const styles = getStyles(layout.color)
      const title = t(notification.titleKey as LucaI18nLangKey) || layout.title
      return (
        <div css={styles.notification}>
          <Icon name={IconName.Close} customStyles={styles.icon} onClick={hideNotification} />
          <div css={styles.content}>
            {title && (
              <Heading level={HeadingLevel.h3} customStyles={styles.title}>
                {title}
              </Heading>
            )}
            <Text>{t(notification.messageKey, notification.messageKeyLangOptions)}</Text>
          </div>
        </div>
      )
    })
    .orNull()
}

export const AppNotification: React.FC<AppNotificationProps> = ({notification: notificationOption}) => {
  const toastId = React.useRef<React.ReactText | null>(null)

  const getAutoCloseInMillis = (notification: AppNotificationModel) =>
    notification.autoHideDurationInMillis !== undefined ? notification.autoHideDurationInMillis : 5000

  const dismissNotification = (toastId: React.ReactText | null) => {
    if (toastId !== null) {
      toast.dismiss(toastId)
    }
  }

  const hideNotification = () => dismissNotification(toastId.current)

  React.useEffect(() => {
    const currentToastId = toastId.current

    window.setTimeout(() => {
      dismissNotification(currentToastId)
    }, 250)

    notificationOption.forEach(notification => {
      toastId.current = toast(
        <NotificationContent notification={notificationOption} hideNotification={hideNotification} />,
        {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: notification.severity === NotificationSeverity.Error ? false : getAutoCloseInMillis(notification),
          draggable: false,
          transition: Bounce
        }
      )
    })
  }, [notificationOption])

  return (
    <OutsideClickHandler
      onOutsideClick={() =>
        notificationOption.forEach(notification => {
          if (notification.severity !== NotificationSeverity.Error) {
            hideNotification()
          }
        })
      }>
      <ToastContainer />
    </OutsideClickHandler>
  )
}

const getSeverityConfig = (severity: NotificationSeverity, t: LucaTFunction) => {
  switch (severity) {
    case NotificationSeverity.Success:
      return {color: successColor, title: t("notification__success")}
    case NotificationSeverity.Warning:
      return {color: warningColor, title: t("notification__warning")}
    case NotificationSeverity.Error:
      return {color: errorColor, title: t("notification__error")}
    case NotificationSeverity.Info:
    default:
      return {color: fontColor, title: undefined}
  }
}

const getStyles = (mainColor: string) => ({
  wrapper: css({
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100vw",
    height: "20vh",
    zIndex: zIndexNotification,
    background: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(46, 48, 50, 0.1) 100%)"
  }),
  notification: css(Flex.row, {
    width: "50vw",
    padding: spacingSmall,
    marginBottom: spacingTinier,
    border: `1px solid ${mainColor}`,
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.24)",
    backgroundColor: "white",
    borderRadius: borderRadiusLarge
  }),
  title: css({
    color: mainColor
  }),
  icon: css({
    margin: spacing(0, spacingMedium, 0, spacingSmall),
    overflow: "auto"
  }),
  content: css(Flex.column, {
    flex: 1
  })
})
