import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {Option} from "../../../../utils"
import {
  InputValueCriterionSpreadsheetFooter,
  SpreadsheetInputValueSelectionType
} from "./spreadsheet-viewer-input-value-criterion-footer"

interface Props {
  readonly inputValueAutomatedCriterionConfig: InputValueAutomatedCriterionConfig
  readonly fileName: string
}

export interface InputValueAutomatedCriterionConfig {
  readonly selectedCellName: Option<string>
  readonly formMethods: UseFormMethods<InputValueCodingCriterionSpreadsheetForm>
  readonly onConfirm: (inputValue: string, isWholeTableSelected: boolean) => void
}

export interface InputValueCodingCriterionSpreadsheetForm {
  readonly value: string
}

export const InputValueCriterionSpreadsheetFooterContainer: React.FC<Props> = ({
  inputValueAutomatedCriterionConfig,
  fileName
}) => {
  const [selectedSelectionType, setSelectedSelectionType] = React.useState(
    SpreadsheetInputValueSelectionType.SpecificCell
  )
  return (
    <InputValueCriterionSpreadsheetFooter
      fileName={fileName}
      selectedSelectionType={selectedSelectionType}
      setSelectedSelectionType={setSelectedSelectionType}
      inputValueAutomatedCriterionConfig={inputValueAutomatedCriterionConfig}
    />
  )
}
