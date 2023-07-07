import {css} from "@emotion/react"
import * as React from "react"
import {Spreadsheet} from "../../models"
import {spacingTiny} from "../../styles"
import {getSheetDimensions, SpreadsheetEditor} from "../spreadsheet"

export interface SpreadsheetFilePreviewProps {
  readonly spreadsheet: Spreadsheet
}

export const SpreadsheetFilePreview: React.FC<SpreadsheetFilePreviewProps> = ({spreadsheet}) => {
  const sheetDimensions = getSheetDimensions(spreadsheet.cells, 10, 20)

  return (
    <React.Fragment>
      <SpreadsheetEditor
        rowsCount={sheetDimensions.rowsCount}
        columnsCount={sheetDimensions.columnsCount}
        spreadsheet={spreadsheet}
        customStyles={styles.editor}
        readonly={true}
      />
    </React.Fragment>
  )
}

const styles = {
  editor: css({
    flexGrow: 1,
    height: "auto",
    marginTop: spacingTiny
  })
}
