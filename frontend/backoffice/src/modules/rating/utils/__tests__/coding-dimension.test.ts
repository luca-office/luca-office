import {getCodingItemsFromCodingDimensions, getSubDimensions} from "shared/components/rating/utils/coding-dimension"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {CodingItem} from "shared/models"

describe("coding-dimension", () => {
  describe("getCodingItemsFromCodingDimensions", () => {
    it("correctly returns coding-items", () => {
      const codingDimension = codingDimensionsMock[1]
      const codingDimensions = codingDimensionsMock.map(mock =>
        mock.id !== codingDimension.id ? {...mock, parentDimensionId: codingDimension.id} : mock
      )
      const codingItems = codingDimensions.reduce(
        (accumulator, dimension) => [...accumulator, ...dimension.items],
        [] as CodingItem[]
      )

      expect(getCodingItemsFromCodingDimensions(codingDimensions)).toEqual(codingItems)
    })
  })
  describe("getSubDimensions", () => {
    it("correctly returns sub-dimensions", () => {
      const codingDimension = codingDimensionsMock[0]
      const codingDimensions = codingDimensionsMock.map(mock =>
        mock.id !== codingDimension.id ? {...mock, parentDimensionId: codingDimension.id} : mock
      )
      const codingSubDimensions = codingDimensions.slice(1)

      expect(getSubDimensions(codingDimension, codingDimensions)).toEqual(codingSubDimensions)
    })
  })
})
