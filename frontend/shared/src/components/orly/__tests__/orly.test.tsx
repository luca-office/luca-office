import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal} from "../../modal/modal"
import {Overlay} from "../../overlay/overlay"
import {ReactPortal} from "../../react-portal/react-portal"
import {Heading, Text} from "../../typography/typography"
import {Orly, OrlyProps} from "../orly"

const defaultProps: OrlyProps = {
  onConfirm: jest.fn(),
  onDismiss: jest.fn()
}

const getComponent = (props?: Partial<OrlyProps>) => <Orly {...{...defaultProps, ...props}} />

describe("orly", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (custom labels)", () => {
    const component = getComponent({
      titleKey: "erp__dialog_delete_dataset_title",
      textKey: "erp__dialog_delete_dataset_description"
    })
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(ReactPortal)).toHaveLength(1)

    const modal = tree.find(Modal)
    expect(modal).toHaveLength(1)

    const overlay = modal.dive().find(Overlay)
    expect(overlay).toHaveLength(1)

    const overlayContent = overlay.dive()

    const header = overlayContent.find(Heading)
    expect(header).toHaveLength(1)
    expect(header.html()).toContain("dialog__delete_element_title")

    const text = overlayContent.find(Text)
    expect(text).toHaveLength(1)
    expect(text.html()).toContain("dialog__delete_element_text")
  })
  it("has correct structure (custom labels)", () => {
    const component = getComponent({
      titleKey: "erp__dialog_delete_dataset_title",
      textKey: "erp__dialog_delete_dataset_description"
    })
    const tree = shallow(component)

    expect(tree.find(ReactPortal)).toHaveLength(1)

    const modal = tree.find(Modal)
    expect(modal).toHaveLength(1)

    const overlay = modal.dive().find(Overlay)
    expect(overlay).toHaveLength(1)

    const overlayContent = overlay.dive()

    const header = overlayContent.find(Heading)
    expect(header).toHaveLength(1)
    expect(header.html()).toContain("erp__dialog_delete_dataset_title")

    const text = overlayContent.find(Text)
    expect(text).toHaveLength(1)
    expect(text.html()).toContain("erp__dialog_delete_dataset_description")
  })
})
