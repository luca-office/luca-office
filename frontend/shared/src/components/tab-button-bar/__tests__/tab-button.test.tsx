import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {TabButton} from "../tab-button"

const requiredProps = {
  onClick: jest.fn(),
  isActive: false,
  icon: IconName.Trash,
  label: "Papierkorb"
}

describe("tab-button", () => {
  it("renders correctly with required props", () => {
    const button = <TabButton {...requiredProps} />
    const tree = create(button).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly in active state", () => {
    const button = <TabButton {...requiredProps} isActive={true} />
    const tree = create(button).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("render correctly in disabled state", () => {
    const button = <TabButton {...requiredProps} isDisabled={true} />
    const tree = create(button).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("does correctly call onClick handler", () => {
    const onClick = jest.fn()
    const button = <TabButton {...requiredProps} onClick={onClick} />

    const tree = shallow(button)
    tree.simulate("click")
    expect(onClick).toBeCalledTimes(1)
  })

  it("does not call onClick when disabled", () => {
    const onClick = jest.fn()
    const button = <TabButton {...requiredProps} onClick={onClick} isDisabled={true} />

    const tree = shallow(button)
    tree.simulate("click")
    expect(onClick).toBeCalledTimes(0)
  })
})
