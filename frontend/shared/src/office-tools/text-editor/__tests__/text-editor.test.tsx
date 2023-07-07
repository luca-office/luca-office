import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, OfficeWindow, ToolsHeader} from "../../../components"
import {Option} from "../../../utils"
import {TextEditor, TextEditorProps} from "../text-editor"

const defaultProps: TextEditorProps = {
  onChange: jest.fn(),
  onClose: jest.fn(),
  textDocument: Option.of({title: "Test.txt", content: "<p>test</p>", id: "123"})
}

jest.mock("../../../../../node_modules/react-quill", () => () => {
  return <div />
})

const getComponent = (props?: Partial<TextEditorProps>) => <TextEditor {...{...defaultProps, ...props}} />

describe("text editor", () => {
  it("renders correctly", () => {
    const tree = create(getComponent()).toJSON()
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
