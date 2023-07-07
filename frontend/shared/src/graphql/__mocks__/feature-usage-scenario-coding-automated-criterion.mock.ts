import {FeatureUsageScenarioCodingAutomatedCriterion} from "../../models"
import {FeatureType, OfficeTool} from "../generated/globalTypes"
import {automatedCodingItemMock} from "./coding-item.mock"

export const featureUsageScenarioCodingAutomatedCriterionMock: FeatureUsageScenarioCodingAutomatedCriterion = {
  __typename: "FeatureUsageScenarioCodingAutomatedCriterion",
  id: "618d31e7-7210-4630-a21b-2f7f54daccf2",
  score: 12,
  itemId: automatedCodingItemMock.id,
  officeTool: OfficeTool.EmailClient,
  featureType: FeatureType.AnswerEmail
}
