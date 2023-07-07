import {TableEntity} from "../../../components/rating/models"
import {CodingDimension, CodingItem, CodingItemResultByItemId} from "../../../models"

export const itemToTableEntity = (
  item: CodingItem,
  codingItemResultsByItem: CodingItemResultByItemId
): TableEntity => ({
  id: item.id,
  title: item.title,
  position: item.position,
  score: codingItemResultsByItem[item.id].score,
  maxScore: codingItemResultsByItem[item.id].maximumScore,
  averageScore: codingItemResultsByItem[item.id].averageScore,
  rated: true
})

export const dimensionToTableEntity = (
  dimension: CodingDimension,
  items: CodingItem[],
  codingItemResultsByItem: CodingItemResultByItemId
): TableEntity => ({
  id: dimension.id,
  title: dimension.title,
  position: dimension.position,
  score: items.reduce((acc, item) => acc + codingItemResultsByItem[item.id].score, 0),
  maxScore: items.reduce((acc, item) => acc + codingItemResultsByItem[item.id].maximumScore, 0),
  averageScore: items.reduce((acc, item) => acc + codingItemResultsByItem[item.id].averageScore, 0),
  rated: true
})
