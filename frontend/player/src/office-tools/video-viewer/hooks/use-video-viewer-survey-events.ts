import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {Binary} from "shared/models"
import {VideoViewerContainerSurveyEvents} from "shared/office-tools"
import {sendCloseVideoBinaryEvent, sendScenarioSurveyEvent, sendSelectVideoBinaryEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useVideoViewerSurveyEvents = (scenarioId: UUID): VideoViewerContainerSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const sendPlayVideoEvent = (fileId: UUID) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId =>
        sendScenarioSurveyEvent({
          surveyId,
          invitationId,
          scenarioId,
          eventType: SurveyEventType.PlayVideo,
          data: {fileId}
        })
      )
    )

  const sendPauseVideoEvent = (fileId: UUID) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId =>
        sendScenarioSurveyEvent({
          surveyId,
          invitationId,
          scenarioId,
          eventType: SurveyEventType.PauseVideo,
          data: {fileId}
        })
      )
    )

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => handler(surveyId, invitationId, scenarioId))
    )

  const sendCloseBinaryEvent = (binaryId: UUID) => withSurveyParams(sendCloseVideoBinaryEvent(binaryId))

  const sendSelectVideoEvent = (binary: Binary) => withSurveyParams(sendSelectVideoBinaryEvent(binary))

  return {sendPlayVideoEvent, sendPauseVideoEvent, sendCloseBinaryEvent, sendSelectVideoEvent}
}
