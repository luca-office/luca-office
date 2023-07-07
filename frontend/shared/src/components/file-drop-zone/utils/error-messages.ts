import {LucaI18nLangKey} from "../../../translations"

export enum FileUploadError {
  FileTooLarge,
  InvalidFileType,
  TooManyFiles
}

export const getLanguageKeyForFileUploadError = (error: FileUploadError): LucaI18nLangKey => {
  switch (error) {
    case FileUploadError.FileTooLarge:
      return "files_and_directories__upload_modal_file_too_large"
    case FileUploadError.InvalidFileType:
      return "files_and_directories__upload_modal_file_type_invalid"
    case FileUploadError.TooManyFiles:
      return "files_and_directories__upload_modal_no_single_file"
  }
}

export type FileErrorMessage = "file-too-large" | "file-too-small" | "too-many-files" | "file-invalid-type"

export const mapDropzoneRejectionToFileUploadError = (errorMessage: FileErrorMessage) => {
  switch (errorMessage) {
    case "file-invalid-type":
      return FileUploadError.InvalidFileType
    case "file-too-large":
      return FileUploadError.FileTooLarge
    case "too-many-files":
      return FileUploadError.TooManyFiles
    default:
      return FileUploadError.InvalidFileType
  }
}
