// importing from direct file because of issues of babel loader and spyOn
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {SpreadsheetEditor} from "../../spreadsheet"
import {spreadSheetFileMock} from "../__mocks__/spreadsheet.mock"
import {SpreadsheetFilePreview} from "../spreadsheet-file-preview"

jest.mock("../../spreadsheet/dhx-spreadsheet/dhx-spreadsheet", () => ({
  DhxSpreadsheet: () => <div>mockedSheet</div>
}))

describe("Spreadsheet Preview", () => {
  it("renders correctly", async () => {
    const component = create(<SpreadsheetFilePreview spreadsheet={spreadSheetFileMock.spreadsheet} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - table calculation view", async () => {
    const component = mount(<SpreadsheetFilePreview spreadsheet={spreadSheetFileMock.spreadsheet} />)
    expect(component.find(SpreadsheetEditor)).toHaveLength(1)
  })
})
