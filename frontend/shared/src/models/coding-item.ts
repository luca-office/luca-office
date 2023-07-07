import {
  CodingItemQuery_codingItem,
  CodingItemQuery_codingItem_AutomatedCodingItem,
  CodingItemQuery_codingItem_ManualCodingItem
} from "../graphql/generated/CodingItemQuery"

export type CodingItem = CodingItemQuery_codingItem
export type AutomatedCodingItem = CodingItemQuery_codingItem_AutomatedCodingItem
export type ManualCodingItem = CodingItemQuery_codingItem_ManualCodingItem
