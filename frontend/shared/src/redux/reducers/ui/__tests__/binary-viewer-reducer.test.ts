import {Option} from "../../../../utils"
import {
  BinaryViewerActionType,
  CloseBinaryAction,
  OpenBinaryAction,
  SelectBinaryAction
} from "../../../actions/ui/binary-viewer-action"
import {initialBinaryViewerState} from "../../../state/ui"
import {openBinariesMock} from "../__mocks__/open-binaries.mock"
import {binaryViewerReducer} from "../binary-viewer-reducer"

const binary = openBinariesMock[0]
const binary2 = openBinariesMock[1]

describe("binary-viewer-reducer", () => {
  it("should handle OpenBinaryAction", () => {
    const action: OpenBinaryAction = {
      type: BinaryViewerActionType.OpenBinary,
      payload: {binaryId: binary.id, url: binary.path, viewerType: "imageViewer", title: binary.title}
    }

    // correctly opens
    expect(binaryViewerReducer(initialBinaryViewerState, action).imageViewer.openBinaries).toEqual([binary])
    expect(binaryViewerReducer(initialBinaryViewerState, action).imageViewer.selectedBinaryId.orNull()).toEqual(
      binary.id
    )

    // does not open twice
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual([binary])
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)

    // opens another
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual([binary2, binary])
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)

    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary, binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual([binary2, binary])
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary, binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)
  })

  it("should handle CloseBinary", () => {
    const action: CloseBinaryAction = {
      type: BinaryViewerActionType.CloseBinary,
      payload: {binaryId: binary.id, viewerType: "imageViewer"}
    }

    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary, binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual([binary2])
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary, binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary2.id)

    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual(initialBinaryViewerState.imageViewer.openBinaries)
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toBeNull()

    // does nothing is image is not opened
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.openBinaries
    ).toEqual([binary2])
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary2.id)

    expect(binaryViewerReducer(initialBinaryViewerState, action).imageViewer.openBinaries).toEqual(
      initialBinaryViewerState.imageViewer.openBinaries
    )
    expect(binaryViewerReducer(initialBinaryViewerState, action).imageViewer.selectedBinaryId.orNull()).toEqual(
      initialBinaryViewerState.imageViewer.selectedBinaryId.orNull()
    )
  })

  it("should handle SelectBinaryAction", () => {
    const action: SelectBinaryAction = {
      type: BinaryViewerActionType.SelectBinary,
      payload: {binaryId: binary.id, viewerType: "imageViewer"}
    }

    // correctly opens
    expect(
      binaryViewerReducer(
        {...initialBinaryViewerState, imageViewer: {...initialBinaryViewerState.imageViewer, openBinaries: [binary]}},
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)

    // does not open twice
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary], selectedBinaryId: Option.of(binary.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)

    // does not select if not open
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary2.id)

    // selects correctly
    expect(
      binaryViewerReducer(
        {
          ...initialBinaryViewerState,
          imageViewer: {openBinaries: [binary, binary2], selectedBinaryId: Option.of(binary2.id)}
        },
        action
      ).imageViewer.selectedBinaryId.orNull()
    ).toEqual(binary.id)
  })
})
