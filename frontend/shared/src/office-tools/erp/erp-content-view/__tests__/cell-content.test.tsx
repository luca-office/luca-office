import React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../../tests/redux/fake-store"
import {initialSharedAppState} from "../../../../redux/state"
import {ErpTableCellData, ErpTableContentType} from "../../erp-table"
import {CellContent} from "../cell-content"

const cellData: ErpTableCellData = {
  rowIndex: 1,
  entityId: 1,
  id: "rowId-Id",
  value: "test",
  contentType: ErpTableContentType.Text,
  columnName: "columnName",
  columnIndex: 1
}

describe("CellContent", () => {
  it("renders correctly", () => {
    const component = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <CellContent cellData={cellData} />
      </Provider>
    )
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
