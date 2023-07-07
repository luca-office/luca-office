import {useSelector} from "react-redux"
import {LocalEmail, ParticipantData} from "shared/models"
import {EmailClientState} from "shared/office-tools/email-client"
import {Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"

export const useEmailClientState = (): EmailClientState => {
  const emails = useSelector<AppState, LocalEmail[]>(state => state.data.emails)
  const participantData = useSelector<AppState, Option<ParticipantData>>(state => state.data.common.participantData)
  const token = useSelector<AppState, Option<string>>(state => state.data.surveyInvitation.token)
  const scenarioStartedAt = useSelector<AppState, Option<Date>>(state => state.ui.common.activeModuleStartTime)
  const availableEmailDownloadIds = useSelector<AppState, UUID[]>(
    state => state.ui.filesAndDirectories.availableEmailDownloadFiles
  )
  const availableEmailUploadFiles = useSelector<AppState, Record<UUID, UUID[]>>(
    state => state.ui.filesAndDirectories.availableEmailUploadFiles
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
