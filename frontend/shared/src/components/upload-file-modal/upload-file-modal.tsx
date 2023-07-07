import {css} from "@emotion/react"
import * as React from "react"
import {UploadFileType as FileType} from "../../enums"
import {TextDocumentCreation} from "../../graphql/generated/globalTypes"
import {LocalTextDocument, UploadBinary} from "../../models"
import {spacingHuge, spacingTiny} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Modal} from "../modal/modal"
import {useUploadFileModal} from "./hooks/use-upload-file-modal"
import {SelectLocalFiles} from "./select-local-files/select-local-files"

export interface UploadFileModalProps {
  readonly acceptedFileTypes: FileType[]
  readonly disabled?: boolean
  readonly onBinariesSuccessfullyUploaded: (binaries: UploadBinary[], files: File[]) => void
  readonly onBinariesUploadedFailed?: () => void
  readonly onDismiss: () => void
  readonly isLimitedToSingleItem?: boolean
  readonly titleKey?: LucaI18nLangKey
  readonly createTextDocument?: (textDocument: TextDocumentCreation, title: string) => void
}

export const UploadFileModal: React.FC<UploadFileModalProps> = ({
  acceptedFileTypes: defaultSelectedFileTypes,
  disabled = false,
  onBinariesSuccessfullyUploaded,
  onBinariesUploadedFailed,
  isLimitedToSingleItem = false,
  onDismiss,
  titleKey,
  createTextDocument
}) => {
  const {t} = useLucaTranslation()

  const handleTextDocumentCreation = (textDocument: LocalTextDocument) => {
    createTextDocument?.({content: textDocument.content}, textDocument.title)
  }

  const {
    deselectFile,
    isUploading,
    selectedFiles,
    acceptedFileTypes: selectedFileTypes,
    selectFiles,
    uploadBinaries,
    selectedTextDocuments,
    selectTextDocument,
    deselectTextDocument
  } = useUploadFileModal({
    onUploadSuccess: onBinariesSuccessfullyUploaded,
    defaultSelectedFileTypes,
    isLimitedToSingleItem,
    onUploadedFailed: onBinariesUploadedFailed,
    createTextDocumentFile: handleTextDocumentCreation
  })

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      selectFiles(files)
    }
  }

  const isConfirmButtonDisabled =
    disabled || isUploading || (selectedFiles.length === 0 && selectedTextDocuments.length === 0)

  const handleConfirm = () => {
    uploadBinaries()
  }

  return (
    <>
      <Modal
        onConfirm={handleConfirm}
        customStyles={styles.modal}
        customFooterStyles={styles.modalFooter}
        confirmButtonDisabled={isConfirmButtonDisabled}
        confirmButtonKey={isUploading ? "files_and_directories__upload_modal_is_uploading" : "add_button"}
        isConfirmButtonLoading={isUploading}
        title={
          titleKey
            ? t(titleKey)
            : t(
                isLimitedToSingleItem
                  ? "files_and_directories__upload_modal_title_singular"
                  : "files_and_directories__upload_modal_title_plural"
              )
        }
        onDismiss={onDismiss}>
        <SelectLocalFiles
          disabled={disabled}
          isLimitedToSingleItem={isLimitedToSingleItem}
          fileTypes={selectedFileTypes}
          onFilesAccepted={handleFileUpload}
          onFileDeselect={deselectFile}
          selectedFiles={selectedFiles}
          deselectTextDocument={deselectTextDocument}
          selectTextDocument={selectTextDocument}
          selectedTextDocuments={selectedTextDocuments}
          hideTextDocumentCreation={createTextDocument === undefined}
        />
      </Modal>
    </>
  )
}

const styles = {
  modal: css({
    width: "70vw"
  }),
  modalFooter: css({
    marginTop: spacingHuge
  }),
  selectedLocalFiles: css({
    maxHeight: "50vh",
    overflowY: "auto",
    paddingBottom: spacingTiny
  }),
  spacerBottom: css({
    marginBottom: spacingHuge
  })
}
