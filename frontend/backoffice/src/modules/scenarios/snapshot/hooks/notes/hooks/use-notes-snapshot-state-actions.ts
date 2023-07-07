import {noop} from "lodash-es"
import {NotesContainerStateActions} from "shared/office-tools"

export const useNotesSnapshotStateActions = (): NotesContainerStateActions => {
  return {updateNotes: noop}
}
