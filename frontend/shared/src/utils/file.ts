import {Accept} from "react-dropzone"
import {BinaryType, FileType, IconName, UploadFileType} from "../enums"
import {MimeType} from "../graphql/generated/globalTypes"
import {Binary, File as DataFile, MediaFile} from "../models"
import {LucaI18nLangKey} from "../translations"
import {
  convertFileToBase64,
  createUUID,
  getFileExtensionFromMimeType,
  Option,
  spreadsheetFileExtension,
  textDocumentFileExtension
} from "../utils"

// check fileExtensionToBinary method if extensions added here
export const getAcceptedFileExtensions = (fileType: UploadFileType): Accept => {
  switch (fileType) {
    case UploadFileType.Graphic:
      return {
        "image/*": [".jpg", ".svg", ".png", ".jpeg", ".gif"]
      }
    case UploadFileType.PDF:
      return {
        "application/pdf": [".pdf"]
      }
    case UploadFileType.TableCalculation:
      return {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
      }
    case UploadFileType.Video:
      return {
        "video/mp4": [".mp4"]
      }
    case UploadFileType.Text:
      return {
        text: [".txt"]
      }
    default:
      return {}
  }
}
export const getAcceptedFileExtensionsFromFileTypes = (fileTypes: UploadFileType[]): Accept => {
  let acceptedFileExtensions: Accept = {}
  fileTypes.forEach(
    fileType => (acceptedFileExtensions = {...acceptedFileExtensions, ...getAcceptedFileExtensions(fileType)})
  )
  return acceptedFileExtensions
}

export const getBinaryTypeByFileType = (fileType: UploadFileType): Option<BinaryType> => {
  switch (fileType) {
    case UploadFileType.Graphic:
      return Option.of<BinaryType>(BinaryType.Image)
    case UploadFileType.Video:
      return Option.of<BinaryType>(BinaryType.Video)
    case UploadFileType.PDF:
      return Option.of<BinaryType>(BinaryType.PDF)
    default:
      return Option.none<BinaryType>()
  }
}

export const convertFileToBinary = (file: File): Promise<Binary> =>
  new Promise<Binary>((resolve, reject) =>
    convertFileToBase64(file)
      .then(base64 =>
        resolve({
          id: createUUID(),
          path: base64,
          title: file.name
        })
      )
      .catch(reject)
  )

export const fileExtensionForFile = (file: DataFile) =>
  file.fileType === FileType.Media
    ? getFileExtensionFromMimeType(file.binaryFile.mimeType)
    : file.fileType === FileType.Spreadsheet
    ? spreadsheetFileExtension
    : textDocumentFileExtension

export const mimeTypeForFile = (file: DataFile) => {
  if (file.fileType === FileType.Spreadsheet) {
    return Option.of(MimeType.Spreadsheet)
  } else if (file.fileType === FileType.TextDocument) {
    return Option.of(MimeType.TextHtml)
  } else {
    return Option.of(file)
      .filter(f => f.fileType === FileType.Media)
      .map(f => f as MediaFile)
      .map(f => f.binaryFile.mimeType)
  }
}

export const getFileExtensionFromFilename = (filename: string) => filename.split(".").pop()

export const fileExtensionToBinaryType = (extension: string): BinaryType => {
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return BinaryType.Image
    case "pdf":
      return BinaryType.PDF
    case "mp4":
      return BinaryType.Video
    default:
      return BinaryType.Image
  }
}
export const fileExtensionToFileType = (extension: string): UploadFileType => {
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return UploadFileType.Graphic
    case "pdf":
      return UploadFileType.PDF
    case "mp4":
      return UploadFileType.Video
    case "xlsx":
      return UploadFileType.TableCalculation
    case "txt":
      return UploadFileType.Text
    default:
      return UploadFileType.Graphic
  }
}

export const getIconNameFromFileType = (fileType: UploadFileType): IconName => {
  switch (fileType) {
    case UploadFileType.Graphic:
      return IconName.Image
    case UploadFileType.PDF:
      return IconName.File
    case UploadFileType.TableCalculation:
      return IconName.TableCalculation
    case UploadFileType.Video:
      return IconName.Play
    case UploadFileType.Text:
      return IconName.TextEditor
  }
}

export const getLanguageKeyFromFileType = (fileType: UploadFileType): LucaI18nLangKey => {
  switch (fileType) {
    case UploadFileType.Graphic:
      return "files_and_directories__file_type_image"
    case UploadFileType.PDF:
      return "files_and_directories__file_type_pdf"
    case UploadFileType.TableCalculation:
      return "files_and_directories__file_type_table_calculation"
    case UploadFileType.Video:
      return "files_and_directories__file_type_video"
    case UploadFileType.Text:
      return "files_and_directories__file_type_text"
  }
}

export const getIconNameFromMimeType = (mimeType: MimeType): IconName => {
  const fileExtension = getFileExtensionFromMimeType(mimeType)
  const fileType = fileExtensionToFileType(fileExtension.slice(1))
  return getIconNameFromFileType(fileType)
}
