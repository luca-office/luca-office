// avoid top level imports from components in utils folders as it may cause dependency loops and break tests
import {BinaryType, FileType, IconName, ViewerToolsType} from "../enums"
import {MimeType} from "../graphql/generated/globalTypes"
import {File} from "../models"
import {LucaI18nLangKey} from "../translations"

export const iconForMimeType = (mimeType: MimeType): IconName => {
  switch (mimeType) {
    case MimeType.ImageJpeg:
    case MimeType.ImagePng:
    case MimeType.ImageSvg:
    case MimeType.ImageGif:
      return IconName.Image
    case MimeType.ApplicationPdf:
      return IconName.PDF
    case MimeType.VideoMp4:
      return IconName.Play
    case MimeType.Spreadsheet:
      return IconName.TableEditor
    case MimeType.TextHtml:
      return IconName.TextEditor
  }
}

export const getViewerToolForMimeType = (mimeType: MimeType): ViewerToolsType => {
  switch (mimeType) {
    case MimeType.ImageJpeg:
    case MimeType.ImagePng:
    case MimeType.ImageSvg:
    case MimeType.ImageGif:
      return ViewerToolsType.Image
    case MimeType.VideoMp4:
      return ViewerToolsType.Video
    case MimeType.ApplicationPdf:
      return ViewerToolsType.PDF
    case MimeType.Spreadsheet:
      return ViewerToolsType.TableEditor
    case MimeType.TextHtml:
      return ViewerToolsType.Text
  }
}

export const getLanguageKeyViewerTool = (mimeType: MimeType): LucaI18nLangKey => {
  switch (mimeType) {
    case MimeType.ImageJpeg:
    case MimeType.ImagePng:
    case MimeType.ImageSvg:
    case MimeType.ImageGif:
      return "viewer_tool_image"
    case MimeType.ApplicationPdf:
      return "viewer_tool_pdf"
    case MimeType.VideoMp4:
      return "viewer_tool_video"
    case MimeType.Spreadsheet:
      return "viewer_tool_spreadsheet"
    case MimeType.TextHtml:
      return "viewer_tool_text"
  }
}

export const getLanguageKeyViewerToolPreposition = (mimeType: MimeType): LucaI18nLangKey => {
  switch (mimeType) {
    case MimeType.Spreadsheet:
    case MimeType.TextHtml:
      return "viewer_tool_preposition_n"
    default:
      return "viewer_tool_preposition_m"
  }
}

export const getLanguageKeyFromMimeType = (mimeType: MimeType): LucaI18nLangKey => {
  switch (mimeType) {
    case MimeType.ImageJpeg:
    case MimeType.ImagePng:
    case MimeType.ImageSvg:
    case MimeType.ImageGif:
      return "files_and_directories__file_type_image"
    case MimeType.ApplicationPdf:
      return "files_and_directories__file_type_pdf"
    case MimeType.VideoMp4:
      return "files_and_directories__file_type_video"
    case MimeType.Spreadsheet:
      return "files_and_directories__file_type_table_calculation"
    case MimeType.TextHtml:
      return "files_and_directories__file_type_text"
  }
}

export const iconForBinaryType = (binaryType: BinaryType): IconName => {
  switch (binaryType) {
    case BinaryType.PDF:
      return IconName.PDF
    case BinaryType.Video:
      return IconName.Play
    case BinaryType.Image:
    default:
      return IconName.Image
  }
}

export const iconForFile = (file: File) =>
  file.fileType === FileType.Media
    ? iconForMimeType(file.binaryFile.mimeType)
    : file.fileType === FileType.TextDocument
    ? IconName.TextEditor
    : IconName.TableCalculation
