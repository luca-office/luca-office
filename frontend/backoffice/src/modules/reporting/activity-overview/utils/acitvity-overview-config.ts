import {ChartOptions} from "chart.js"
import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "shared/enums"
import {convertSecondsToTimeString} from "shared/utils"

export enum DocumentActivity {
  RequiredDocuments = "RequiredDocuments",
  IrrelevantDocuments = "IrrelevantDocuments",
  Inactivity = "Inactivity"
}

export const colors = new Map<OfficeWindowType | DocumentActivity, string>([
  [OfficeTool.Calculator, "#68d4cd"],
  [OfficeTool.EmailClient, "#9ceb8f"],
  [OfficeTool.Notes, "#94dafb"],
  [OfficeTool.FileBrowser, "#fd8080"],
  [OfficeTool.ReferenceBookViewer, "#26a0fc"],
  [OfficeTool.Erp, "#26e7a6"],
  [BinaryViewerTool.PDFViewer, "#8b75d7"],
  [BinaryViewerTool.TextEditor, "#fab1b2"],
  [BinaryViewerTool.ImageViewer, "#ff0000"],
  [BinaryViewerTool.VideoPlayer, "#fd80e1"],
  [BinaryViewerTool.SpreadsheetEditor, "#febc3b"],
  [DocumentActivity.Inactivity, "#8b75d7"],
  [DocumentActivity.IrrelevantDocuments, "#febc3b"],
  [DocumentActivity.RequiredDocuments, "#68d4cd"]
])

export const allDisplayWindows = [
  OfficeTool.Calculator,
  OfficeTool.EmailClient,
  OfficeTool.Notes,
  OfficeTool.FileBrowser,
  OfficeTool.ReferenceBookViewer,
  OfficeTool.Erp,
  BinaryViewerTool.PDFViewer,
  BinaryViewerTool.TextEditor,
  BinaryViewerTool.ImageViewer,
  BinaryViewerTool.VideoPlayer,
  BinaryViewerTool.SpreadsheetEditor
]

export const allDocumentActivity = [
  DocumentActivity.RequiredDocuments,
  DocumentActivity.IrrelevantDocuments,
  DocumentActivity.Inactivity
]

export interface YScale {
  min: number
  max: number
}

export const defaultOptions = (endTime: number, yScale?: YScale): ChartOptions => {
  return {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      xAxes: {
        min: 0,
        max: endTime,
        ticks: {
          callback: (value, index, values) => {
            if (index === 0 || index === values.length - 1 || index === values.length / 2 - 1) {
              return typeof value === "number" ? convertSecondsToTimeString(value) : value
            }
            return ""
          }
        },
        grid: {
          display: false
        }
      },
      yAxes: {
        min: yScale?.min,
        max: yScale?.max,
        ticks: {
          display: yScale !== undefined
        },
        grid: {
          display: false
        }
      }
    }
  }
}
