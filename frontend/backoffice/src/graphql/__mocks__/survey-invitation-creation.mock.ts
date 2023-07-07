import {surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {surveyIdMock} from "shared/graphql/__mocks__/common"
import {participantDataMock} from "shared/graphql/__mocks__/participant-data.mock"
import {participantProjectModuleProgressesMock} from "shared/graphql/__mocks__/participant-project-module-progresses.mock"
import {SurveyInvitationCreation} from "shared/graphql/generated/globalTypes"
import {SurveyInvitation} from "shared/models"

export const surveyInvitationCreationMock: SurveyInvitationCreation = {
  email: "hpollastrino1@linkedin.com",
  surveyId: surveyIdMock,
  userAccountId: userAccountMock.id
}

export const surveyInvitationCreationResultMock: SurveyInvitation = {
  __typename: "SurveyInvitation",
  ...surveyInvitationCreationMock,
  id: "d047c47f-338f-441f-a27e-cf1682bc9440",
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  token: "RMce2x",
  userAccountId: userAccountMock.id,
  participantData: participantDataMock[0],
  projectModuleProgresses: participantProjectModuleProgressesMock,
  survey: {...surveysMock[0], id: surveyIdMock},
  isOpenParticipation: false,
  userAccount: userAccountMock
}
