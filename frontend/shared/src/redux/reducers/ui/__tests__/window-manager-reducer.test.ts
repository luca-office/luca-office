import {BinaryViewerTool, OfficeTool} from "../../../../enums"
import {Option} from "../../../../utils"
import {BinaryViewerActionType, CloseBinaryAction, OpenBinaryAction} from "../../../actions/ui/binary-viewer-action"
import {
  CloseWindowAction,
  MinimizeWindowAction,
  OpenWindowAction,
  WindowManagerActionType
} from "../../../actions/ui/window-manager-action"
import {initialBinaryViewerState, initialWindowManagerState} from "../../../state/ui"
import {initialSpreadsheetViewerState} from "../../../state/ui/spreadsheet-viewer-state"
import {openBinariesMock} from "../__mocks__/open-binaries.mock"
import {windowManagerReducer} from "../window-manager-reducer"

const binary = openBinariesMock[0]

describe("window-manager-reducer", () => {
  it("should handle OpenBinaryAction", () => {
    const action: OpenBinaryAction = {
      type: BinaryViewerActionType.OpenBinary,
      payload: {binaryId: binary.id, url: binary.path, viewerType: "imageViewer", title: "hellow"}
    }

    // open image viewer on binary open
    expect(
      windowManagerReducer(initialWindowManagerState, initialBinaryViewerState, initialSpreadsheetViewerState, action)
        .openWindows
    ).toEqual([BinaryViewerTool.ImageViewer])
    // do not open new image viewer if binary already active
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [BinaryViewerTool.ImageViewer]},
        {...initialBinaryViewerState, imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}},
        initialSpreadsheetViewerState,
        action
      ).openWindows
    ).toEqual([BinaryViewerTool.ImageViewer])
  })

  it("should handle CloseBinaryAction", () => {
    const action: CloseBinaryAction = {
      type: BinaryViewerActionType.CloseBinary,
      payload: {binaryId: binary.id, viewerType: "imageViewer"}
    }

    // close image viewer on last binary close
    expect(
      windowManagerReducer(initialWindowManagerState, initialBinaryViewerState, initialSpreadsheetViewerState, action)
    ).toEqual(initialWindowManagerState)
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [BinaryViewerTool.ImageViewer]},
        {...initialBinaryViewerState, imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}},
        initialSpreadsheetViewerState,
        action
      ).openWindows
    ).toEqual(initialWindowManagerState.openWindows)

    // does not close image viewer when more than one binary is open
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [BinaryViewerTool.ImageViewer]},
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: openBinariesMock, selectedBinaryId: Option.of(openBinariesMock[0].id)}
        },
        initialSpreadsheetViewerState,
        action
      ).openWindows
    ).toEqual([BinaryViewerTool.ImageViewer])
  })

  it("should handle OpenWindowAction", () => {
    const action: OpenWindowAction = {
      type: WindowManagerActionType.OpenWindow,
      payload: {targetWindow: OfficeTool.ReferenceBookViewer}
    }

    expect(
      windowManagerReducer(initialWindowManagerState, initialBinaryViewerState, initialSpreadsheetViewerState, action)
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [action.payload.targetWindow]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer, BinaryViewerTool.ImageViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [BinaryViewerTool.ImageViewer, OfficeTool.ReferenceBookViewer]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [BinaryViewerTool.ImageViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [BinaryViewerTool.ImageViewer, OfficeTool.ReferenceBookViewer]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [OfficeTool.ReferenceBookViewer]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, minimizedWindows: [OfficeTool.ReferenceBookViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [OfficeTool.ReferenceBookViewer]
    })
  })
  it("should handle CloseWindowAction", () => {
    const action: CloseWindowAction = {
      type: WindowManagerActionType.CloseWindow,
      payload: {targetWindow: OfficeTool.ReferenceBookViewer}
    }

    expect(
      windowManagerReducer(initialWindowManagerState, initialBinaryViewerState, initialSpreadsheetViewerState, action)
    ).toEqual(initialWindowManagerState)
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, minimizedWindows: [OfficeTool.ReferenceBookViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual(initialWindowManagerState)
    expect(
      windowManagerReducer(
        {
          ...initialWindowManagerState,
          minimizedWindows: [OfficeTool.ReferenceBookViewer, OfficeTool.FileBrowser]
        },
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({...initialWindowManagerState, minimizedWindows: [OfficeTool.FileBrowser]})
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual(initialWindowManagerState)
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer, OfficeTool.FileBrowser]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({...initialWindowManagerState, openWindows: [OfficeTool.FileBrowser]})
  })
  it("should handle MinimizeWindowAction", () => {
    const action: MinimizeWindowAction = {
      type: WindowManagerActionType.MinimizeWindow,
      payload: {targetWindow: OfficeTool.ReferenceBookViewer}
    }

    expect(
      windowManagerReducer(initialWindowManagerState, initialBinaryViewerState, initialSpreadsheetViewerState, action)
    ).toEqual(initialWindowManagerState)
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [OfficeTool.ReferenceBookViewer],
      minimizedWindows: [OfficeTool.ReferenceBookViewer]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.ReferenceBookViewer, OfficeTool.FileBrowser]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [OfficeTool.ReferenceBookViewer, OfficeTool.FileBrowser],
      minimizedWindows: [OfficeTool.ReferenceBookViewer]
    })
    expect(
      windowManagerReducer(
        {...initialWindowManagerState, openWindows: [OfficeTool.FileBrowser]},
        initialBinaryViewerState,
        initialSpreadsheetViewerState,
        action
      )
    ).toEqual({
      ...initialWindowManagerState,
      openWindows: [OfficeTool.FileBrowser]
    })
  })
})
