import {shallow} from "enzyme"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {create} from "react-test-renderer"
import {Button, TextInput} from "shared/components"
import {InputType} from "shared/enums"
import {
  InlineEditableHeader,
  InlineEditableHeaderContainerProps,
  InlineEditableHeaderProps
} from "../inline-editable-header"

const defaultProps: InlineEditableHeaderProps & InlineEditableHeaderContainerProps = {
  isEditing: false,
  isLoading: false,
  onConfirm: jest.fn(),
  setIsEditing: jest.fn(),
  setIsLoading: jest.fn(),
  setValue: jest.fn(),
  text: "Header",
  type: InputType.text,
  value: "value"
}

const getComponent = (
  props?: Partial<React.PropsWithChildren<InlineEditableHeaderProps & InlineEditableHeaderContainerProps>>
) => <InlineEditableHeader {...{...defaultProps, ...props}} />

describe("inline-editable-header", () => {
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

    const header = tree.find(TextInput)
    expect(header).toHaveLength(1)
    expect(header.prop("readOnly")).toBe(true)
  })

  it("is readonly if loading", () => {
    const component = getComponent({isLoading: true})
    const tree = shallow(component)

    const header = tree.find(TextInput)
    expect(header).toHaveLength(1)
    expect(header.prop("readOnly")).toBe(true)
  })

  it("is not readonly if not loading and editing", () => {
    const component = getComponent({isLoading: false, isEditing: true})
    const tree = shallow(component)

    const header = tree.find(TextInput)
    expect(header).toHaveLength(1)
    expect(header.prop("readOnly")).toBe(false)
  })

  it("shows outside click handler if editing", () => {
    const component = getComponent({isEditing: true})
    const tree = shallow(component)

    const handler = tree.find(OutsideClickHandler)
    expect(handler).toHaveLength(1)
    const header = tree.find(TextInput)
    expect(header).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(header.prop("readOnly")).toBe(false)
  })
  it("renders placeholder", () => {
    const component = shallow(getComponent({text: "", placeholder: "my placeholder"}))

    expect(component.html()).toContain("my placeholder")
  })
})
