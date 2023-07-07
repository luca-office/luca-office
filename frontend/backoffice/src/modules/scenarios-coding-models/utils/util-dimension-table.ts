import {sum, sumBy} from "lodash-es"
import {CodingDimension, CodingItem} from "shared/models"
import {flatten} from "shared/utils"
import {DimensionTableEntity} from "../detail/common/dimensions-table/dimensions-table"

export const countItemsFromDimension = (codingDimension: CodingDimension, dimensions: CodingDimension[]): number =>
  sum(dimensions.filter(dimension => dimension.parentDimensionId === codingDimension.id).map(dim => dim.items.length)) +
  codingDimension.items.length

export const getTotalItems = (dimensions: CodingDimension[]) =>
  sum(
    dimensions
      .filter(dimension => dimension.parentDimensionId === null)
      .map(dim => countItemsFromDimension(dim, dimensions))
  )

export const accumulateItemScoreFromDimension = (codingDimension: CodingDimension, dimensions: CodingDimension[]) =>
  sumBy(
    flatten(dimensions.filter(dimension => dimension.parentDimensionId === codingDimension.id).map(dim => dim.items)),
    item => item.maximumScore
  ) + sumBy(codingDimension.items, item => item.maximumScore)

export const getTotalAccumulatedScore = (dimensions: CodingDimension[]) =>
  sum(
    dimensions
      .filter(dim => dim.parentDimensionId === null)
      .map(dimension => accumulateItemScoreFromDimension(dimension, dimensions))
  )

export const toTableItemEntity = (item: CodingItem): DimensionTableEntity => ({
  id: item.id,
  title: item.title,
  maxScore: item.maximumScore,
  scoringType: item.scoringType,
  position: item.position
})
