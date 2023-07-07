import {Dispatch, SetStateAction, useEffect, useState} from "react"
import {IconName, ViewerToolsType} from "shared/enums"
import {SettingsElementCount} from "../../settings/scenario-settings"
import {ViewerToolScenarioDetail} from "../settings-footer"

export interface UseSettingsFooterHook {
  readonly viewerTools: ViewerToolScenarioDetail[]
  readonly setViewerTools: Dispatch<SetStateAction<ViewerToolScenarioDetail[]>>
}

export const useSettingsFooter = (settingsCount: SettingsElementCount): UseSettingsFooterHook => {
  const defaultViewerTools: ViewerToolScenarioDetail[] = [
    {type: ViewerToolsType.PDF, icon: IconName.PdfViewer, isActive: true},
    {type: ViewerToolsType.Image, icon: IconName.ImageViewer, isActive: true},
    {type: ViewerToolsType.Video, icon: IconName.Film, isActive: true},
    {type: ViewerToolsType.TableEditor, icon: IconName.TableEditor, isActive: true},
    {type: ViewerToolsType.Text, icon: IconName.TextEditor, isActive: true},
    {
      type: ViewerToolsType.FilesAndDirectories,
      icon: IconName.FolderStack,
      isActive: settingsCount.directories > 0
    },
    {type: ViewerToolsType.Erp, icon: IconName.Database, isActive: settingsCount.erpRowCount > 0},
    {type: ViewerToolsType.Email, icon: IconName.Email, isActive: settingsCount.emails > 0},
    {type: ViewerToolsType.ReferenceBook, icon: IconName.Book, isActive: settingsCount.scenarioReferenceBooks > 0},
    {type: ViewerToolsType.Notes, icon: IconName.EditPencil, isActive: true},
    {type: ViewerToolsType.Calculator, icon: IconName.Calculator, isActive: true}
  ]

  const [viewerTools, setViewerTools] = useState(defaultViewerTools)

  useEffect(() => {
    setViewerTools(defaultViewerTools)
  }, [settingsCount])

  return {viewerTools, setViewerTools}
}
