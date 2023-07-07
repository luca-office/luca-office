import {useRef} from "react"
import {useSelector} from "react-redux"
import {LocalEmail, ParticipantData} from "shared/models"
import {EmailClientState} from "shared/office-tools/email-client"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export const useEmailClientState = (): EmailClientState => {
  const emails = useSelector<AppState, LocalEmail[]>(state => state.playerPreview.player.data.emails)
  const scenarioStartedAt = useRef(Option.of(new Date())).current

  const participantData = useSelector<AppState, Option<ParticipantData>>(
    state => state.playerPreview.player.data.common.participantData
  )
  const token = useSelector<AppState, Option<string>>(state => state.playerPreview.player.data.surveyInvitation.token)

  const availableEmailDownloadIds = useSelector<AppState, UUID[]>(
    state => state.playerPreview.player.ui.filesAndDirectories.availableEmailDownloadFiles
  )

  const availableEmailUploadFiles = useSelector<AppState, Record<UUID, UUID[]>>(
    state => state.playerPreview.player.ui.filesAndDirectories.availableEmailUploadFiles
  )

  return {
    emails,
    participantData,
    token,
    scenarioStartedAt,
    availableEmailDownloadIds,
    availableEmailUploadFiles
  }
}
