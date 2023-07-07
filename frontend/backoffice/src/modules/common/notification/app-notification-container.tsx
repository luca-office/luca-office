import * as React from "react"
import {useSelector} from "react-redux"
import {AppNotification} from "shared/components"
import {AppNotification as AppNotificationModel} from "shared/models"
import {Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"

export const AppNotificationContainer: React.FC = () => {
  const notification = useSelector<AppState, Option<AppNotificationModel>>(state => state.ui.common.notification)

  return <AppNotification notification={notification} />
}
