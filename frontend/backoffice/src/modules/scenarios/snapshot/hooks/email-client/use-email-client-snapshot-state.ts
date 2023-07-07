import {useSelector} from "react-redux"
import {LocalEmail, ParticipantData} from "shared/models"
import {EmailClientState} from "shared/office-tools/email-client"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export const useEmailClientSnapshotState = (): EmailClientState => {
  const emails = useSelector<AppState, LocalEmail[]>(state => state.playerPreview.player.data.emails)
  const token = useSelector<AppState, Option<string>>(state => state.playerPreview.player.data.surveyInvitation.token)

  const participantData = useSelector<AppState, Option<ParticipantData>>(
    state => state.playerPreview.player.data.common.participantData
  )

  const scenarioStartedAt = useSelector<AppState, Option<Date>>(
    state => state.playerPreview.player.ui.common.activeModuleStartTime
  )

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
    availableEmailUploadFiles,
    isReadOnly: true
  }
}
