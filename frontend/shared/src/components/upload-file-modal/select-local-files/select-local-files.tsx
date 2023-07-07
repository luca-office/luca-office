import * as React from "react"
import {HeadingLevel, IconName, UploadFileType as FileType} from "../../../enums"
import {LocalTextDocument} from "../../../models"
import {fontColorLight, spacingMedium, spacingSmall, TextSize} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {
  fileExtensionToFileType,
  getAcceptedFileExtensionsFromFileTypes,
  getFileExtensionFromFilename,
  getIconNameFromFileType
} from "../../../utils"
import {CreateTextDocument} from "../../create-text-document/create-text-document"
import {FileDropzone} from "../../file-drop-zone/file-drop-zone"
import {LocalFileChip} from "../../local-file-chip/local-file-chip"
import {Heading, Text} from "../../typography/typography"
import {LocalFile} from "../hooks/use-upload-file-modal"
import {UploadSection} from "../upload-section/upload-section"
import {AcceptedFileTypes} from "./accepted-file-types/accepted-file-types"
import {selectLocalFilesStyles} from "./select-local-files.style"

export interface SelectLocalFilesProps {
  readonly fileTypes: FileType[]
  readonly selectedFiles: LocalFile[]
  readonly selectedTextDocuments: LocalTextDocument[]
  readonly selectTextDocument: (document: LocalTextDocument) => void
  readonly deselectTextDocument: (document: LocalTextDocument) => void
  readonly onFileDeselect: (file: LocalFile) => void
  readonly onFilesAccepted: (files: File[]) => void
  readonly isLimitedToSingleItem?: boolean
  readonly disabled?: boolean
  readonly hideTextDocumentCreation?: boolean
}

export const SelectLocalFiles: React.FC<SelectLocalFilesProps> = ({
  fileTypes,
  selectedFiles,
  onFileDeselect,
  onFilesAccepted,
  isLimitedToSingleItem = false,
  disabled = false,
  selectedTextDocuments,
  selectTextDocument,
  deselectTextDocument,
  hideTextDocumentCreation = false
}) => {
  const {t} = useLucaTranslation()

  const renderNoFilesPlaceholder = (
    <div
      className="local-files-placeholder"
      data-testid="local-files-placeholder"
      css={selectLocalFilesStyles.selectedLocalFilesPlaceholder}>
      <div>
        <Heading level={HeadingLevel.h3}>
          {isLimitedToSingleItem
            ? t("files_and_directories__upload_modal_no_file_selected")
            : t("files_and_directories__upload_modal_no_files_selected")}
        </Heading>
        <Text size={TextSize.Medium} customStyles={{color: fontColorLight}}>
          {isLimitedToSingleItem
            ? t("files_and_directories__upload_modal_no_file_selected_hint")
            : t("files_and_directories__upload_modal_no_files_selected_hint")}
        </Text>
      </div>
    </div>
  )

  const renderSelectedLocalFiles = () => (
    <UploadSection
      customStyles={selectLocalFilesStyles.spacerBottom}
      heading={
        isLimitedToSingleItem
          ? t("files_and_directories__upload_modal_added_file_no_amount")
          : t(
              selectedFiles.length === 1
                ? "files_and_directories__upload_modal_added_file"
                : "files_and_directories__upload_modal_added_files",
              {
                amount: selectedFiles.length + selectedTextDocuments.length
              }
            )
      }>
      {selectedFiles.length + selectedTextDocuments.length === 0 ? (
        renderNoFilesPlaceholder
      ) : (
        <div css={selectLocalFilesStyles.selectedLocalFiles}>
          {selectedFiles.map(localFile => (
            <LocalFileChip
              customStyles={{marginTop: spacingSmall}}
              title={localFile.file.name}
              key={localFile.id}
              iconName={getIconNameFromFileType(
                fileExtensionToFileType(getFileExtensionFromFilename(localFile.file.name ?? "") ?? "")
              )}
              onCloseClick={() => onFileDeselect(localFile)}
            />
          ))}
          {selectedTextDocuments.map(document => (
            <LocalFileChip
              onCloseClick={() => deselectTextDocument(document)}
              title={document.title}
              iconName={IconName.TextEditor}
              key={document.id}
              customStyles={{marginTop: spacingSmall}}
            />
          ))}
        </div>
      )}
    </UploadSection>
  )

  const renderFileDropzone = (fileTypes: FileType[]) => (
    <div className="file-dropzone" css={[selectLocalFilesStyles.spacerBottom, {marginTop: spacingMedium}]}>
      <UploadSection
        heading={t(
          isLimitedToSingleItem
            ? "files_and_directories__upload_modal_title_singular"
            : "files_and_directories__upload_modal_upload_title"
        )}>
        <FileDropzone
          disabled={disabled || (isLimitedToSingleItem && selectedFiles.length > 0)}
          multiple={!isLimitedToSingleItem}
          accept={getAcceptedFileExtensionsFromFileTypes(fileTypes)}
          onFilesAccepted={onFilesAccepted}
        />
      </UploadSection>
    </div>
  )

  const renderCreateTextDocument = (
    <UploadSection
      heading={t("files_and_directories__upload_modal_create_text_document")}
      customStyles={selectLocalFilesStyles.spacerBottom}>
      <CreateTextDocument selectTextDocument={selectTextDocument} />
    </UploadSection>
  )

  return (
    <div>
      <AcceptedFileTypes fileTypes={fileTypes} isLimitedToSingleItem={isLimitedToSingleItem} />
      {renderFileDropzone(fileTypes)}
      {!hideTextDocumentCreation && renderCreateTextDocument}
      {renderSelectedLocalFiles()}
    </div>
  )
}
