import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "../../../components"
import {IconName} from "../../../enums"
// eslint-disable-next-line
import {mockCalculatorButtonConfigs} from "../__mocks__/operation.mock"
import {CalculatorButtons, CalculatorButtonsProps} from "../calculator-buttons"

const defaultProps: CalculatorButtonsProps = {
  onButtonClick: jest.fn(),
  isCalculatorFocussed: true
}

describe("calculator-buttons", () => {
  it("renders correctly", () => {
    const component = <CalculatorButtons {...defaultProps} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows buttons", () => {
    const component = <CalculatorButtons {...defaultProps} />
    const tree = shallow(component)

    const buttons = tree.find(Button)
    expect(buttons).toHaveLength(21)

    expect(buttons.find(".operation-addition").prop("icon")).toEqual(IconName.Add)
    expect(buttons.find(".operation-subtraction").prop("icon")).toEqual(IconName.Subtract)
    expect(buttons.find(".operation-multiply").prop("icon")).toEqual(IconName.Close)
    expect(buttons.find(".operation-divide").prop("icon")).toEqual(IconName.Divide)
  })

  it("handles operation selection", () => {
    const mockOnButtonClick = jest.fn()
    const component = <CalculatorButtons {...defaultProps} onButtonClick={mockOnButtonClick} />
    const tree = shallow(component)

    const buttons = tree.find(Button)
    buttons.find(".operation-multiply").simulate("click", {currentTarget: {blur: jest.fn()}})
    expect(mockOnButtonClick).toHaveBeenCalledWith(mockCalculatorButtonConfigs[2].calculatorKey)
  })
})
