import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {Binary} from "shared/models"
import {VideoViewerContainerSurveyEvents} from "shared/office-tools"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../../utils"

export const useVideoViewerSurveyEvents = (): VideoViewerContainerSurveyEvents => {
  const dispatch = useDispatch()

  const sendPlayVideoEvent = (fileId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.PlayVideo, {fileId})))

  const sendPauseVideoEvent = (fileId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.PauseVideo, {fileId})))

  const sendCloseBinaryEvent = (binaryId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CloseVideoBinary, {binaryId})))

  const sendSelectVideoEvent = (binary: Binary) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.SelectVideoBinary, {
          binaryFileId: binary.id,
          binaryFileUrl: binary.path,
          binaryFileTitle: binary.title ?? ""
        })
      )
    )

  return {sendPlayVideoEvent, sendPauseVideoEvent, sendCloseBinaryEvent, sendSelectVideoEvent}
}
