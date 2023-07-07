import {css} from "@emotion/react"
import * as React from "react"
import {UseFormMethods} from "react-hook-form"
import {
  indexToCellName,
  InputValueCodingCriterionSpreadsheetForm,
  InputValueCriterionSpreadsheetFooterContainer,
  Overlay,
  SpreadsheetViewer
} from "shared/components"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {CellIndex, InputValueScenarioCodingAutomatedCriterion} from "shared/models"
import {AutomatedCriterionFilesAndDirectoriesConfigType} from "shared/office-tools"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {FilesAndDirectoriesPreview} from "../../../../../../files-and-directories/preview/files-and-directories-preview"
import {AutomatedCriterionChooseDocumentModal} from "../choose-document-modal/choose-automated-criterion-document-modal"
import {SelectedSpreadsheetConfig} from "./update-input-value-content-container"

interface Props {
  readonly criterion: Option<InputValueScenarioCodingAutomatedCriterion>
  readonly formMethods: UseFormMethods<InputValueCodingCriterionSpreadsheetForm>
  readonly isChooseDocumentModalVisible: boolean
  readonly isFilesAndDirectoriesPreviewVisible: boolean
  readonly onCellSelectionConfirmed: (cellIndex: Option<CellIndex>, value: string) => void
  readonly onChangeDocumentType: (documentType: OfficeTool) => void
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly selectedSpreadsheetConfig: Option<SelectedSpreadsheetConfig>
  readonly setIsChooseDocumentModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setIsFilesAndDirectoriesPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>
  readonly setSelectedSpreadsheetConfig: React.Dispatch<React.SetStateAction<Option<SelectedSpreadsheetConfig>>>
}

export const CreateOrUpdateInputValueCriterionModal: React.FC<Props> = ({
  criterion,
  isFilesAndDirectoriesPreviewVisible,
  isChooseDocumentModalVisible,
  setIsChooseDocumentModalVisible,
  onCellSelectionConfirmed,
  onChangeDocumentType,
  scenarioId,
  selectedSpreadsheetConfig,
  setIsFilesAndDirectoriesPreviewVisible,
  setSelectedSpreadsheetConfig,
  formMethods,
  onDismiss
}) => {
  const {t} = useLucaTranslation()

  return (
    <>
      {isChooseDocumentModalVisible && (
        <AutomatedCriterionChooseDocumentModal
          isDocumentViewCriterion={false}
          onConfirm={document => {
            if (document === OfficeTool.SpreadsheetEditor) {
              setIsFilesAndDirectoriesPreviewVisible(true)
              setIsChooseDocumentModalVisible(false)
            } else {
              onChangeDocumentType(document)
            }
          }}
          defaultDocumentType={criterion.map(criterion => criterion.officeTool).getOrElse(OfficeTool.EmailClient)}
          onDismiss={onDismiss}
        />
      )}

      {isFilesAndDirectoriesPreviewVisible && (
        <Overlay>
          <FilesAndDirectoriesPreview
            customStyles={styles.preview}
            automatedCriterionConfig={{
              onSpreadsheetClick: (fileId, spreadsheet) => {
                setSelectedSpreadsheetConfig(
                  Option.of<SelectedSpreadsheetConfig>({
                    fileId,
                    spreadsheet,
                    inputValue: "",
                    selectedCellIndex: Option.none(),
                    selectedCellName: Option.none()
                  })
                )
                setIsFilesAndDirectoriesPreviewVisible(false)
              },
              codingCriterionType: AutomatedCriterionFilesAndDirectoriesConfigType.InputValue
            }}
            scenarioId={scenarioId}
            onClose={() => {
              setIsFilesAndDirectoriesPreviewVisible(false)
              onDismiss()
            }}
          />
        </Overlay>
      )}
      {selectedSpreadsheetConfig
        .map(config => (
          <Overlay>
            <SpreadsheetViewer
              customStyles={styles.preview}
              readonly={false}
              onSelectCell={({rowIndex, columnIndex}) => {
                setSelectedSpreadsheetConfig(
                  Option.of({
                    ...config,
                    selectedCellName: Option.of(indexToCellName({rowIndex, columnIndex})),
                    selectedCellIndex: Option.of({rowIndex, columnIndex})
                  })
                )
              }}
              renderCustomFooter={spreadsheet => (
                <InputValueCriterionSpreadsheetFooterContainer
                  inputValueAutomatedCriterionConfig={{
                    selectedCellName: config.selectedCellName,
                    formMethods,
                    onConfirm: (inputValue, isWholeTableSelected) => {
                      onCellSelectionConfirmed(
                        isWholeTableSelected
                          ? Option.none()
                          : config.selectedCellIndex.isEmpty()
                          ? Option.of({columnIndex: 0, rowIndex: 0})
                          : config.selectedCellIndex,
                        inputValue
                      )
                      setSelectedSpreadsheetConfig(Option.none())
                    }
                  }}
                  fileName={spreadsheet.filename}
                />
              )}
              onCloseViewer={() => setSelectedSpreadsheetConfig(Option.none())}
              spreadsheets={[{...config.spreadsheet, title: config.spreadsheet.filename}]}
            />
          </Overlay>
        ))
        .orNull()}
    </>
  )
}

const styles = {
  preview: css({
    height: "85vh",
    width: "85vw"
  })
}
