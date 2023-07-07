import {useSelector} from "react-redux"
import {AppState} from "../../../../redux/state/app-state"

export interface TaskbarPreviewProps {
  readonly unreadEmailsCount: number
  readonly isHidden?: boolean
  readonly isDisabled?: boolean
}

export const useTaskbarPreview = () => {
  const unreadEmailsCount = useSelector<AppState, number>(
    state => state.playerPreview.player.data.emails.filter(email => !email.isRead).length
  )

  const newEmailDownloads = useSelector<AppState, number>(
    state => state.playerPreview.player.ui.filesAndDirectories.newEmailFilesCounter
  )

  return {
    unreadEmailsCount,
    newEmailDownloads
  }
}
