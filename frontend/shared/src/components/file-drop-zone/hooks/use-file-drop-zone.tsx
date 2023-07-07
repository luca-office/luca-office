import {useState} from "react"
import {Accept, DropzoneState, FileRejection, useDropzone} from "react-dropzone"
import {Option} from "../../../utils"
import {FileErrorMessage, FileUploadError, mapDropzoneRejectionToFileUploadError} from "../utils/error-messages"
import {maximumFileSizeInBytes} from "../utils/file-upload-config"

export interface UseFileDropZoneHook {
  readonly dropzone: DropzoneState
  readonly fileUploadError: Option<FileUploadError>
}

export interface UseFileDropParams {
  readonly accept?: Accept
  readonly onFilesAccepted: (files: File[]) => void
  readonly multiple?: boolean
}

export const useFileDropzone = (params: UseFileDropParams): UseFileDropZoneHook => {
  const handleFileRejection = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const fileUploadErrors = fileRejections[0].errors

      if (fileUploadErrors.length > 0) {
        setFileUploadError(
          Option.of(mapDropzoneRejectionToFileUploadError(fileUploadErrors[0].code as FileErrorMessage))
        )
      }
    }
  }

  const handleDropAccept = (files: File[]) => {
    setFileUploadError(Option.none())
    params.onFilesAccepted(files)
  }

  const dropzone = useDropzone({
    accept: params.accept,
    maxSize: maximumFileSizeInBytes,
    onDropAccepted: handleDropAccept,
    onDropRejected: handleFileRejection,
    multiple: params.multiple ?? true,
    noKeyboard: true
  })

  const [fileUploadError, setFileUploadError] = useState<Option<FileUploadError>>(Option.none())

  return {
    dropzone,
    fileUploadError
  }
}
