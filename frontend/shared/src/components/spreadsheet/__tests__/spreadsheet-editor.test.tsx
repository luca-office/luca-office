import * as React from "react"
import {create} from "react-test-renderer"
import {spreadsheetsMock} from "../__mocks__/spreadsheets.mock"
import {SpreadsheetEditor, SpreadsheetEditorProps} from "../spreadsheet-editor"

const defaultProps: SpreadsheetEditorProps = {
  readonly: false,
  spreadsheet: spreadsheetsMock[0],
  columnsCount: 50,
  rowsCount: 50
}

jest.mock("../dhx-spreadsheet/dhx-spreadsheet", () => ({
  DhxSpreadsheet: () => <div>mockedSheet</div>
}))

const getComponent = (props?: Partial<SpreadsheetEditorProps>) => <SpreadsheetEditor {...{...defaultProps, ...props}} />

describe("spreadsheet-editor", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
