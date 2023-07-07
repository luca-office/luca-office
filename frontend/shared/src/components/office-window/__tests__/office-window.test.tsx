import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../enums"
import {Button, OfficeWindow, ToolsHeader} from "../.."

const requiredProps = {
  icon: IconName.Email,
  label: "E-Mails"
}

const fullProps = {
  ...requiredProps,
  onClose: jest.fn(),
  onMinimize: jest.fn()
}

describe("office-window", () => {
  it("renders correctly with required props", () => {
    const officeWindow = <OfficeWindow {...requiredProps} />
    const tree = create(officeWindow).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with full props", () => {
    const officeWindow = <OfficeWindow {...fullProps} />
    const tree = create(officeWindow).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders the close button if close handler is defined", () => {
    const onCloseMock = jest.fn()
    const tree = shallow(<OfficeWindow {...requiredProps} onClose={onCloseMock} />)

    const header = tree.find(ToolsHeader)
    expect(header).toHaveLength(1)

    const headerButtons = header.dive().find(Button)
    expect(headerButtons).toHaveLength(1)

    headerButtons.at(0).simulate("click")
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
  it("renders the minimize text button if minimize handler is defined", () => {
    const onMinimizeMock = jest.fn()
    const tree = shallow(<OfficeWindow {...requiredProps} onMinimize={onMinimizeMock} />)

    const header = tree.find(ToolsHeader)
    expect(header).toHaveLength(1)

    const headerButtons = header.dive().find(Button)
    expect(headerButtons).toHaveLength(1)

    headerButtons.at(0).simulate("click")
    expect(onMinimizeMock).toHaveBeenCalledTimes(1)
  })
})
