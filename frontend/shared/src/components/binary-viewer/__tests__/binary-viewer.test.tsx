import {ArrayInterpolation, Keyframes} from "@emotion/serialize"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {BinaryType} from "../../../enums"
import {Button, ToolsHeader, ViewerToolsSubHeader} from "../.."
import {SubheaderTab} from "../../viewer-tools/viewer-tools-sub-header/subheader-tab/subheader-tab"
import {imageBinariesMock, videoBinariesMock} from "../__mocks__/binaries.mock"
import {BinaryViewer, BinaryViewerProps} from "../binary-viewer"
import {ImageView} from "../image-view"
import {VideoView} from "../video-view"

const activateSpy = jest.fn()
const defaultProps: BinaryViewerProps = {
  type: BinaryType.Image,
  binaries: imageBinariesMock,
  onCloseViewer: jest.fn(),
  onCloseBinary: jest.fn,
  onMinimize: jest.fn,
  setActiveBinaryId: activateSpy
}

const getComponent = (props?: Partial<BinaryViewerProps>) => <BinaryViewer {...{...defaultProps, ...props}} />

describe("binary-viewer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (image)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const header = tree.find(ToolsHeader)
    expect(header).toHaveLength(1)

    const subHeader = tree.find(ViewerToolsSubHeader)
    expect(subHeader).toHaveLength(1)

    const controls = subHeader.dive().find(Button)
    expect(controls).toHaveLength(2)

    const image = tree.find(ImageView)
    expect(image).toHaveLength(1)

    const videoWrapper = tree.find(VideoView)
    expect(videoWrapper).toHaveLength(0)
  })
  it("switches binaries", () => {
    const component = getComponent()
    const tree = shallow(component)

    const subHeader = tree.find(ViewerToolsSubHeader)
    const controls = subHeader.dive().find(Button)

    expect(
      ((tree.find(ImageView).dive().find(".image").prop("css") as ArrayInterpolation<unknown>)[1] as Keyframes).styles
    ).toContain(imageBinariesMock[2].path)

    controls.at(0).simulate("click")

    expect(activateSpy).toHaveBeenCalledWith(imageBinariesMock[1].id)
  })
  it("correctly disables controls", () => {
    const component = getComponent({type: BinaryType.Video, binaries: videoBinariesMock})
    const tree = shallow(component)

    const subHeader = tree.find(ViewerToolsSubHeader)
    const controls = subHeader.dive().find(Button)

    expect(controls.at(0).prop("disabled")).toEqual(true)
    expect(controls.at(1).prop("disabled")).toEqual(true)
  })
  it("correctly disables controls (no selection handler)", () => {
    const component = getComponent({type: BinaryType.Video, setActiveBinaryId: undefined})
    const tree = shallow(component)

    const subHeader = tree.find(ViewerToolsSubHeader)
    const controls = subHeader.dive().find(Button)

    expect(controls.at(0).prop("disabled")).toEqual(true)
    expect(controls.at(1).prop("disabled")).toEqual(true)
  })
  it("correctly selects binaries", () => {
    const component = getComponent({type: BinaryType.Image, activeBinaryId: imageBinariesMock[0].id})
    const tree = shallow(component)

    const subHeader = tree.find(ViewerToolsSubHeader)
    const tabs = subHeader.dive().find(SubheaderTab)

    expect(tabs.first().prop("selected")).toEqual(true)
  })
  it("handles close", () => {
    const mockOnClose = jest.fn()
    const component = getComponent({onCloseViewer: mockOnClose, onMinimize: undefined})
    const tree = shallow(component)

    const header = tree.find(ToolsHeader)
    const close = header.dive().find(Button)
    expect(close).toHaveLength(1)

    close.simulate("click")
    expect(mockOnClose).toHaveBeenCalled()
  })
})
