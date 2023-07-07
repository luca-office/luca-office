import {IconName} from "../../enums"
import {OfficeTool} from "../../graphql/generated/globalTypes"
import {getViewerToolsTypeMappingByOfficeToolName} from "../office-tool"

describe("office-tool", () => {
  describe("getViewerToolsTypeMappingByOfficeToolName", () => {
    it("returns correct value for OfficeTool.Calculator", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.Calculator)).toEqual({
        icon: IconName.Calculator,
        label: "calculator__label"
      })
    })
    it("returns correct value for OfficeTool.EmailClient", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.EmailClient)).toEqual({
        icon: IconName.Email,
        label: "email__title"
      })
    })
    it("returns correct value for OfficeTool.Erp", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.Erp)).toEqual({
        icon: IconName.Database,
        label: "erp__title_full"
      })
    })
    it("returns correct value for OfficeTool.ImageViewer", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.ImageViewer)).toEqual({
        icon: IconName.Images,
        label: "viewer_tools__image_type_label"
      })
    })
    it("returns correct value for OfficeTool.Notes", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.Notes)).toEqual({
        icon: IconName.Notes,
        label: "notes__label"
      })
    })
    it("returns correct value for OfficeTool.PdfViewer", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.PdfViewer)).toEqual({
        icon: IconName.PDF,
        label: "viewer_tools__pdf_type_label"
      })
    })
    it("returns correct value for OfficeTool.ReferenceBookViewer", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.ReferenceBookViewer)).toEqual({
        icon: IconName.Book,
        label: "reference_book__title"
      })
    })
    it("returns correct value for OfficeTool.SpreadsheetEditor", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.SpreadsheetEditor)).toEqual({
        icon: IconName.TableEditor,
        label: "viewer_tools__calc_type_label"
      })
    })
    it("returns correct value for OfficeTool.TextEditor", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.TextEditor)).toEqual({
        icon: IconName.TextEditor,
        label: "viewer_tools__text_type_label"
      })
    })
    it("returns correct value for OfficeTool.VideoPlayer", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.VideoPlayer)).toEqual({
        icon: IconName.Film,
        label: "viewer_tools__video_type_label"
      })
    })
    it("returns correct value for OfficeTool.FileBrowser", () => {
      expect(getViewerToolsTypeMappingByOfficeToolName(OfficeTool.FileBrowser)).toEqual({
        icon: IconName.File,
        label: "viewer_tools__general_type_label"
      })
    })
  })
})
