import * as React from "react"
import {CellIndex, SpreadsheetCellContentIntervention} from "shared/models"
import {CreateSpreadsheetCellContentInterventionModalContainer} from "../.."
import {CellInterventionSpreadsheetFooter} from "./spreadsheet-viewer-cell-intervention-footer"

interface Props {
  readonly selectedCellIndex: CellIndex
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly fileId: UUID
  readonly disabled: boolean
  readonly spreadsheetId: UUID
  readonly spreadsheetCellContentInterventions: SpreadsheetCellContentIntervention[]
}

export interface CellInterventionSpreadsheetForm {
  readonly value: string
}

export const CellInterventionSpreadsheetFooterContainer: React.FC<Props> = ({
  selectedCellIndex,
  scenarioId,
  scenarioMaxDurationInSeconds,
  fileId,
  disabled,
  spreadsheetId,
  spreadsheetCellContentInterventions
}) => {
  const [isCreateInterventionModalVisible, setIsCreateInterventionModalVisible] = React.useState(false)

  const interventionsCount = spreadsheetCellContentInterventions.filter(
    intervention =>
      intervention.spreadsheetId === spreadsheetId &&
      selectedCellIndex.columnIndex === intervention.spreadsheetColumnIndex &&
      selectedCellIndex.rowIndex === intervention.spreadsheetRowIndex
  ).length

  return (
    <>
      <CellInterventionSpreadsheetFooter
        disabled={disabled}
        interventionsCount={interventionsCount}
        onCreateClick={() => setIsCreateInterventionModalVisible(true)}
      />
      {isCreateInterventionModalVisible && (
        <CreateSpreadsheetCellContentInterventionModalContainer
          onDismiss={() => setIsCreateInterventionModalVisible(false)}
          scenarioId={scenarioId}
          scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
          selectedCellIndex={selectedCellIndex}
          fileId={fileId}
          spreadsheetId={spreadsheetId}
        />
      )}
    </>
  )
}
