import {useDispatch} from "react-redux"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {Binary} from "shared/models"
import {PdfViewerSurveyEvents} from "shared/office-tools"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../../utils"

export const usePdfViewerSurveyEvents = (): PdfViewerSurveyEvents => {
  const dispatch = useDispatch()

  const sendCloseBinaryEvent = (binaryId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ClosePdfBinary, {binaryId})))

  const sendSelectPdfEvent = (binary: Binary) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.SelectPdfBinary, {
          binaryFileId: binary.id,
          binaryFileUrl: binary.path,
          binaryFileTitle: binary.title ?? ""
        })
      )
    )

  return {sendCloseBinaryEvent, sendSelectPdfEvent}
}
