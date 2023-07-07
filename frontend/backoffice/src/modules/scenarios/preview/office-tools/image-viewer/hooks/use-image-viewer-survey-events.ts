import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {Binary} from "shared/models"
import {ImageViewerSurveyEvents} from "shared/office-tools"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../../utils"

export const useImageViewerSurveyEvents = (): ImageViewerSurveyEvents => {
  const dispatch = useDispatch()

  const sendCloseBinaryEvent = (binaryId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CloseImageBinary, {binaryId})))

  const sendSelectImageEvent = (binary: Binary) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.SelectImageBinary, {
          binaryFileId: binary.id,
          binaryFileUrl: binary.path,
          binaryFileTitle: binary.title ?? ""
        })
      )
    )

  return {
    sendCloseBinaryEvent,
    sendSelectImageEvent
  }
}
