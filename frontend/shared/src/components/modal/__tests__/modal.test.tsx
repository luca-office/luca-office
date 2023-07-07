import {shallow} from "enzyme"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {create} from "react-test-renderer"
import {Button, Heading, Icon, Overlay} from "../.."
import {Modal, ModalProps} from "../modal"

const defaultProps: ModalProps = {
  onConfirm: jest.fn(),
  title: "test",
  onDismiss: jest.fn()
}

const useComponent = (props?: Partial<ModalProps>) => (
  <Modal {...defaultProps} {...props}>
    <div className={"custom-content"} />{" "}
  </Modal>
)

describe("modal", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("executes actions correctly", () => {
    const confirmSpy = jest.fn()
    const cancelSpy = jest.fn()
    const component = shallow(useComponent({onConfirm: confirmSpy, onDismiss: cancelSpy}))

    expect(component.find(Button)).toHaveLength(2)
    component.find(".cancel-button").simulate("click")
    expect(cancelSpy).toHaveBeenCalledTimes(1)
    component.find(Icon).simulate("click")
    expect(cancelSpy).toHaveBeenCalledTimes(2)
    component.find(".confirm-button").simulate("click")
    expect(confirmSpy).toHaveBeenCalledTimes(1)
  })
  it("handles extra props", () => {
    const component = shallow(
      useComponent({
        confirmButtonDisabled: true,
        confirmButtonKey: "edit_button",
        dismissButtonKey: "close_button",
        dismissOnOutsideClick: true,
        preventSubmitOnEnter: true
      })
    )

    expect(component.find(Button)).toHaveLength(2)
    expect(component.find(".cancel-button").prop("disabled")).toBeUndefined()
    expect(component.find(".confirm-button").prop("disabled")).toBeTruthy()
    expect(component.find(".cancel-button").prop("children")).toContain("close_button")
    expect(component.find(".confirm-button").prop("children")).toContain("edit_button")
  })
})
