import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {NotesContainerState} from "shared/office-tools"
import {NotesState} from "shared/redux/state/data"
import {AppState} from "../../../redux/state/app-state"

export const useNotesState = (): NotesContainerState => {
  const openWindows = useSelector<AppState, OfficeWindowType[]>(state => state.ui.windowManager.openWindows)
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(state => state.ui.windowManager.minimizedWindows)
  const note = useSelector<AppState, NotesState>(state => state.data.notes)

  return {openWindows, minimizedWindows, note}
}
