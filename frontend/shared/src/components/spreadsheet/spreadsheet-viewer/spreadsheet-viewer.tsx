import * as React from "react"
import {ViewerToolsType} from "../../../enums"
import {SpreadsheetCellType} from "../../../graphql/generated/globalTypes"
import {Binary, CellIndex, CellRange, SerializedCell, Spreadsheet, ViewerSpreadsheet} from "../../../models"
import {CustomStyle} from "../../../styles"
import {Option} from "../../../utils"
import {ContentLoadingIndicator} from "../../content-loading-indicator/content-loading-indicator"
import {ToolsHeader, ViewerToolsSubHeader} from "../../viewer-tools"
import {SpreadsheetStyleChange} from "../dhx-spreadsheet/dhx-spreadsheet"
import {DhxCellStyle} from "../dhx-spreadsheet/dhx-types"
import {SpreadsheetEditor} from "../spreadsheet-editor"
import {spreadsheetViewerStyles} from "./spreadsheet-viewer.style"

export interface SpreadsheetViewerProps extends CustomStyle {
  readonly activeSpreadsheetId?: UUID
  readonly isLoading?: boolean
  readonly onCloseSpreadsheet?: (id: UUID) => void
  readonly onCloseViewer: () => void
  readonly onMinimize?: () => void
  readonly readonly: boolean
  readonly setActiveSpreadsheetId?: (id: UUID) => void
  readonly spreadsheets: ViewerSpreadsheet[]
  readonly onCellValueChange?: (rowIndex: number, columnIndex: number, value: string) => void
  readonly onCellTypeChange?: (
    rowIndex: number,
    columnIndex: number,
    cellType: SpreadsheetCellType,
    value: string
  ) => void
  readonly onSelectCell?: (index: CellIndex) => void
  readonly onSelectCellRange?: (range: CellRange) => void
  readonly onCellStyleChange?: (changes: Array<SpreadsheetStyleChange>) => void
  readonly onSaveButtonClick?: (serializedCells: SerializedCell[]) => void
  readonly isSaveLoading?: boolean
  readonly renderCustomFooter?: (spreadsheet: Spreadsheet) => JSX.Element
}

export const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = props => {
  const {
    activeSpreadsheetId,
    customStyles,
    isLoading = false,
    onCloseSpreadsheet,
    onCloseViewer,
    onMinimize,
    readonly,
    setActiveSpreadsheetId,
    spreadsheets,
    renderCustomFooter,
    isSaveLoading,
    onCellValueChange,
    onCellTypeChange,
    onSelectCell,
    onSelectCellRange,
    onSaveButtonClick,
    onCellStyleChange
  } = props
  const selectedSheet = Option.of<ViewerSpreadsheet>(
    activeSpreadsheetId
      ? spreadsheets.find(sheet => sheet.id === activeSpreadsheetId)
      : spreadsheets[spreadsheets.length - 1]
  )

  const areControlsDisabled = spreadsheets.length <= 1 || !setActiveSpreadsheetId
  const selectedIndex = selectedSheet.map(binary => spreadsheets.indexOf(binary)).getOrElse(spreadsheets.length - 1)

  const onLeftClick = () => {
    if (setActiveSpreadsheetId && spreadsheets.length) {
      if (selectedIndex === 0) {
        setActiveSpreadsheetId(spreadsheets[spreadsheets.length - 1].id)
      } else {
        setActiveSpreadsheetId(spreadsheets[selectedIndex - 1].id)
      }
    }
  }

  const onRightClick = () => {
    if (setActiveSpreadsheetId && spreadsheets.length) {
      if (selectedIndex === spreadsheets.length - 1) {
        setActiveSpreadsheetId(spreadsheets[0].id)
      } else {
        setActiveSpreadsheetId(spreadsheets[selectedIndex + 1].id)
      }
    }
  }

  const mapSheetToBinary = (sheet: ViewerSpreadsheet) => ({id: sheet.id, title: sheet.title, path: ""} as Binary)

  const handleClose = () => {
    if (onCloseSpreadsheet !== undefined) {
      spreadsheets.forEach(spreadsheet => onCloseSpreadsheet(spreadsheet.id))
    }
    onCloseViewer()
  }

  return selectedSheet
    .map(spreadsheet => (
      <div css={[spreadsheetViewerStyles.viewer, customStyles]}>
        <ToolsHeader toolType={ViewerToolsType.TableEditor} onClose={handleClose} onMinimizeTool={onMinimize} />
        <ViewerToolsSubHeader
          elements={Option.of(spreadsheets.map(mapSheetToBinary))}
          selectedElement={selectedSheet.map(mapSheetToBinary)}
          closeElement={onCloseSpreadsheet}
          selectElement={setActiveSpreadsheetId}
          navigateToPrevious={areControlsDisabled ? undefined : onLeftClick}
          navigateToNext={areControlsDisabled ? undefined : onRightClick}
        />
        {isLoading ? (
          <ContentLoadingIndicator />
        ) : (
          <SpreadsheetEditor
            customStyles={spreadsheetViewerStyles.editor}
            spreadsheet={spreadsheet}
            readonly={readonly}
            onCellValueChange={onCellValueChange}
            onCellTypeChange={onCellTypeChange}
            onSelectCell={onSelectCell}
            onSelectCellRange={onSelectCellRange}
            onSaveButtonClick={onSaveButtonClick}
            isSaveLoading={isSaveLoading}
            renderCustomFooter={renderCustomFooter}
            onCellStyleChange={onCellStyleChange}
          />
        )}
      </div>
    ))
    .orNull()
}
