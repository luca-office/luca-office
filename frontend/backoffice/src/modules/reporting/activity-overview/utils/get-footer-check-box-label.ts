import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "shared/enums"
import {LucaTFunction} from "shared/translations"
import {DocumentActivity} from "./acitvity-overview-config"

export const getFooterCheckBoxLabel = (checkBox: OfficeWindowType | DocumentActivity, t: LucaTFunction) => {
  switch (checkBox) {
    case BinaryViewerTool.ImageViewer:
      return t("viewer_tool_image")
    case BinaryViewerTool.SpreadsheetEditor:
      return t("viewer_tool_spreadsheet")
    case BinaryViewerTool.VideoPlayer:
      return t("viewer_tool_video")
    case BinaryViewerTool.TextEditor:
      return t("viewer_tool_text")
    case BinaryViewerTool.PDFViewer:
      return t("viewer_tool_pdf")
    case OfficeTool.Calculator:
      return t("calculator__label")
    case OfficeTool.Chat:
      return t("chat__title")
    case OfficeTool.EmailClient:
      return t("email_short")
    case OfficeTool.FileBrowser:
      return t("directories_and_files__title")
    case OfficeTool.Erp:
      return t("erp__title")
    case OfficeTool.Notes:
      return t("notes__label")
    case OfficeTool.ReferenceBookViewer:
      return t("reference_book__title")
    case OfficeTool.SpreadsheetEditor:
      return t("viewer_tool_spreadsheet")
    case DocumentActivity.RequiredDocuments:
      return t("activity_tool_usage__required_documents")
    case DocumentActivity.IrrelevantDocuments:
      return t("activity_tool_usage__irrelevant_documents")
    case DocumentActivity.Inactivity:
      return t("activity_tool_usage__inactivity")
    default:
      return ""
  }
}
