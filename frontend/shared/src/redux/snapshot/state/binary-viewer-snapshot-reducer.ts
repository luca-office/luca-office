import {BinaryViewerTool, OfficeWindowType} from "../../../enums"
import {SurveyEventType} from "../../../graphql/generated/globalTypes"
import {SurveyEvent} from "../../../models"
import {SharedAppState} from "../../../redux/state"
import {BinaryViewerState, initialBinaryState} from "../../../redux/state/ui"
import {OpenBinaryEventProps, Option} from "../../../utils"

type BinaryEvents =
  | SurveyEventType.OpenImageBinary
  | SurveyEventType.OpenVideoBinary
  | SurveyEventType.OpenPdfBinary
  | SurveyEventType.CloseImageBinary
  | SurveyEventType.CloseVideoBinary
  | SurveyEventType.ClosePdfBinary

const binaryEventToViewerType = (binaryEvent: BinaryEvents) => {
  switch (binaryEvent) {
    case SurveyEventType.OpenImageBinary:
    case SurveyEventType.CloseImageBinary:
      return "imageViewer"
    case SurveyEventType.OpenVideoBinary:
    case SurveyEventType.CloseVideoBinary:
      return "videoPlayer"
    case SurveyEventType.OpenPdfBinary:
    case SurveyEventType.ClosePdfBinary:
      return "pdfViewer"
    default:
      return null
  }
}

export const binaryViewerSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): BinaryViewerState => {
  const binaryViewer = state.ui.binaryViewer

  switch (surveyEvent.eventType) {
    case SurveyEventType.OpenImageBinary:
    case SurveyEventType.OpenVideoBinary:
    case SurveyEventType.OpenPdfBinary: {
      const data = (surveyEvent.data as unknown) as OpenBinaryEventProps
      const viewerType = binaryEventToViewerType(surveyEvent.eventType)

      return viewerType !== null
        ? {
            ...binaryViewer,
            [viewerType]: {
              openBinaries: [
                ...binaryViewer[viewerType].openBinaries.filter(binary => binary.id !== data.binaryFileId),
                {
                  id: data.binaryFileId,
                  path: data.binaryFileUrl,
                  title: data.binaryFileTitle
                }
              ],
              selectedBinaryId: Option.of(data.binaryFileId)
            }
          }
        : binaryViewer
    }
    case SurveyEventType.CloseVideoBinary:
    case SurveyEventType.ClosePdfBinary:
    case SurveyEventType.CloseImageBinary: {
      const data = surveyEvent.data as {binaryId: UUID}
      const viewerType = binaryEventToViewerType(surveyEvent.eventType)

      if (viewerType !== null) {
        const newBinaries = binaryViewer[viewerType].openBinaries.filter(binary => binary.id !== data.binaryId)
        return {
          ...binaryViewer,
          [viewerType]: {
            openBinaries: newBinaries,
            selectedBinaryId: binaryViewer[viewerType].selectedBinaryId.map(binaryId => {
              if (binaryId === data.binaryId) {
                return newBinaries.length ? newBinaries[newBinaries.length - 1].id : null
              }
              return binaryId
            })
          }
        }
      } else {
        return binaryViewer
      }
    }

    case SurveyEventType.CloseTool: {
      const data = surveyEvent.data as {tool: OfficeWindowType}

      switch (data.tool) {
        case BinaryViewerTool.ImageViewer:
          return {...binaryViewer, imageViewer: initialBinaryState}
        case BinaryViewerTool.PDFViewer:
          return {...binaryViewer, pdfViewer: initialBinaryState}
        case BinaryViewerTool.VideoPlayer:
          return {...binaryViewer, videoPlayer: initialBinaryState}
        default:
          return binaryViewer
      }
    }

    default:
      return binaryViewer
  }
}
