import {useDispatch} from "react-redux"
import {Dispatch} from "redux"
import {useClipboard, UseClipboardOptions} from "use-clipboard-copy"
import {NotificationSeverity} from "../enums"
import {AppNotification} from "../models"
import {updateNotification} from "../redux/actions"
import {Option} from "../utils"

export interface LucaClipboardProps {
  readonly copy: (text?: any) => void
}

/**
 * Please use this in favor of useClipboard to
 * @param option
 * @returns
 */
export const useLucaClipboard = (option?: UseClipboardOptions): LucaClipboardProps => {
  const {copy} = useClipboard(option)

  const dispatch = useDispatch()

  const handleCopy = (text?: any) => {
    copy(text)
    dispatchCopyNotification(dispatch)
  }

  return {
    copy: handleCopy
  }
}

export const dispatchCopyNotification = (dispatch: Dispatch<any>) => {
  dispatch(
    updateNotification(
      Option.of<AppNotification>({
        severity: NotificationSeverity.Success,
        messageKey: "clipboard__copy_toast",
        autoHideDurationInMillis: 1500
      })
    )
  )
}
