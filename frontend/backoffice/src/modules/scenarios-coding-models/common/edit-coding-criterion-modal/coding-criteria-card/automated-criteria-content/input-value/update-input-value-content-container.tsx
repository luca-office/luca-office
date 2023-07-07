import * as React from "react"
import {CellIndex, InputValueScenarioCodingAutomatedCriterion, Spreadsheet} from "shared/models"
import {Option} from "shared/utils"
import {UpdateInputValueContent} from "./update-input-value-content"

interface Props {
  readonly criterion: InputValueScenarioCodingAutomatedCriterion
  readonly scenarioId: UUID
  readonly onChangeInputValue: (value: string) => void
  readonly codingItemId: UUID
  readonly codingModelId: UUID
}

export interface SelectedSpreadsheetConfig {
  readonly fileId: UUID
  readonly spreadsheet: Spreadsheet
  readonly selectedCellName: Option<string>
  readonly selectedCellIndex: Option<CellIndex>
  readonly inputValue: string
}

export const UpdateInputValueContentContainer: React.FC<Props> = ({criterion, ...rest}) => {
  const [isChooseDocumentModalVisible, setIsChooseDocumentModalVisible] = React.useState(false)

  return (
    <UpdateInputValueContent
      isChooseDocumentModalVisible={isChooseDocumentModalVisible}
      setIsChooseDocumentModalVisible={setIsChooseDocumentModalVisible}
      criterion={criterion}
      {...rest}
    />
  )
}
