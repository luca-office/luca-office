import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Button} from "../../button/button"
import {Icon} from "../../icon/icon"
import {ReadonlyActionField, ReadonlyActionInputProps} from "../readonly-action-field"

const clickSpy = jest.fn()
const defaultProps: ReadonlyActionInputProps = {
  buttonLabel: "Edit",
  label: "Data",
  onClick: clickSpy,
  renderValue: () => <span>some value</span>
}

const getComponent = (props?: Partial<React.PropsWithChildren<ReadonlyActionInputProps>>) => (
  <ReadonlyActionField {...{...defaultProps, ...props}} />
)

describe("readonly-action-field", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("does not crash", () => {
    const component = getComponent({label: "", buttonLabel: "", onClick: null as any})
    const tree = shallow(component)

    expect(tree.find(Button)).toHaveLength(0)
    expect(tree.html()).toContain("some value")
    expect(tree.html()).toContain("span")
  })
  it("executes actions correctly", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.html()).toContain("Edit")
    expect(tree.html()).toContain("Data")
    expect(tree.html()).toContain("some value")
    expect(tree.html()).toContain("span")

    tree.find(Button).simulate("click")
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
  it("has disabled button", () => {
    const clickHandler = jest.fn()
    const component = getComponent({disabled: true, onClick: clickHandler})
    const tree = shallow(component)

    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Button).prop("disabled")).toBe(true)

    tree.find(Button).simulate("click")
    expect(clickHandler).toHaveBeenCalledTimes(0)
  })
})
