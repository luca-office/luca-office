import {UploadFileType as FileType} from "shared/enums"
import {LucaI18nLangKey} from "shared/translations"

export const getDeleteButtonKey = (deleteButtonKey: LucaI18nLangKey | undefined, fileType: FileType) => {
  if (deleteButtonKey) {
    return deleteButtonKey
  } else {
    switch (fileType) {
      case FileType.Graphic:
        return "file__delete_button_file_type_image"
      case FileType.PDF:
        return "file__delete_button_file_type_pdf"
      case FileType.Video:
        return "file__delete_button_file_type_video"
      default:
        return "file__delete_button_file_type_video"
    }
  }
}
export const getTitleKey = (titleKey: LucaI18nLangKey | undefined, fileType: FileType) => {
  if (titleKey) {
    return titleKey
  } else {
    switch (fileType) {
      case FileType.Graphic:
        return "file__edit_title_file_type_image"
      case FileType.PDF:
        return "file__edit_title_file_type_pdf"
      case FileType.Video:
        return "file__edit_title_file_type_video"
      default:
        return "file__edit_title_file_type_video"
    }
  }
}
