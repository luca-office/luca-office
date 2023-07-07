import {toFile} from "../../converters"
import {File} from "../../models"
import {FileUsageType, MimeType, Relevance} from "../generated/globalTypes"

export const fileMock: File = toFile({
  __typename: "File",
  id: "123",
  createdAt: "2020-07-21T12:15:48.373Z",
  modifiedAt: "2020-08-21T12:15:48.373Z",
  binaryFileId: "fsfjd-sdflkjsd",
  binaryFileUrl: "www.url.de",
  directoryId: "sdöflksd-sdfijsd-sdfds",
  emailId: "dsfpos-weirje-aasd-243q",
  relevance: Relevance.PotentiallyHelpful,
  tags: [],
  usageType: FileUsageType.FileSystem,
  name: "file.png",
  binaryFile: {
    __typename: "BinaryFile",
    filename: "file1.png",
    id: "2af6deab-4888-422a-9516-4fe40479d5e3",
    mimeType: MimeType.ImagePng,
    url: "https://luca-develop.s3.eu-central-1.amazonaws.com/2af6deab-4888-422a-9516-4fe40479d5e3",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    fileSize: 1
  },
  spreadsheetId: null,
  spreadsheet: null,
  textDocumentId: null,
  textDocument: null
})
