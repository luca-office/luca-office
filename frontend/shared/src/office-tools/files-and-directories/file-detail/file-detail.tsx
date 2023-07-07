import {css} from "@emotion/react"
import * as React from "react"
import {FilesAndDirectoriesDetailView, Heading, MediaFilePreview, SelectionInPreviewFooter} from "../../../components"
import {FileType, HeadingLevel, IconName, ViewerToolsType} from "../../../enums"
import {File, MediaFile, SpreadsheetFile, TextDocumentFile} from "../../../models"
import {CustomStyle, FontWeight, spacingMedium} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {iconForFile} from "../../../utils"
import {
  AutomatedCriterionFilesAndDirectoriesConfig,
  AutomatedCriterionFilesAndDirectoriesConfigType
} from "../files-and-directories"

export interface FileDetailProps extends CustomStyle {
  readonly t: LucaTFunction
  readonly file: File
  readonly openFile: (file: MediaFile) => void
  readonly openSpreadsheet: (spreadsheet: SpreadsheetFile) => void
  readonly openTextDocument: (textDocument: TextDocumentFile) => void
  readonly isPreview?: boolean
  readonly automatedCriterionConfig?: AutomatedCriterionFilesAndDirectoriesConfig
}

export const FileDetail: React.FC<FileDetailProps> = ({
  t,
  file,
  openFile,
  openSpreadsheet,
  openTextDocument,
  isPreview = false,
  automatedCriterionConfig,
  customStyles
}) => {
  const handlePreviewClick = (viewerToolsType: ViewerToolsType, file?: File) => {
    if (file?.fileType === FileType.Media) {
      openFile(file)
    } else if (file?.fileType === FileType.Spreadsheet) {
      openSpreadsheet(file)
    } else if (file?.fileType === FileType.TextDocument) {
      openTextDocument(file)
    }
  }

  return (
    <FilesAndDirectoriesDetailView
      customStyles={customStyles}
      customCardContentStyles={styles.cardContent}
      headerIcon={iconForFile(file)}
      headerTitle={file.name}>
      <div css={styles.content}>
        <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("directories_and_files__file_preview_label")}
        </Heading>
        <MediaFilePreview
          showInlinePreview={automatedCriterionConfig !== undefined}
          file={file}
          openButtonDisabled={isPreview}
          onPreviewButtonClick={handlePreviewClick}
        />

        {automatedCriterionConfig?.codingCriterionType ===
        AutomatedCriterionFilesAndDirectoriesConfigType.DocumentView ? (
          <SelectionInPreviewFooter
            headingKey="coding_models__automated_item_document_view_column_header"
            icon={IconName.File}
            onConfirm={() => automatedCriterionConfig.onFileClick?.(file.id)}
            title={t("files_and_directories__title")}
            textKey="coding_models__automated_item_document_view_files_and_directories_selection_footer"
          />
        ) : automatedCriterionConfig && file.fileType === FileType.Spreadsheet ? (
          <SelectionInPreviewFooter
            headingKey="coding_models__automated_item_input_value_preview_spreadsheet_title"
            icon={IconName.TableCalculation}
            onConfirm={() => automatedCriterionConfig?.onSpreadsheetClick?.(file.id, file.spreadsheet)}
            title={`${file.spreadsheet.filename} ${t(
              "coding_models__automated_item_input_value_preview_spreadsheet_title_check_file"
            )}`}
            textKey="coding_models__automated_item_input_value_preview_spreadsheet_text"
          />
        ) : null}
      </div>
    </FilesAndDirectoriesDetailView>
  )
}

const styles = {
  content: css({
    flex: "1 1 auto",
    padding: spacingMedium,
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }),
  viewerTool: css({
    height: "90vh",
    width: "90vh"
  }),
  cardContent: css({
    overflow: "hidden"
  })
}
