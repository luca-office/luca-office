import {SurveyEventCreation, SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEventCreationWithoutIndex} from "shared/models/survey-event-creation-without-index"
import {formatDateForBackend} from "shared/utils"

export const createPreviewEvent = (
  eventType: SurveyEventType,
  data?: Record<string, unknown>
): SurveyEventCreationWithoutIndex => ({
  surveyId: "preview",
  eventType,
  invitationId: "preview",
  data: data !== undefined ? JSON.stringify(data) : null,
  timestamp: formatDateForBackend(new Date())
})
