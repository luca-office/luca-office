import {getToolTypeMapping, ViewerToolsTypeMapping} from "../components/viewer-tools/tools-header/tools-type-mapping"
import {IconName, ViewerToolsType} from "../enums"
import {OfficeTool} from "../graphql/generated/globalTypes"

export const getViewerToolsTypeMappingByOfficeToolName = (officeTool: OfficeTool): ViewerToolsTypeMapping => {
  switch (officeTool) {
    case OfficeTool.Calculator: {
      return getToolTypeMapping(ViewerToolsType.Calculator)
    }
    case OfficeTool.EmailClient: {
      return getToolTypeMapping(ViewerToolsType.Email)
    }
    case OfficeTool.Erp: {
      return getToolTypeMapping(ViewerToolsType.Erp)
    }
    case OfficeTool.ImageViewer: {
      return getToolTypeMapping(ViewerToolsType.Image)
    }
    case OfficeTool.Notes: {
      return getToolTypeMapping(ViewerToolsType.Notes)
    }
    case OfficeTool.PdfViewer: {
      return getToolTypeMapping(ViewerToolsType.PDF)
    }
    case OfficeTool.ReferenceBookViewer: {
      return getToolTypeMapping(ViewerToolsType.ReferenceBook)
    }
    case OfficeTool.SpreadsheetEditor: {
      return getToolTypeMapping(ViewerToolsType.TableEditor)
    }
    case OfficeTool.TextEditor: {
      return getToolTypeMapping(ViewerToolsType.Text)
    }
    case OfficeTool.VideoPlayer: {
      return getToolTypeMapping(ViewerToolsType.Video)
    }
    case OfficeTool.FileBrowser:
    default:
      return getToolTypeMapping(ViewerToolsType.File)
  }
}
