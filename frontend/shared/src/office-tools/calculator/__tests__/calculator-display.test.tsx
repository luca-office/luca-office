import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Text, Tooltip} from "../../../components"
import {Option} from "../../../utils"
import {CalculatorDisplay, CalculatorDisplayProps} from "../calculator-display"

const defaultProps: CalculatorDisplayProps = {
  operation: Option.of("33/3"),
  result: Option.none(),
  hasInvalidInput: false
}

const getComponent = (props?: Partial<CalculatorDisplayProps>) => <CalculatorDisplay {...{...defaultProps, ...props}} />

describe("calculator-display", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows values", () => {
    const component = getComponent({result: Option.of("11")})
    const tree = mount(component)

    expect(tree.find(Tooltip)).toHaveLength(1)

    const texts = tree.find(Text)
    expect(texts.at(0).prop("children")).toEqual("33/3")
    expect(texts.at(2).prop("children")).toEqual("11")
  })

  it("shows invalid message", () => {
    const component = getComponent({hasInvalidInput: true})
    const tree = shallow(component)

    expect(tree.find(Tooltip)).toHaveLength(1)

    const texts = tree.find(Text)
    expect(texts).toHaveLength(3)
    expect(texts.last().prop("children")).toEqual("calculator__invalid_input")
  })
})
