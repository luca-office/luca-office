import {difference} from "lodash-es"
import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {AppState} from "../redux/state/app-state"

export const useTopmostWindow = (): OfficeWindowType => {
  const topmostWindow = useSelector<AppState, OfficeWindowType>(
    state => difference(state.ui.windowManager.openWindows, state.ui.windowManager.minimizedWindows).slice(-1)[0]
  )

  return topmostWindow
}
