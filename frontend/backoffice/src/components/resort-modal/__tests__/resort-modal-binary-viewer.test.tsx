import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ImageViewer, Overlay, VideoViewer} from "shared/components"
import {imageBinariesMock, videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {BinaryType} from "shared/enums"
import {Option} from "shared/utils"
import {ResortModalBinaryViewer, ResortModalBinaryViewerProps} from "../resort-modal-binary-viewer"

const defaultProps: ResortModalBinaryViewerProps = {
  activeBinaryId: Option.of(imageBinariesMock[0].id),
  binaries: imageBinariesMock,
  onClose: jest.fn(),
  setActiveBinaryId: jest.fn(),
  type: BinaryType.Image
}

const getComponent = (props?: Partial<ResortModalBinaryViewerProps>) => (
  <ResortModalBinaryViewer {...{...defaultProps, ...props}} />
)

describe("resort-modal-binary-viewer", () => {
  it("renders correctly (image)", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (video)", () => {
    const component = getComponent({
      type: BinaryType.Video,
      binaries: videoBinariesMock,
      activeBinaryId: Option.of(videoBinariesMock[0].id)
    })
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (image)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)
    expect(overlay.dive().find(ImageViewer)).toHaveLength(1)
  })
  it("has correct structure (video)", () => {
    const component = getComponent({
      type: BinaryType.Video,
      binaries: videoBinariesMock,
      activeBinaryId: Option.of(videoBinariesMock[0].id)
    })
    const tree = shallow(component)

    const overlay = tree.find(Overlay)
    expect(overlay).toHaveLength(1)
    expect(overlay.dive().find(VideoViewer)).toHaveLength(1)
  })
})
