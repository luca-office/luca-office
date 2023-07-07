import {FreetextQuestionRating} from "../../models"
import {surveyInvitationIdMock} from "./common"
import {getFreetextQuestionRatingCriterionSelectionsMock} from "./freetext-question-rating-criterion-selections.mock"
import {ratingsMock} from "./ratings.mock"

const questionId = "349916b7-9734-41d5-b825-493edbe5bfdd"

export const freetextQuestionRatingsMock: FreetextQuestionRating[] = [
  {
    __typename: "FreetextQuestionRating",
    id: "fa4a3f54-dd2e-4e98-8a99-ea9c0cc9fffc",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    questionId,
    surveyInvitationId: surveyInvitationIdMock,
    noCriterionFulfilled: false,
    criterionSelections: getFreetextQuestionRatingCriterionSelectionsMock("fa4a3f54-dd2e-4e98-8a99-ea9c0cc9fffc"),
    ratingId: ratingsMock[0].id
  },
  {
    __typename: "FreetextQuestionRating",
    id: "c98d6371-1593-4b7a-b7e4-5ed4c0d75c93",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    questionId,
    surveyInvitationId: surveyInvitationIdMock,
    noCriterionFulfilled: true,
    criterionSelections: getFreetextQuestionRatingCriterionSelectionsMock("c98d6371-1593-4b7a-b7e4-5ed4c0d75c93"),
    ratingId: ratingsMock[1].id
  },
  {
    __typename: "FreetextQuestionRating",
    id: "edc1a3fe-fabc-47df-9273-7137f5b479eb",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    questionId,
    surveyInvitationId: surveyInvitationIdMock,
    noCriterionFulfilled: false,
    criterionSelections: getFreetextQuestionRatingCriterionSelectionsMock("edc1a3fe-fabc-47df-9273-7137f5b479eb"),
    ratingId: ratingsMock[2].id
  }
]
