import {FileType, ViewerToolsType} from "../enums"
import {FileUsageType, Relevance} from "../graphql/generated/globalTypes"
import {BinaryFile} from "./binary-file"
import {Spreadsheet} from "./spreadsheet"
import {TextDocument} from "./text-document"

export interface BaseFile {
  readonly fileType: FileType
  readonly id: string
  readonly usageType: FileUsageType
  readonly name: string
  readonly relevance: Relevance
  readonly tags: string[]
  readonly directoryId: string | null
  readonly emailId: string | null
}

export interface MediaFile extends BaseFile {
  readonly fileType: FileType.Media
  readonly binaryFileId: UUID
  readonly binaryFileUrl: UUID
  readonly binaryFile: BinaryFile
}

export interface SpreadsheetFile extends BaseFile {
  readonly fileType: FileType.Spreadsheet
  readonly spreadsheetId: UUID
  readonly spreadsheet: Spreadsheet
}

export interface TextDocumentFile extends BaseFile {
  readonly fileType: FileType.TextDocument
  readonly textDocument: TextDocument
  readonly textDocumentId: UUID
}

export interface OpenFileConfig {
  viewerTool: ViewerToolsType
  binaryId: UUID
  url: string
  title?: string
}

export interface OpenSpreadsheetFileConfig {
  spreadsheetId: UUID
  title?: string
}

export interface FilePreview {
  readonly id: UUID
  readonly viewerTool: ViewerToolsType
  readonly title: string
  readonly path: string
}

export type File = MediaFile | SpreadsheetFile | TextDocumentFile
