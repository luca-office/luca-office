import {SelectOptionCustomized} from "shared/components"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {LucaTFunction} from "shared/translations"
import {iconForOfficeTool, labelKeyForOfficeTool} from "shared/utils"

export const toolUsageSelectOptions = (t: LucaTFunction): SelectOptionCustomized[] => [
  {
    label: t(labelKeyForOfficeTool(OfficeTool.EmailClient)),
    value: OfficeTool.EmailClient,
    iconName: iconForOfficeTool(OfficeTool.EmailClient)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.FileBrowser)),
    value: OfficeTool.FileBrowser,
    iconName: iconForOfficeTool(OfficeTool.FileBrowser)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.TextEditor)),
    value: OfficeTool.TextEditor,
    iconName: iconForOfficeTool(OfficeTool.TextEditor)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.ReferenceBookViewer)),
    value: OfficeTool.ReferenceBookViewer,
    iconName: iconForOfficeTool(OfficeTool.ReferenceBookViewer)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.Calculator)),
    value: OfficeTool.Calculator,
    iconName: iconForOfficeTool(OfficeTool.Calculator)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.Erp)),
    value: OfficeTool.Erp,
    iconName: iconForOfficeTool(OfficeTool.Erp)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.Notes)),
    value: OfficeTool.Notes,
    iconName: iconForOfficeTool(OfficeTool.Notes)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.SpreadsheetEditor)),
    value: OfficeTool.SpreadsheetEditor,
    iconName: iconForOfficeTool(OfficeTool.SpreadsheetEditor)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.ImageViewer)),
    value: OfficeTool.ImageViewer,
    iconName: iconForOfficeTool(OfficeTool.ImageViewer)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.PdfViewer)),
    value: OfficeTool.PdfViewer,
    iconName: iconForOfficeTool(OfficeTool.PdfViewer)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.VideoPlayer)),
    value: OfficeTool.VideoPlayer,
    iconName: iconForOfficeTool(OfficeTool.VideoPlayer)
  }
]

export const featureUsageToolSelectOptions = (t: LucaTFunction): SelectOptionCustomized[] => [
  {
    label: t(labelKeyForOfficeTool(OfficeTool.EmailClient)),
    value: OfficeTool.EmailClient,
    iconName: iconForOfficeTool(OfficeTool.EmailClient)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.ReferenceBookViewer)),
    value: OfficeTool.ReferenceBookViewer,
    iconName: iconForOfficeTool(OfficeTool.ReferenceBookViewer)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.Erp)),
    value: OfficeTool.Erp,
    iconName: iconForOfficeTool(OfficeTool.Erp)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.Notes)),
    value: OfficeTool.Notes,
    iconName: iconForOfficeTool(OfficeTool.Notes)
  },
  {
    label: t(labelKeyForOfficeTool(OfficeTool.SpreadsheetEditor)),
    value: OfficeTool.SpreadsheetEditor,
    iconName: iconForOfficeTool(OfficeTool.SpreadsheetEditor)
  }
]
