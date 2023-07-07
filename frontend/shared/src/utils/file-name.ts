import {FileType} from "../enums"
import {MimeType} from "../graphql/generated/globalTypes"
import {File, MediaFile} from "../models"

export const removeFileExtension = (filename: string) =>
  filename.includes(".") ? filename.split(".").slice(0, -1).join(".") : filename

export const addFileExtension = (filename: string, extension: string) => `${filename}${extension}`

export const getFileExtensionFromMimeType = (mimeType: MimeType) => {
  switch (mimeType) {
    case MimeType.ApplicationPdf:
      return ".pdf"
    case MimeType.ImageJpeg:
      return ".jpg"
    case MimeType.ImagePng:
      return ".png"
    case MimeType.ImageGif:
      return ".gif"
    case MimeType.ImageSvg:
      return ".svg"
    case MimeType.VideoMp4:
      return ".mp4"
    case MimeType.Spreadsheet:
      return ".xlsx"
    case MimeType.TextHtml:
      return ".txt"
  }
}

export const spreadsheetFileExtension = ".xlsx"

export const textDocumentFileExtension = ".txt"

export const mapFileToMimeType = (file: File): MimeType => {
  switch (file.fileType) {
    case FileType.Media:
      return (file as MediaFile).binaryFile.mimeType
    case FileType.Spreadsheet:
      return MimeType.Spreadsheet
    case FileType.TextDocument:
      return MimeType.TextHtml
  }
}
