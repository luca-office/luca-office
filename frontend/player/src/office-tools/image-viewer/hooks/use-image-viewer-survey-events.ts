import {Binary} from "shared/models"
import {ImageViewerSurveyEvents} from "shared/office-tools"
import {sendCloseImageBinaryEvent, sendSelectImageBinaryEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useImageViewerSurveyEvents = (scenarioId: UUID): ImageViewerSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => handler(surveyId, invitationId, scenarioId))
    )

  const sendCloseBinaryEvent = (binaryId: UUID) => withSurveyParams(sendCloseImageBinaryEvent(binaryId))

  const sendSelectImageEvent = (binary: Binary) => withSurveyParams(sendSelectImageBinaryEvent(binary))

  return {sendCloseBinaryEvent, sendSelectImageEvent}
}
