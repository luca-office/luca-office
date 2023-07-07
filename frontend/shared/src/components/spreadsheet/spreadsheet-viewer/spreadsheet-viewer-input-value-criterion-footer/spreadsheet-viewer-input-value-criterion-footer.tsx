import {css} from "@emotion/react"
import * as React from "react"
import {ButtonVariant, IconName, InputType} from "../../../../enums"
import {spacingSmall} from "../../../../styles"
import {useLucaTranslation} from "../../../../translations"
import {Button, TextInput} from "../../.."
import {CustomSelect} from "../../../select/custom-select"
import {SelectionInPreviewFooter} from "../../../selection-in-preview-footer/selection-in-preview-footer"
import {spreadsheetViewerStyles} from "../spreadsheet-viewer.style"
import {InputValueAutomatedCriterionConfig} from "./spreadsheet-viewer-input-value-criterion-footer-container"

export interface SpreadsheetInputValueFooterProps {
  readonly inputValueAutomatedCriterionConfig: InputValueAutomatedCriterionConfig
  readonly fileName: string
  readonly selectedSelectionType: SpreadsheetInputValueSelectionType
  readonly setSelectedSelectionType: React.Dispatch<React.SetStateAction<SpreadsheetInputValueSelectionType>>
}

export enum SpreadsheetInputValueSelectionType {
  WholeTable = "WholeTable",
  SpecificCell = "SpecificCell"
}

export const InputValueCriterionSpreadsheetFooter: React.FC<SpreadsheetInputValueFooterProps> = ({
  inputValueAutomatedCriterionConfig,
  fileName,
  selectedSelectionType,
  setSelectedSelectionType
}) => {
  const {t} = useLucaTranslation()

  const footerContent = (
    <div css={spreadsheetViewerStyles.selectionFooterWrapper}>
      <TextInput
        type={InputType.text}
        name="value"
        ref={inputValueAutomatedCriterionConfig.formMethods.register({required: true})}
        labelKey="coding_models__automated_item_input_value_value"
      />

      <CustomSelect
        onChange={value => setSelectedSelectionType(value as SpreadsheetInputValueSelectionType)}
        value={selectedSelectionType}
        optionList={[
          {
            label: t("coding_models__automated_item_input_value_preview_spreadsheet_whole_table"),
            value: SpreadsheetInputValueSelectionType.WholeTable
          },
          {
            label: t("coding_models__automated_item_input_value_preview_spreadsheet_specific_cell"),
            value: SpreadsheetInputValueSelectionType.SpecificCell
          }
        ]}
      />
      <div css={spreadsheetViewerStyles.cellInput}>
        {selectedSelectionType === SpreadsheetInputValueSelectionType.SpecificCell && (
          <TextInput
            type={InputType.text}
            disabled={true}
            value={inputValueAutomatedCriterionConfig.selectedCellName?.getOrElse("A1") ?? "A1"}
          />
        )}
      </div>

      <Button
        customStyles={spreadsheetViewerStyles.confirmButton}
        onClick={inputValueAutomatedCriterionConfig.formMethods.handleSubmit(({value}) =>
          inputValueAutomatedCriterionConfig?.onConfirm(
            value,
            selectedSelectionType === SpreadsheetInputValueSelectionType.WholeTable
          )
        )}
        variant={ButtonVariant.Primary}>
        {t("confirm_button")}
      </Button>
    </div>
  )
  return (
    <SelectionInPreviewFooter
      customContent={footerContent}
      icon={IconName.TableCalculation}
      customLabelStyles={styles.selectionFooter}
      textKey="coding_models__automated_item_input_value_preview_spreadsheet_text_table"
      headingKey="coding_models__automated_item_input_value_preview_spreadsheet_title"
      title={`${fileName} ${t("coding_models__automated_item_input_value_preview_spreadsheet_title_check_file_input")}`}
    />
  )
}

const styles = {
  selectionFooter: css({
    marginLeft: spacingSmall
  })
}
