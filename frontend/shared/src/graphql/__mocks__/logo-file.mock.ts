import {FileFragment} from "../generated/FileFragment"
import {FileUsageType, Relevance} from "../generated/globalTypes"
import {binaryFileMock} from "./binary-file.mock"

export const logoFileMock: FileFragment = {
  __typename: "File",
  id: "85647abf-e975-4861-a835-8fab64c57046",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  usageType: FileUsageType.FileSystem,
  name: "logo",
  relevance: Relevance.PotentiallyHelpful,
  tags: [],
  directoryId: null,
  emailId: null,
  binaryFileId: binaryFileMock.id,
  spreadsheetId: null,
  binaryFile: binaryFileMock,
  binaryFileUrl: binaryFileMock.url,
  spreadsheet: null,
  textDocumentId: null,
  textDocument: null
}
