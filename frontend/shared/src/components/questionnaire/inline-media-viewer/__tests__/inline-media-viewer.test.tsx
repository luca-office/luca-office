import React from "react"
import {create} from "react-test-renderer"
import {imageBinariesMock} from "../../../binary-viewer/__mocks__/binaries.mock"
import {InlineMediaViewer, InlineMediaViewerProps} from "../inline-media-viewer"
import {imageFile} from "./binary-file.mock"

const defaultProps: InlineMediaViewerProps = {
  isZoomed: false,
  onZoomClicked: jest.fn(),
  binaryFile: imageFile
}

const getComponent = (props?: Partial<InlineMediaViewerProps>) => {
  return <InlineMediaViewer {...{...defaultProps, props}} />
}

describe("InlineMediaViewer", () => {
  it("renders correctly (default props)", () => {
    const component = getComponent()
    const tree = create(component)

    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (zoomed)", () => {
    const component = getComponent({isZoomed: true})
    const tree = create(component)

    expect(tree).toMatchSnapshot()
  })
})
