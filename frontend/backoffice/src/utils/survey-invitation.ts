import {SurveyInvitationLight} from "shared/models"

export const getUserIdentificationFromSurveyInvitation = (surveyInvitation: SurveyInvitationLight) => {
  const participantData = surveyInvitation.participantData
  const token = surveyInvitation.token

  if (participantData !== null) {
    return `${participantData.firstName} ${participantData.lastName}`
  } else {
    return token
  }
}
