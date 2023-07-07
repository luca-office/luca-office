// important: enum values must equal tool event payload
export enum OfficeTool {
  Calculator = "Calculator",
  EmailClient = "EmailClient",
  FileBrowser = "FileBrowser",
  ReferenceBookViewer = "ReferenceBookViewer",
  SpreadsheetEditor = "SpreadsheetEditor",
  Erp = "Erp",
  Notes = "Notes",
  Chat = "Chat"
}

export enum BinaryViewerTool {
  ImageViewer = "ImageViewer",
  PDFViewer = "PdfViewer",
  VideoPlayer = "VideoPlayer",
  SpreadsheetEditor = "SpreadsheetEditor",
  TextEditor = "TextEditor"
}

export type OfficeWindowType = OfficeTool | BinaryViewerTool
