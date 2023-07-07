import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, OfficeWindow, TextArea, ToolsHeader} from "../../../components"
import {Notes, NotesProps} from "../notes"

const defaultProps: NotesProps = {
  onClose: jest.fn(),
  onMinimize: jest.fn(),
  text: "hallo",
  updateNotes: jest.fn()
}

const getComponent = (props?: Partial<NotesProps>) => <Notes {...{...defaultProps, ...props}} />

function mockLodash() {
  return {
    ...jest.requireActual("lodash-es"),
    debounce: (cb: any) => cb
  }
}

jest.mock("lodash-es", () => mockLodash())

describe("notes", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("calls onClose and onMinimize", () => {
    const mockOnClose = jest.fn()
    const mockOnMinimize = jest.fn()
    const component = getComponent({onClose: mockOnClose, onMinimize: mockOnMinimize})
    const tree = shallow(component)

    const officeWindow = tree.find(OfficeWindow)
    expect(officeWindow).toHaveLength(1)

    const header = officeWindow.dive().find(ToolsHeader)
    expect(header).toHaveLength(1)

    const headerButtons = header.dive().find(Button)
    expect(headerButtons).toHaveLength(2)

    headerButtons.at(0).simulate("click")
    expect(mockOnMinimize).toHaveBeenCalledTimes(1)

    headerButtons.at(1).simulate("click")
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it("onChange triggers updates", () => {
    const mockOnChange = jest.fn()
    const component = getComponent({updateNotes: mockOnChange})
    const tree = shallow(component)

    const officeWindow = tree.find(OfficeWindow)
    expect(officeWindow).toHaveLength(1)

    const textArea = officeWindow.dive().find(TextArea)
    expect(textArea).toHaveLength(1)
    textArea.simulate("change", {target: {value: "3.4115926535"}})
    expect(mockOnChange).toHaveBeenCalled()
  })
})
