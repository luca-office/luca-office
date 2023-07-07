import {CodingDimension, CodingItem} from "../../../models"
import {isDefined} from "../../../utils"

export const getCodingItemsFromCodingDimensions = (codingDimensions: CodingDimension[]): CodingItem[] =>
  codingDimensions.reduce(
    (accumulator, codingDimension) => [...accumulator, ...codingDimension.items],
    [] as CodingItem[]
  )

export const getSubDimensions = (
  codingDimension: CodingDimension,
  codingDimensions: CodingDimension[]
): CodingDimension[] =>
  isDefined(codingDimension.parentDimensionId)
    ? []
    : codingDimensions.filter(dimension => dimension.parentDimensionId === codingDimension.id)
