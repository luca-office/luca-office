import {SurveyInvitation} from "shared/models"
import {Option} from "shared/utils"

export const getParticipantName = (surveyInvitationOption: Option<SurveyInvitation>) => {
  return surveyInvitationOption.map(surveyInvitation =>
    surveyInvitation?.participantData !== null && surveyInvitation?.participantData !== undefined
      ? `${surveyInvitation.participantData.firstName} ${surveyInvitation.participantData.lastName}`
      : surveyInvitation?.token
  ) as Option<string>
}
