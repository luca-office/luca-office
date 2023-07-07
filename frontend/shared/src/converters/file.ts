import {FileType} from "../enums"
import {FileFragment} from "../graphql/generated/FileFragment"
import {File} from "../models"

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const toFile = (file: FileFragment): File => {
  const baseFile = {
    id: file.id,
    usageType: file.usageType,
    name: file.name,
    relevance: file.relevance,
    tags: file.tags,
    directoryId: file.directoryId,
    emailId: file.emailId
  }

  return file.binaryFileId !== null
    ? {
        ...baseFile,
        fileType: FileType.Media,
        binaryFile: file.binaryFile!,
        binaryFileId: file.binaryFileId,
        binaryFileUrl: file.binaryFileUrl!
      }
    : file.textDocumentId !== null
    ? {
        ...baseFile,
        fileType: FileType.TextDocument,
        textDocument: file.textDocument!,
        textDocumentId: file.textDocumentId
      }
    : {
        ...baseFile,
        fileType: FileType.Spreadsheet,
        spreadsheet: file.spreadsheet!,
        spreadsheetId: file.spreadsheetId!
      }
}
