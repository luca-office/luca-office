import {Rating} from "../../models"
import {surveyIdMock} from "./common"
import {userAccountMock} from "./user-account.mock"

export const ratingsMock: Rating[] = [
  {
    __typename: "Rating",
    id: "7bb7474f-6563-4d8b-b6d5-ed24e96fe3ba",
    createdAt: new Date(2019, 10, 5).toISOString(),
    modifiedAt: new Date(2019, 10, 15).toISOString(),
    finalizedAt: null,
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    isFinalScore: true
  },
  {
    __typename: "Rating",
    id: "c4a8d1b8-8484-47b9-8c66-63189006fa07",
    createdAt: new Date(2019, 10, 5).toISOString(),
    modifiedAt: new Date(2019, 10, 15).toISOString(),
    finalizedAt: new Date(2019, 10, 20).toISOString(),
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    isFinalScore: false
  },
  {
    __typename: "Rating",
    id: "6e3a70f1-ff21-4644-bb0d-11d2f79899f2",
    createdAt: new Date(2019, 10, 5).toISOString(),
    modifiedAt: new Date(2019, 10, 15).toISOString(),
    finalizedAt: null,
    surveyId: surveyIdMock,
    userAccountId: userAccountMock.id,
    isFinalScore: true
  }
]
