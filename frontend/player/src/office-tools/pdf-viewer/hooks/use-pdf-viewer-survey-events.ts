import {Binary} from "shared/models"
import {PdfViewerSurveyEvents} from "shared/office-tools"
import {sendClosePdfBinaryEvent, sendSelectPdfBinaryEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const usePdfViewerSurveyEvents = (scenarioId: UUID): PdfViewerSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => handler(surveyId, invitationId, scenarioId))
    )
  const sendCloseBinaryEvent = (binaryId: UUID) => withSurveyParams(sendClosePdfBinaryEvent(binaryId))

  const sendSelectPdfEvent = (binary: Binary) => withSurveyParams(sendSelectPdfBinaryEvent(binary))

  return {sendCloseBinaryEvent, sendSelectPdfEvent}
}
