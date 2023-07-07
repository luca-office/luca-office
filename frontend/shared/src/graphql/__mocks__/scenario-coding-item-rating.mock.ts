import {ScenarioCodingItemRating} from "../../models"
import {codingItemMock} from "./coding-item.mock"
import {ratingsMock} from "./ratings.mock"
import {scenarioRatingCriterionSelectionMock} from "./scenario-rating-criterion-selection.mock"

export const scenarioCodingItemRatingMock: ScenarioCodingItemRating = {
  __typename: "ScenarioCodingItemRating",
  id: "18de306c-a8f8-4311-9a2f-ca5418a245ac",
  createdAt: "2020-08-03 15:16:28.504000 +00:00",
  modifiedAt: "2020-08-03 15:16:28.504000 +00:00",
  noCriterionFulfilled: false,
  surveyInvitationId: "4a998fe3-587f-4325-b6e9-5a50db518f13",
  ratingId: ratingsMock[0].id,
  codingItemId: codingItemMock.id,
  criterionSelections: [scenarioRatingCriterionSelectionMock]
}
