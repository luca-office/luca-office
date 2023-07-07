import {BinaryViewerTool} from "../../enums"
import {BinaryViewerState} from "../state/ui"

export const mapViewerStateToType = (viewerType: keyof BinaryViewerState): BinaryViewerTool => {
  switch (viewerType) {
    case "pdfViewer":
      return BinaryViewerTool.PDFViewer
    case "videoPlayer":
      return BinaryViewerTool.VideoPlayer
    case "imageViewer":
    default:
      return BinaryViewerTool.ImageViewer
  }
}
