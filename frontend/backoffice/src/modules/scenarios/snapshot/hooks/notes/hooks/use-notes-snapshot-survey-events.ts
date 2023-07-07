import {noop} from "lodash-es"
import {NotesContainerSurveyEvents} from "shared/office-tools"

export const useNotesSnapshotSurveyEvents = (): NotesContainerSurveyEvents => {
  return {sendUpdateNotesTextEvent: noop}
}
