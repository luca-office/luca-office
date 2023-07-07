import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ToolsHeader, ViewerToolsSubHeader} from "../../../viewer-tools"
import {spreadsheetsMock} from "../../__mocks__/spreadsheets.mock"
import {SpreadsheetEditor} from "../../spreadsheet-editor"
import {SpreadsheetViewer, SpreadsheetViewerProps} from "../spreadsheet-viewer"

const defaultProps: SpreadsheetViewerProps = {
  readonly: false,
  spreadsheets: spreadsheetsMock,
  onCloseViewer: jest.fn()
}

jest.mock("../../dhx-spreadsheet/dhx-spreadsheet", () => ({
  DhxSpreadsheet: () => <div>mockedSheet</div>
}))

const getComponent = (props?: Partial<SpreadsheetViewerProps>) => <SpreadsheetViewer {...{...defaultProps, ...props}} />

describe("spreadsheet-viewer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(ToolsHeader)).toHaveLength(1)
    expect(tree.find(ViewerToolsSubHeader)).toHaveLength(1)
    expect(tree.find(SpreadsheetEditor)).toHaveLength(1)
  })
})
