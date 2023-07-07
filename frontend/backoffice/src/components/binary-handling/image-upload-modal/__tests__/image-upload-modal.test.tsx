import {shallow} from "enzyme"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {create} from "react-test-renderer"
import {Modal, Overlay} from "shared/components"
import {ImageUploadModal, ImageUploadModalProps} from "../image-upload-modal"

const defaultProps: ImageUploadModalProps = {
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  title: "Test Title",
  buttonLabelKey: "brand_name"
}

const getComponent = (props?: Partial<ImageUploadModalProps>) => <ImageUploadModal {...{...defaultProps, ...props}} />

describe("inline-editable-header", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has the correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const modal = tree.find(Modal)
    expect(modal).toHaveLength(1)

    const content = modal.dive().find(Overlay).dive().find(OutsideClickHandler).dive()
    expect(content.find("input")).toHaveLength(1)
  })
})
