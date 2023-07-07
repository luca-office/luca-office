import {IconName, ViewerToolsType} from "../../../enums"
import {LucaI18nLangKey} from "../../../translations"

export interface ViewerToolsTypeMapping {
  icon: IconName
  label: LucaI18nLangKey
}

export function getToolTypeMapping(toolType: ViewerToolsType): ViewerToolsTypeMapping {
  switch (toolType) {
    case ViewerToolsType.Text:
      return {
        icon: IconName.TextEditor,
        label: "viewer_tools__text_type_label"
      }
    case ViewerToolsType.PDF:
      return {
        icon: IconName.PDF,
        label: "viewer_tools__pdf_type_label"
      }
    case ViewerToolsType.Image:
      return {
        icon: IconName.Images,
        label: "viewer_tools__image_type_label"
      }
    case ViewerToolsType.Video:
      return {
        icon: IconName.Film,
        label: "viewer_tools__video_type_label"
      }
    case ViewerToolsType.TableEditor:
      return {
        icon: IconName.TableEditor,
        label: "viewer_tools__calc_type_label"
      }
    case ViewerToolsType.Calculator:
      return {
        icon: IconName.Calculator,
        label: "calculator__label"
      }
    case ViewerToolsType.Email:
      return {
        icon: IconName.Email,
        label: "email__title"
      }
    case ViewerToolsType.Erp:
      return {
        icon: IconName.Database,
        label: "erp__title_full"
      }
    case ViewerToolsType.Event:
      return {
        icon: IconName.Event,
        label: "events__title"
      }
    case ViewerToolsType.ReferenceBook:
      return {
        icon: IconName.Book,
        label: "reference_book__title"
      }
    case ViewerToolsType.FilesAndDirectories:
      return {
        icon: IconName.FolderStack,
        label: "files_and_directories__title"
      }
    case ViewerToolsType.Notes:
      return {
        icon: IconName.Notes,
        label: "notes__label"
      }
    case ViewerToolsType.Chat:
      return {
        icon: IconName.SpeechBubble,
        label: "chat__title"
      }
    case ViewerToolsType.TextEditor:
      return {
        icon: IconName.TextEditor,
        label: "text_editor__label"
      }
    case ViewerToolsType.File:
    default:
      return {
        icon: IconName.File,
        label: "viewer_tools__general_type_label"
      }
  }
}
