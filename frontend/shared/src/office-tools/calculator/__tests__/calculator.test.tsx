import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, OfficeWindow, ToolsHeader} from "../../../components"
import {Calculator, CalculatorProps} from "../calculator"

const defaultProps: CalculatorProps = {
  onKeyPress: jest.fn(),
  onClose: jest.fn(),
  isFocussed: true
}

const getComponent = (props?: Partial<CalculatorProps>) => <Calculator {...{...defaultProps, ...props}} />

describe("calculator", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("calls onClose", () => {
    const mockOnClose = jest.fn()
    const component = getComponent({onClose: mockOnClose})
    const tree = shallow(component)

    const officeWindow = tree.find(OfficeWindow)
    expect(officeWindow).toHaveLength(1)

    const header = officeWindow.dive().find(ToolsHeader)
    expect(header).toHaveLength(1)

    const headerButtons = header.dive().find(Button)
    expect(headerButtons).toHaveLength(1)

    headerButtons.at(0).simulate("click")
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
