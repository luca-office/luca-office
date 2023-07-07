import {css} from "@emotion/react"
import * as React from "react"
import {Overlay} from "shared/components"
import {DocumentViewScenarioCodingAutomatedCriterionUpdate, OfficeTool} from "shared/graphql/generated/globalTypes"
import {DocumentViewScenarioCodingAutomatedCriterion} from "shared/models"
import {AutomatedCriterionFilesAndDirectoriesConfigType} from "shared/office-tools"
import {defaultOfficeToolDocumentViewCodingCriterion, Option} from "shared/utils"
import {FilesAndDirectoriesPreview} from "../../../../files-and-directories/preview/files-and-directories-preview"
import {ReferenceBookPreview} from "../../../../reference-book-chapters/scenario/preview/reference-book-preview"
import {ErpPreview} from "../../../../sample-companies/erp/preview/erp-preview"
import {ScenarioEmailsPreview} from "../../../../scenario-emails/preview/scenario-emails-preview"
import {AutomatedCriterionChooseDocumentModal} from "../../../common/edit-coding-criterion-modal/coding-criteria-card/automated-criteria-content/choose-document-modal/choose-automated-criterion-document-modal"
import {DocumentViewPreviewTools} from "./create-or-update-document-view-criterion-container"

interface Props {
  readonly criterion: Option<DocumentViewScenarioCodingAutomatedCriterion>
  readonly handleDocumentConfirmClick: (tool: OfficeTool) => void
  readonly isChooseDocumentModalVisible: boolean
  readonly onDismiss: () => void
  readonly onEntityIdSelected: (id: Partial<DocumentViewScenarioCodingAutomatedCriterionUpdate>) => void
  readonly sampleCompanyId?: UUID
  readonly sampleCompanyName?: string
  readonly scenarioId: UUID
  readonly setVisibleTool: React.Dispatch<React.SetStateAction<Option<DocumentViewPreviewTools>>>
  readonly visibleTool: Option<DocumentViewPreviewTools>
}

export const CreateOrUpdateDocumentViewCriterion: React.FC<Props> = ({
  criterion,
  handleDocumentConfirmClick,
  isChooseDocumentModalVisible,
  onDismiss,
  onEntityIdSelected,
  sampleCompanyId,
  sampleCompanyName,
  scenarioId,
  setVisibleTool,
  visibleTool
}) => {
  const handleClosePreview = () => {
    setVisibleTool(Option.none())
    onDismiss()
  }

  const handleDocumentViewUpdate = (
    updatedProperty: Partial<Omit<DocumentViewScenarioCodingAutomatedCriterionUpdate, "score">>
  ) => {
    onEntityIdSelected(updatedProperty)
    setVisibleTool(Option.none())
  }
  return (
    <div>
      {isChooseDocumentModalVisible && (
        <AutomatedCriterionChooseDocumentModal
          defaultDocumentType={criterion
            .map(criterion => defaultOfficeToolDocumentViewCodingCriterion(criterion))
            .getOrElse(OfficeTool.EmailClient)}
          onConfirm={handleDocumentConfirmClick}
          sampleCompanyId={sampleCompanyId}
          isDocumentViewCriterion={true}
          onDismiss={onDismiss}
        />
      )}

      {visibleTool
        .map(tool => {
          switch (tool) {
            case OfficeTool.EmailClient:
              return (
                <Overlay>
                  <ScenarioEmailsPreview
                    scenarioId={scenarioId}
                    onEmailSelectionForDocumentViewCriterion={id => handleDocumentViewUpdate({emailId: id})}
                    onClose={handleClosePreview}
                  />
                </Overlay>
              )
            case OfficeTool.ReferenceBookViewer:
              return (
                <Overlay>
                  <ReferenceBookPreview
                    isBundled={false}
                    scenarioId={scenarioId}
                    customStyles={styles.preview}
                    automatedCriterionConfig={{
                      onArticleClick: articleId => handleDocumentViewUpdate({referenceBookArticleId: articleId})
                    }}
                    onClose={handleClosePreview}
                  />
                </Overlay>
              )
            case OfficeTool.FileBrowser:
              return (
                <Overlay>
                  <FilesAndDirectoriesPreview
                    customStyles={styles.preview}
                    automatedCriterionConfig={{
                      onFileClick: fileId => handleDocumentViewUpdate({fileId}),
                      codingCriterionType: AutomatedCriterionFilesAndDirectoriesConfigType.DocumentView
                    }}
                    scenarioId={scenarioId}
                    onClose={handleClosePreview}
                  />
                </Overlay>
              )
            case OfficeTool.Erp:
              return sampleCompanyId !== undefined && sampleCompanyName !== undefined ? (
                <Overlay>
                  <ErpPreview
                    customStyles={styles.preview}
                    automatedCriterionConfig={{
                      onDatasetSelected: (rowId, tableType) =>
                        handleDocumentViewUpdate({
                          sampleCompanyId: sampleCompanyId,
                          erpRowId: rowId,
                          erpTableType: tableType
                        })
                    }}
                    sampleCompanyId={sampleCompanyId}
                    sampleCompanyName={sampleCompanyName}
                    onClose={handleClosePreview}
                  />
                </Overlay>
              ) : null
          }
        })
        .orNull()}
    </div>
  )
}

const styles = {
  preview: css({
    height: "85vh",
    width: "85vw"
  })
}
