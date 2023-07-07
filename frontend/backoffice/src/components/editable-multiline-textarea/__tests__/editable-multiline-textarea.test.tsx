import {shallow} from "enzyme"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {create} from "react-test-renderer"
import {EditableMultilineTextarea, EditableMultilineTextareaProps} from "../editable-multiline-textarea"

const defaultProps: EditableMultilineTextareaProps = {
  onConfirm: jest.fn(),
  text: "text",
  placeholder: "Placeholder",
  disabled: false
}

const getComponent = (props?: Partial<React.PropsWithChildren<EditableMultilineTextareaProps>>) => (
  <EditableMultilineTextarea {...{...defaultProps, ...props}} />
)

describe("editable-multiline-textarea", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly disabled", () => {
    const component = getComponent({disabled: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("shows placeholder if text empty", () => {
    const component = getComponent({text: ""})
    const tree = shallow(component)

    const textArea = tree.find(".textarea")
    expect(textArea).toHaveLength(1)
    expect(textArea.props().value).toBe("Placeholder")
  })
  it("shows outside click handler", () => {
    const component = getComponent()
    const tree = shallow(component)

    const handler = tree.find(OutsideClickHandler)
    expect(handler).toHaveLength(1)
  })
})
