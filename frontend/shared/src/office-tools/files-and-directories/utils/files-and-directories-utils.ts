import {FileType} from "../../../enums"
import {FileUsageType} from "../../../graphql/generated/globalTypes"
import {Directory, File} from "../../../models"
import {SpreadsheetState, TextDocumentsState} from "../../../redux/state/data"
import {localSpreadsheetsToSpreadsheet} from "../../../utils"
import {localTextDocumentToTextDocument} from "../../../utils/text-document"

export const filesAndDirsDownloadId = "downloads"

export const getDownloadRoot = (scenarioId: UUID, name = "Downloads") => ({
  id: filesAndDirsDownloadId,
  createdAt: "",
  modifiedAt: "",
  parentDirectoryId: null,
  sampleCompanyId: null,
  name,
  scenarioId
})

export const isSampleCompanyRootDirectory = (directory: Directory) =>
  directory.parentDirectoryId === null && directory.sampleCompanyId !== null

export const combineFiles = (
  files: File[],
  sampleCompanyFiles: File[],
  availableEmailFiles: UUID[],
  localeSpreadsheets: SpreadsheetState,
  localTextDocuments: TextDocumentsState
): File[] => {
  const combinedFiles = [
    ...files.filter(({usageType}) => usageType === FileUsageType.FileSystem),
    ...sampleCompanyFiles,
    ...files
      .filter(({usageType, id}) => usageType === FileUsageType.Email && availableEmailFiles.includes(id))
      .map(file => ({...file, directoryId: filesAndDirsDownloadId}))
  ]
  const spreadsheets = localSpreadsheetsToSpreadsheet(localeSpreadsheets)
  const spreadsheetIds = spreadsheets.map(spreadsheet => spreadsheet.id)

  const textDocuments = localTextDocumentToTextDocument(localTextDocuments)
  const textDocumentIds = textDocuments.map(document => document.id)

  return combinedFiles.map(file => {
    if (file.fileType === FileType.Spreadsheet && spreadsheetIds.includes(file.spreadsheetId)) {
      const spreadsheet = spreadsheets.find(sheet => sheet.id === file.spreadsheetId)

      return {
        ...file,
        ...(spreadsheet && {spreadsheet})
      }
    } else if (file.fileType === FileType.TextDocument && textDocumentIds.includes(file.textDocumentId)) {
      const textDocument = textDocuments.find(document => document.id === file.textDocumentId)

      return {
        ...file,
        ...(textDocument && {textDocument})
      }
    }

    return file
  })
}
