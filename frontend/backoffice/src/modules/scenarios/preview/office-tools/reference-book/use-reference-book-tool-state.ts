import {useSelector} from "react-redux"
import {OfficeWindowType} from "shared/enums"
import {ReferenceBookToolState} from "shared/office-tools"
import {Option} from "shared/utils"
import {AppState} from "../../../../../redux/state/app-state"

export const useReferenceBookToolState = (): ReferenceBookToolState => {
  const selectedElementId = useSelector<AppState, Option<string>>(
    state => state.playerPreview.player.ui.common.selectedReferenceElementId
  )

  const openWindows = useSelector<AppState, Array<OfficeWindowType>>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )

  return {
    selectedElementId,
    openWindows
  }
}
