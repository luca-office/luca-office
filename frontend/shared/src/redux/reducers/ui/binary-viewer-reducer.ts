import {Reducer} from "redux"
import {BinaryViewerTool} from "../../../enums"
import {Option} from "../../../utils"
import {SharedAppAction} from "../../actions/app-action"
import {BinaryViewerActionType} from "../../actions/ui/binary-viewer-action"
import {WindowManagerActionType} from "../../actions/ui/window-manager-action"
import {BinaryViewerState, initialBinaryViewerState} from "../../state/ui/binary-viewer-state"

export const binaryViewerReducer: Reducer<BinaryViewerState, SharedAppAction> = (
  state = initialBinaryViewerState,
  action
): BinaryViewerState => {
  switch (action.type) {
    case BinaryViewerActionType.OpenBinary:
      return {
        ...state,
        [action.payload.viewerType]: {
          openBinaries: [
            ...state[action.payload.viewerType].openBinaries.filter(binary => binary.id !== action.payload.binaryId),
            {
              id: action.payload.binaryId,
              path: action.payload.url,
              title: action.payload.title
            }
          ],
          selectedBinaryId: Option.of(action.payload.binaryId)
        }
      }
    case BinaryViewerActionType.SelectBinary:
      return {
        ...state,
        [action.payload.viewerType]: {
          ...state[action.payload.viewerType],
          selectedBinaryId: state[action.payload.viewerType].openBinaries.some(
            binary => binary.id === action.payload.binaryId
          )
            ? Option.of(action.payload.binaryId)
            : state[action.payload.viewerType].selectedBinaryId
        }
      }
    case BinaryViewerActionType.CloseBinary:
      // eslint-disable-next-line no-case-declarations
      const newBinaries = state[action.payload.viewerType].openBinaries.filter(
        binary => binary.id !== action.payload.binaryId
      )
      return {
        ...state,
        [action.payload.viewerType]: {
          openBinaries: newBinaries,
          selectedBinaryId: state[action.payload.viewerType].selectedBinaryId.map(binaryId => {
            if (binaryId === action.payload.binaryId) {
              return newBinaries.length ? newBinaries[newBinaries.length - 1].id : null
            }
            return binaryId
          })
        }
      }

    case WindowManagerActionType.CloseAllWindows:
      return initialBinaryViewerState

    case WindowManagerActionType.CloseWindow:
      switch (action.payload.targetWindow) {
        case BinaryViewerTool.ImageViewer:
          return {...state, imageViewer: initialBinaryViewerState.imageViewer}
        case BinaryViewerTool.PDFViewer:
          return {...state, pdfViewer: initialBinaryViewerState.pdfViewer}
        default:
          return state
      }

    default:
      return state
  }
}
