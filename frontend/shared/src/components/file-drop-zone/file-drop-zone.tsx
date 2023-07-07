import * as React from "react"
import {Accept} from "react-dropzone"
import Highlighter from "react-highlight-words"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Text} from "../typography/typography"
import {fileDropZoneHighlightStyle as highlightStyle, fileDropZoneStyle as styles} from "./file-drop-zone.style"
import {useFileDropzone} from "./hooks/use-file-drop-zone"
import {getLanguageKeyForFileUploadError} from "./utils/error-messages"
import {maximumFileSizeInMegaByte} from "./utils/file-upload-config"

export interface DragState {
  readonly isDragActive: boolean
  readonly isDragAccepted: boolean
  readonly isDragRejected: boolean
}

export interface FileDropZoneProps extends CustomStyle {
  readonly accept?: Accept
  readonly onFilesAccepted: (files: File[]) => void
  readonly multiple?: boolean
  readonly disabled?: boolean
  readonly description?: React.ReactNode
  readonly hideSelectButton?: boolean
}

export const FileDropzone: React.FC<FileDropZoneProps> = ({
  accept,
  onFilesAccepted,
  multiple = true,
  disabled,
  description,
  hideSelectButton = false,
  customStyles
}) => {
  const {dropzone, fileUploadError} = useFileDropzone({accept, onFilesAccepted, multiple})
  const {t} = useLucaTranslation()
  const {isDragAccept, isDragReject, isDragActive, getInputProps, getRootProps} = dropzone

  return (
    <>
      <div
        className="file-dropzone-wrapper"
        css={[
          styles.dragWrapper({isDragAccepted: isDragAccept, isDragActive, isDragRejected: isDragReject}, !!disabled),
          customStyles
        ]}
        {...getRootProps()}>
        <input {...getInputProps({multiple, disabled})} />
        <Text customStyles={styles.hint}>
          {description ?? (
            <Highlighter
              highlightTag={"span"}
              highlightStyle={highlightStyle}
              searchWords={[`${maximumFileSizeInMegaByte} MB`]}
              textToHighlight={t(
                multiple
                  ? "files_and_directories__upload_modal_file_size_hint_plural"
                  : "files_and_directories__upload_modal_file_size_hint_singular",
                {
                  fileSizeInMB: maximumFileSizeInMegaByte
                }
              )}
            />
          )}
        </Text>
        {!hideSelectButton && (
          <Text customStyles={styles.selectFileButton(!!disabled)}>
            {t(
              disabled
                ? "files_and_directories__upload_modal_choose_file_disabled"
                : "files_and_directories__upload_modal_choose_file"
            )}
          </Text>
        )}
      </div>
      {fileUploadError
        .map(error => <Text customStyles={styles.errorText}>{t(getLanguageKeyForFileUploadError(error))}</Text>)
        .orNull()}
    </>
  )
}
