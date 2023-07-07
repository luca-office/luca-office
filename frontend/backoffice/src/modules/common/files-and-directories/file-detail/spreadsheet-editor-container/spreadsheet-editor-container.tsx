import * as React from "react"
import {useRef, useState} from "react"
import {Orly, SpreadsheetViewer} from "shared/components"
import {SpreadsheetCellCreation} from "shared/graphql/generated/globalTypes"
import {CellIndex, SerializedCell, Spreadsheet, SpreadsheetFile} from "shared/models"
import {CustomStyle} from "shared/styles"
import {Option} from "shared/utils"

export interface SpreadsheetEditorContainerProps extends CustomStyle {
  readonly file: SpreadsheetFile
  readonly readonly: boolean
  readonly onClose: () => void
  readonly onCloseBinary: () => void
  readonly updateSpreadsheet: (id: UUID, cellCreations: SpreadsheetCellCreation[]) => Promise<Option<Spreadsheet>>
  readonly renderCustomFooter?: (spreadsheet: Spreadsheet) => JSX.Element
  readonly onSelectCell?: (index: CellIndex) => void
}

export const SpreadsheetEditorContainer: React.FC<SpreadsheetEditorContainerProps> = ({
  customStyles,
  file,
  readonly,
  onClose,
  onCloseBinary,
  updateSpreadsheet,
  renderCustomFooter,
  onSelectCell
}) => {
  const hasSpreadsheetUnsavedChanges = useRef(false)
  const [isSaveOrlyVisible, setIsSaveOrlyVisible] = useState(false)
  const [shouldCloseBinary, setShouldCloseBinary] = useState(false)
  const [isSaveLoading, updateIsSaveLoading] = useState(false)
  const spreadsheet = file.spreadsheet

  const setUnchangedChangesFlag = () => {
    if (!hasSpreadsheetUnsavedChanges.current) {
      hasSpreadsheetUnsavedChanges.current = true
    }
  }

  const handleClose = (closeBinary: boolean) => (closeBinary ? onCloseBinary() : onClose())

  const onConfirmSaveOrly = () => {
    handleClose(shouldCloseBinary)
    setIsSaveOrlyVisible(false)
    setShouldCloseBinary(false)
  }

  const checkForUnsavedChanges = (closeBinary: boolean) => {
    if (hasSpreadsheetUnsavedChanges.current) {
      setShouldCloseBinary(closeBinary)
      setIsSaveOrlyVisible(true)
      return
    }
    handleClose(closeBinary)
  }

  const onCloseSpreadsheet = () => checkForUnsavedChanges(true)

  const onCloseViewer = () => checkForUnsavedChanges(false)

  const onSaveButtonClick = (serializedCells: SerializedCell[]) => {
    updateIsSaveLoading(true)
    const cellCreations = serializedCells.map(cell => ({
      ...cell,
      style: cell.style !== null ? JSON.stringify(cell.style) : null,
      spreadsheetId: spreadsheet.id
    }))
    updateSpreadsheet(spreadsheet.id, cellCreations).finally(() => {
      updateIsSaveLoading(false)
      hasSpreadsheetUnsavedChanges.current = false
    })
  }

  return (
    <React.Fragment>
      <SpreadsheetViewer
        spreadsheets={[{...file.spreadsheet, title: file.name}]}
        readonly={readonly}
        onCloseViewer={onCloseViewer}
        onCloseSpreadsheet={onCloseSpreadsheet}
        activeSpreadsheetId={spreadsheet.id}
        customStyles={customStyles}
        onSelectCell={onSelectCell}
        onSaveButtonClick={onSaveButtonClick}
        onCellValueChange={setUnchangedChangesFlag}
        onCellTypeChange={setUnchangedChangesFlag}
        onCellStyleChange={setUnchangedChangesFlag}
        isSaveLoading={isSaveLoading}
        renderCustomFooter={renderCustomFooter}
      />
      {isSaveOrlyVisible && (
        <Orly
          titleKey={"dialog__confirm_title"}
          textKey={"spreadsheet_editor_unsaved_changes_orly_message"}
          confirmButtonKey={"close_button"}
          onConfirm={onConfirmSaveOrly}
          onDismiss={() => setIsSaveOrlyVisible(false)}
        />
      )}
    </React.Fragment>
  )
}
