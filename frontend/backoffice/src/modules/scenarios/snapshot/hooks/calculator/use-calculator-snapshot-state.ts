import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {CalculatorState} from "shared/office-tools/calculator"
import {AppState} from "../../../../../redux/state/app-state"

export const useCalculatorSnapshotState = (): CalculatorState => {
  const openWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.minimizedWindows
  )

  return {
    openWindows,
    minimizedWindows
  }
}
