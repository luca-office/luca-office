import {sum} from "lodash"
import {TableEntity} from "shared/components/rating/models"
import {CodingDimension, CodingItem, CodingItemResultsByItemId} from "shared/models"

export const itemToTableEntity = (
  item: CodingItem,
  codingItemResultsByItem: CodingItemResultsByItemId
): TableEntity => ({
  id: item.id,
  title: item.title,
  position: item.position,
  score: codingItemResultsByItem[item.id]?.[0]?.score,
  maxScore: codingItemResultsByItem[item.id]?.[0]?.maximumScore,
  averageScore: codingItemResultsByItem[item.id]?.[0]?.averageScore,
  rated: true
})

export const dimensionToTableEntity = (
  dimension: CodingDimension,
  items: CodingItem[],
  codingItemResultsByItem: CodingItemResultsByItemId
): TableEntity => ({
  id: dimension.id,
  title: dimension.title,
  position: dimension.position,
  score: items.reduce(
    (acc, item) => acc + sum((codingItemResultsByItem[item.id] ?? []).map(result => result.score)),
    0
  ),
  maxScore: items.reduce((acc, item) => acc + codingItemResultsByItem[item.id]?.[0]?.maximumScore, 0),
  averageScore: items.reduce((acc, item) => acc + codingItemResultsByItem[item.id]?.[0]?.averageScore, 0),
  rated: true
})
