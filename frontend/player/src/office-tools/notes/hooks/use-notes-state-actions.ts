import {useDispatch} from "react-redux"
import {NotesContainerStateActions} from "shared/office-tools"
import {updateNotesAction} from "shared/redux/actions"
import {NotesState} from "shared/redux/state/data"

export const useNotesStateActions = (): NotesContainerStateActions => {
  const dispatch = useDispatch()

  const updateNotes = (note: NotesState) => dispatch(updateNotesAction(note))

  return {updateNotes}
}
