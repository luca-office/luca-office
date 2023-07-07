import {BinaryViewerTool, IconName, OfficeTool, OfficeWindowType} from "../../../enums"

export interface TaskbarItem {
  readonly tool: OfficeWindowType
  readonly iconName: IconName
}

export const officeToolWindows: TaskbarItem[] = [
  {
    tool: OfficeTool.EmailClient,
    iconName: IconName.Email
  },
  {
    tool: OfficeTool.Calculator,
    iconName: IconName.Calculator
  },
  {
    tool: OfficeTool.ReferenceBookViewer,
    iconName: IconName.Book
  },
  {
    tool: OfficeTool.FileBrowser,
    iconName: IconName.FolderStack
  },
  {
    tool: OfficeTool.Erp,
    iconName: IconName.Database
  },
  {
    tool: OfficeTool.Notes,
    iconName: IconName.Notes
  },
  {
    tool: OfficeTool.Chat,
    iconName: IconName.SpeechBubble
  }
]

export const binaryViewerWindows: TaskbarItem[] = [
  {
    tool: BinaryViewerTool.ImageViewer,
    iconName: IconName.ImageViewer
  },
  {
    tool: BinaryViewerTool.PDFViewer,
    iconName: IconName.PDF
  },
  {
    tool: BinaryViewerTool.VideoPlayer,
    iconName: IconName.Film
  },
  {
    tool: BinaryViewerTool.SpreadsheetEditor,
    iconName: IconName.TableCalculation
  },
  {
    tool: BinaryViewerTool.TextEditor,
    iconName: IconName.TextEditor
  }
]
