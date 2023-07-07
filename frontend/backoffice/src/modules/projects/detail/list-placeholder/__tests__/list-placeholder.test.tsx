import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Text} from "shared/components"
import {ListPlaceholder, ListPlaceholderProps} from "../list-placeholder"

const clickSpy = jest.fn()
const defaultProps: ListPlaceholderProps = {
  actionText: "action",
  text: "test text",
  onClick: clickSpy,
  title: "test title"
}

const getComponent = (props?: Partial<ListPlaceholderProps>) => <ListPlaceholder {...{...defaultProps, ...props}} />

describe("list-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Text).first().html()).toContain(defaultProps.title)
    expect(tree.find(Text).last().html()).toContain(defaultProps.text)
    expect(tree.find(Button).prop("disabled")).toBe(false)
    tree.find(Button).simulate("click")
    expect(clickSpy).toHaveBeenCalled()
  })
  it("has correct structure disabled", () => {
    const component = getComponent({disabled: true})
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Text).first().html()).toContain(defaultProps.title)
    expect(tree.find(Text).last().html()).toContain(defaultProps.text)
    expect(tree.find(Button).prop("disabled")).toBe(true)
  })
})
