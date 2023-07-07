import {useDispatch} from "react-redux"
import {ReferenceBookToolStateActions} from "shared/office-tools/reference-book"
import {openBinary} from "shared/redux/actions/ui/binary-viewer-action"
import {updateSelectedReferenceElementId} from "shared/redux/actions/ui-action"
import {BinaryViewerState} from "shared/redux/state/ui"
import {Option} from "shared/utils"

export const useReferenceBookToolStateActions = (): ReferenceBookToolStateActions => {
  const dispatch = useDispatch()

  return {
    updateSelectedReferenceElementId: (id: Option<UUID>) => dispatch(updateSelectedReferenceElementId(id)),
    openBinary: (binaryId: UUID, url: string, viewerType: keyof BinaryViewerState, title?: string) =>
      dispatch(openBinary(binaryId, url, viewerType, title))
  }
}
