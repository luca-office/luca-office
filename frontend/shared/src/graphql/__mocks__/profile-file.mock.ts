import {FileFragment} from "../generated/FileFragment"
import {FileUsageType, Relevance} from "../generated/globalTypes"
import {binaryFileMock} from "./binary-file.mock"

export const profileFileMock: FileFragment = {
  __typename: "File",
  id: "efc49abf-ce92-4040-9653-7bbe0da6c67f",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  usageType: FileUsageType.FileSystem,
  name: "mock-file",
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
