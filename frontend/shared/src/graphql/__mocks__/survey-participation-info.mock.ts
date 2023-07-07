import {SurveyParticipationInfo} from "../../models"
import {SurveyParticipationStatus} from "../generated/globalTypes"
import {surveyInvitationsMock} from "./survey-invitations.mock"

export const surveyParticipationInfoMock: SurveyParticipationInfo = {
  __typename: "SurveyParticipationInfo",
  surveyInvitation: surveyInvitationsMock[0],
  surveyParticipationStatus: SurveyParticipationStatus.ParticipationFinished
}
