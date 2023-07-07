import {ScenarioCodingItemRating} from "../../models"
import {automatedCodingItemMock, manualCodingItemMock} from "./coding-item.mock"
import {surveyInvitationIdMock} from "./common"
import {ratingsMock} from "./ratings.mock"
import {
  scenarioRatingAutomatedCriterionSelectionsMock,
  scenarioRatingCriterionSelectionHolisticMock,
  scenarioRatingManualCriterionSelectionsMock
} from "./scenario-rating-criterion-selections.mock"

export const scenarioManualCodingItemRatingsMock: ScenarioCodingItemRating[] = [
  {
    __typename: "ScenarioCodingItemRating",
    id: "5a04d90c-3743-4b8c-bac6-3139b7f1fb70",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    noCriterionFulfilled: false,
    surveyInvitationId: surveyInvitationIdMock,
    ratingId: ratingsMock[0].id,
    criterionSelections: scenarioRatingManualCriterionSelectionsMock,
    codingItemId: manualCodingItemMock.id
  },
  {
    __typename: "ScenarioCodingItemRating",
    id: "5c2f06ea-821d-4579-9f5d-27567863023f",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    noCriterionFulfilled: false,
    surveyInvitationId: surveyInvitationIdMock,
    ratingId: ratingsMock[1].id,
    criterionSelections: scenarioRatingManualCriterionSelectionsMock,
    codingItemId: manualCodingItemMock.id
  },
  {
    __typename: "ScenarioCodingItemRating",
    id: "cb3c9ae1-c2ac-4baa-ac7e-4f269415be2c",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    noCriterionFulfilled: false,
    surveyInvitationId: surveyInvitationIdMock,
    ratingId: ratingsMock[2].id,
    criterionSelections: scenarioRatingCriterionSelectionHolisticMock,
    codingItemId: manualCodingItemMock.id
  }
]

export const scenarioAutomatedCodingItemRatingsMock: ScenarioCodingItemRating[] = [
  {
    __typename: "ScenarioCodingItemRating",
    id: "5a04d90c-3743-4b8c-bac6-3139b7f1fb71",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    noCriterionFulfilled: false,
    surveyInvitationId: surveyInvitationIdMock,
    ratingId: ratingsMock[0].id,
    criterionSelections: scenarioRatingAutomatedCriterionSelectionsMock,
    codingItemId: automatedCodingItemMock.id
  },
  {
    __typename: "ScenarioCodingItemRating",
    id: "5c2f06ea-821d-4579-9f5d-27567863023g",
    createdAt: new Date(2020, 10, 5).toISOString(),
    modifiedAt: new Date(2020, 10, 15).toISOString(),
    noCriterionFulfilled: false,
    surveyInvitationId: surveyInvitationIdMock,
    ratingId: ratingsMock[1].id,
    criterionSelections: scenarioRatingAutomatedCriterionSelectionsMock,
    codingItemId: automatedCodingItemMock.id
  }
]
