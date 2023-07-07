import * as React from "react"
import {useDispatch} from "react-redux"
import {UploadFileModal as UploadFileModalComponent, UploadFileModalProps} from "shared/components"
import {NotificationSeverity} from "shared/enums"
import {AppNotification} from "shared/models"
import {Option} from "shared/utils"
import {updateNotification, UpdateNotificationAction} from "../../redux/actions/ui/common-ui-action"

export const UploadFileModal: React.FC<UploadFileModalProps> = props => {
  const dispatch = useDispatch()

  const onBinariesUploadedFailed = () =>
    dispatch<UpdateNotificationAction>(
      updateNotification(
        Option.of<AppNotification>({
          severity: NotificationSeverity.Error,
          messageKey: "files_and_directories__upload_modal_failed_upload"
        })
      )
    )
  return <UploadFileModalComponent onBinariesUploadedFailed={onBinariesUploadedFailed} {...props} />
}
