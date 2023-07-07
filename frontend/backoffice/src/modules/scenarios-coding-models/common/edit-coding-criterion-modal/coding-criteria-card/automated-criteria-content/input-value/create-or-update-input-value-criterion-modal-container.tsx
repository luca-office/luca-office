import * as React from "react"
import {useForm} from "react-hook-form"
import {InputValueCodingCriterionSpreadsheetForm} from "shared/components"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {
  useCreateInputValueScenarioCodingAutomatedCriterion,
  useUpdateInputValueScenarioCodingAutomatedCriterion
} from "shared/graphql/hooks"
import {automatedCodingCriteriaQuery, codingDimensionsQuery} from "shared/graphql/queries"
import {CellIndex, InputValueScenarioCodingAutomatedCriterion} from "shared/models"
import {Option} from "shared/utils"
import {CreateOrUpdateInputValueCriterionModal} from "./create-or-update-input-value-criterion-modal"
import {SelectedSpreadsheetConfig} from "./update-input-value-content-container"

interface Props {
  readonly criterion: Option<InputValueScenarioCodingAutomatedCriterion>
  readonly scenarioId: UUID
  readonly codingItemId: UUID
  readonly codingModelId: UUID
  readonly onConfirm: () => void
  readonly onDismiss: () => void
}

export const CreateOrUpdateInputValueContentModalContainer: React.FC<Props> = ({
  criterion,
  codingItemId,
  codingModelId,
  onConfirm,
  scenarioId,
  onDismiss
}) => {
  const [isFilesAndDirectoriesPreviewVisible, setIsFilesAndDirectoriesPreviewVisible] = React.useState(false)
  const [isChooseDocumentModalVisible, setIsChooseDocumentModalVisible] = React.useState(true)
  const [selectedSpreadsheetConfig, setSelectedSpreadsheetConfig] = React.useState<Option<SelectedSpreadsheetConfig>>(
    Option.none()
  )

  const {createInputValueScenarioCodingAutomatedCriterion} = useCreateInputValueScenarioCodingAutomatedCriterion([
    {query: automatedCodingCriteriaQuery, variables: {itemId: codingItemId}},
    {query: codingDimensionsQuery, variables: {modelId: codingModelId}}
  ])

  const {updateInputValueScenarioCodingAutomatedCriterion} = useUpdateInputValueScenarioCodingAutomatedCriterion()

  const formMethods = useForm<InputValueCodingCriterionSpreadsheetForm>()

  const onChangeDocumentType = (documentType: OfficeTool) => {
    if (documentType === OfficeTool.SpreadsheetEditor) return Promise.resolve()

    if (criterion.isEmpty()) {
      return createInputValueScenarioCodingAutomatedCriterion({
        itemId: codingItemId,
        officeTool: documentType,
        score: 0,
        value: "",
        fileId: null,
        spreadsheetColumnIndex: null,
        spreadsheetRowIndex: null
      }).then(onConfirm)
    } else {
      return criterion.forEach(criterion =>
        updateInputValueScenarioCodingAutomatedCriterion(criterion.id, {
          officeTool: documentType,
          fileId: null,
          spreadsheetColumnIndex: null,
          spreadsheetRowIndex: null,
          score: criterion.score,
          value: criterion.value
        }).then(onConfirm)
      )
    }
  }

  const onCellSelectionConfirmed = (cellIndex: Option<CellIndex>, value: string) => {
    selectedSpreadsheetConfig.forEach(spreadsheetConfig => {
      if (criterion.isEmpty()) {
        createInputValueScenarioCodingAutomatedCriterion({
          itemId: codingItemId,
          officeTool: OfficeTool.SpreadsheetEditor,
          score: 0,
          value,
          fileId: spreadsheetConfig.fileId,
          spreadsheetColumnIndex: cellIndex.map(index => index.columnIndex).orNull(),
          spreadsheetRowIndex: cellIndex.map(index => index.rowIndex).orNull()
        }).then(onConfirm)
      } else {
        return criterion.forEach(criterion =>
          updateInputValueScenarioCodingAutomatedCriterion(criterion.id, {
            officeTool: OfficeTool.SpreadsheetEditor,
            score: criterion.score,
            value,
            spreadsheetColumnIndex: cellIndex.map(index => index.columnIndex).orNull(),
            spreadsheetRowIndex: cellIndex.map(index => index.rowIndex).orNull(),
            fileId: spreadsheetConfig.fileId
          }).then(onConfirm)
        )
      }
    })

    return Promise.resolve()
  }

  return (
    <CreateOrUpdateInputValueCriterionModal
      selectedSpreadsheetConfig={selectedSpreadsheetConfig}
      isFilesAndDirectoriesPreviewVisible={isFilesAndDirectoriesPreviewVisible}
      setSelectedSpreadsheetConfig={setSelectedSpreadsheetConfig}
      setIsFilesAndDirectoriesPreviewVisible={setIsFilesAndDirectoriesPreviewVisible}
      criterion={criterion}
      onChangeDocumentType={onChangeDocumentType}
      onCellSelectionConfirmed={onCellSelectionConfirmed}
      isChooseDocumentModalVisible={isChooseDocumentModalVisible}
      setIsChooseDocumentModalVisible={setIsChooseDocumentModalVisible}
      formMethods={formMethods}
      onDismiss={onDismiss}
      scenarioId={scenarioId}
    />
  )
}
