import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {BinaryType} from "../../../../enums"
import {Option} from "../../../../utils"
import {BinaryViewer} from "../../../binary-viewer"
import {imageBinariesMock} from "../../../binary-viewer/__mocks__/binaries.mock"
import {UploadBinaryViewer, UploadBinaryViewerProps} from "../upload-binary-viewer"

const defaultProps: UploadBinaryViewerProps = {
  type: BinaryType.Image,
  onClose: jest.fn(),
  binaries: imageBinariesMock,
  activeBinaryId: Option.of(imageBinariesMock[0].id),
  setActiveBinaryId: jest.fn()
}

const getComponent = (props?: Partial<UploadBinaryViewerProps>) => (
  <UploadBinaryViewer {...{...defaultProps, ...props}} />
)

describe("upload-binary-viewer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component)
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(BinaryViewer)).toHaveLength(1)
  })
})
