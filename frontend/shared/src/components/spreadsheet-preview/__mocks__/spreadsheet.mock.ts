import {FileType} from "../../../enums"
import {FileUsageType, Relevance, SpreadsheetCellType} from "../../../graphql/generated/globalTypes"
import {SpreadsheetFile} from "../../../models"

export const spreadSheetFileMock: SpreadsheetFile = {
  directoryId: "sflksdf-sfposdf",
  emailId: "sfopskdf-sdfpojsd-sdf",
  fileType: FileType.Spreadsheet,
  id: "ßw340fgk-sfüsdofk",
  name: "table1.xlxsx",
  relevance: Relevance.PotentiallyHelpful,
  spreadsheetId: "sdfsdfsf",
  tags: [],
  usageType: FileUsageType.FileSystem,
  spreadsheet: {
    cells: [
      {
        __typename: "SpreadsheetCell",
        cellType: SpreadsheetCellType.Currency,
        id: "4sfsdf",
        columnIndex: 1,
        rowIndex: 1,
        spreadsheetId: "sdfsdfsf",
        value: "sdf",
        style: null
      }
    ],
    id: "dsdfdsdf",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    filename: "spreadsheet-file",
    fileSize: -1
  }
}
