import {css} from "@emotion/react"
import React from "react"
import {useScenario, useUpdateSpreadsheet} from "shared/graphql/hooks"
import {CellIndex, Spreadsheet, SpreadsheetFile} from "shared/models"
import {SpreadsheetEditorContainer as SpreadsheetEditorContainerCommon} from "../../../../common/files-and-directories/file-detail/spreadsheet-editor-container/spreadsheet-editor-container"

export interface SpreadsheetEditorContainerProps {
  readonly file: SpreadsheetFile
  readonly onClose: () => void
  readonly onCloseBinary: () => void
  readonly scenarioId: UUID
  readonly renderCustomFooter?: (spreadsheet: Spreadsheet) => JSX.Element
  readonly onSelectCell?: (index: CellIndex) => void
}

export const SpreadsheetEditorContainer: React.FC<SpreadsheetEditorContainerProps> = ({
  file,
  scenarioId,
  onClose,
  onCloseBinary,
  renderCustomFooter,
  onSelectCell
}) => {
  const {scenario: scenarioOption} = useScenario(scenarioId)
  const {updateSpreadsheet} = useUpdateSpreadsheet({scenarioId})

  return (
    <SpreadsheetEditorContainerCommon
      customStyles={styles.viewer}
      file={file}
      readonly={scenarioOption.map(scenario => !!scenario.finalizedAt || !!scenario.publishedAt).getOrElse(false)}
      onClose={onClose}
      onCloseBinary={onCloseBinary}
      updateSpreadsheet={updateSpreadsheet}
      renderCustomFooter={renderCustomFooter}
      onSelectCell={onSelectCell}
    />
  )
}

const styles = {
  viewer: css({
    height: "80vh",
    width: "80vw"
  })
}
