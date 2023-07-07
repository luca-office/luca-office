import {
  participantDataMock,
  participantProjectModuleProgressesMock,
  surveyIdMock,
  surveysMock,
  userAccountMock
} from "shared/graphql/__mocks__"
import {SurveyInvitation} from "shared/models"

const survey = {...surveysMock[0], id: surveyIdMock}

export const surveyInvitationMock: SurveyInvitation = {
  __typename: "SurveyInvitation",
  id: "8a49147d-3c8b-4995-95bf-ab4ab9299791",
  isOpenParticipation: false,
  survey,
  token: "sdfdss",
  userAccountId: userAccountMock.id,
  userAccount: userAccountMock,
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  email: "info@cap3.de",
  surveyId: surveyIdMock,
  participantData: participantDataMock[0],
  projectModuleProgresses: participantProjectModuleProgressesMock
}
