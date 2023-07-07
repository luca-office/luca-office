import {shallow} from "enzyme"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {create} from "react-test-renderer"
import {Button} from "shared/components"
import {
  InlineEditableTextarea,
  InlineEditableTextareaContainerProps,
  InlineEditableTextareaProps
} from "../inline-editable-textarea"

const defaultProps: InlineEditableTextareaProps & InlineEditableTextareaContainerProps = {
  onConfirm: jest.fn(),
  text: "Header",
  isEditing: false,
  setIsEditing: jest.fn(),
  value: "test value",
  setValue: jest.fn()
}

const getComponent = (
  props?: Partial<React.PropsWithChildren<InlineEditableTextareaProps & InlineEditableTextareaContainerProps>>
) => <InlineEditableTextarea {...{...defaultProps, ...props}} />

describe("inline-editable-textarea", () => {
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
  it("shows heading if not editing", () => {
    const component = getComponent({isEditing: false})
    const tree = shallow(component)

    const header = tree.find(".textarea")
    expect(header).toHaveLength(1)
    expect(header.prop("contentEditable")).toBe(false)
  })
  it("shows outside click handler if  editing", () => {
    const component = getComponent({isEditing: true})
    const tree = shallow(component)

    const handler = tree.find(OutsideClickHandler)
    expect(handler).toHaveLength(1)
    const header = tree.find(".textarea")
    expect(header).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(header.prop("contentEditable")).toBe(true)
  })
})
