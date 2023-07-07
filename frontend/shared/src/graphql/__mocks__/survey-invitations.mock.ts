import {SurveyInvitation} from "../../models"
import {surveyIdMock} from "./common"
import {participantDataMock} from "./participant-data.mock"
import {participantProjectModuleProgressesMock} from "./participant-project-module-progresses.mock"
import {surveysMock} from "./surveys.mock"
import {userAccountMock} from "./user-account.mock"

const survey = {...surveysMock[0], id: surveyIdMock}

export const surveyInvitationsMock: SurveyInvitation[] = [
  {
    __typename: "SurveyInvitation",
    id: "929530b1-32fb-4e17-a95c-67fea58428cd",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    token: "Y4Fmcx",
    email: "hpollastrino1@linkedin.com",
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    participantData: participantDataMock[0],
    projectModuleProgresses: participantProjectModuleProgressesMock,
    survey,
    isOpenParticipation: true,
    userAccount: userAccountMock
  },
  {
    __typename: "SurveyInvitation",
    id: "5a3d6363-854e-4147-9bb2-a4a108b8e6cd",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    token: "FSNHPP",
    email: "ccutill3@fda.gov",
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    participantData: participantDataMock[1],
    projectModuleProgresses: participantProjectModuleProgressesMock,
    survey,
    isOpenParticipation: false,
    userAccount: userAccountMock
  },
  {
    __typename: "SurveyInvitation",
    id: "4bd2bcce-2154-40a6-a295-d66ad3a19e57",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    token: "fOrQrO",
    email: "whawtin8@dyndns.org",
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    participantData: participantDataMock[2],
    projectModuleProgresses: participantProjectModuleProgressesMock,
    survey,
    isOpenParticipation: true,
    userAccount: userAccountMock
  }
]
