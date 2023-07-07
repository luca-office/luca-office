import {ToolUsageScenarioCodingAutomatedCriterion} from "../../models"
import {OfficeTool} from "../generated/globalTypes"
import {automatedCodingItemMock} from "./coding-item.mock"

export const toolUsageScenarioCodingAutomatedCriterionMock: ToolUsageScenarioCodingAutomatedCriterion = {
  __typename: "ToolUsageScenarioCodingAutomatedCriterion",
  id: "34d25fb2-c819-4941-8d11-e1d0d1e5154b",
  score: 12,
  itemId: automatedCodingItemMock.id,
  officeTool: OfficeTool.EmailClient
}
