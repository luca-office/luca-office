import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading} from "shared/components"
import {BinaryFormPlaceholder, BinaryFormPlaceholderProps} from "../../.."

const clickSpy = jest.fn()
const defaultProps: BinaryFormPlaceholderProps = {
  createText: "test create text",
  onClick: clickSpy,
  placeholderText: "placeholder"
}

const getComponent = (props?: Partial<BinaryFormPlaceholderProps>) => (
  <BinaryFormPlaceholder {...{...defaultProps, ...props}} />
)

describe("binary-form-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly readonly", () => {
    const component = getComponent({readonly: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (Image)", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".binary-form-placeholder")).toHaveLength(1)
    expect(tree.find(".logo-placeholder")).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.html()).toContain(defaultProps.createText)
    expect(tree.html()).toContain(defaultProps.placeholderText)
  })
  it("has correct structure (no image, readonly)", () => {
    const component = getComponent({readonly: true})
    const tree = shallow(component)

    expect(tree.find(".binary-form-placeholder")).toHaveLength(1)
    expect(tree.find(".logo-placeholder")).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(0)
    expect(tree.html()).not.toContain(defaultProps.createText)
    expect(tree.html()).toContain(defaultProps.placeholderText)
  })
  it("handles clicks", () => {
    const component = getComponent()
    const tree = shallow(component)

    const controls = tree.find(Heading)
    controls.simulate("click")
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
