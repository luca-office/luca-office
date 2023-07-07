import {AutomatedCodingItem, CodingItem, ManualCodingItem} from "../../models"
import {AutomatedCodingItemRule, ScoringType} from "../generated/globalTypes"

export const manualCodingItemMock: ManualCodingItem = {
  __typename: "ManualCodingItem",
  maximumScore: 14,
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  description: "Beschreibung des Items",
  dimensionId: "5409334-dfposdf",
  position: 1,
  id: "fsdfs-pooüd",
  scoringType: ScoringType.Holistic,
  title: "Item Analytisch"
}
export const codingItemMock = manualCodingItemMock as CodingItem

export const automatedCodingItemMock: AutomatedCodingItem = {
  __typename: "AutomatedCodingItem",
  maximumScore: 14,
  createdAt: new Date(2020, 10, 5).toISOString(),
  modifiedAt: new Date(2020, 10, 15).toISOString(),
  description: "Beschreibung des Items",
  dimensionId: "5409334-dfposdf",
  position: 1,
  id: "fsdfs-pooüd",
  scoringType: ScoringType.Holistic,
  title: "Item Analytisch",
  rule: AutomatedCodingItemRule.ToolUsage
}
