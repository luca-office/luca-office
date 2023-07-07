import {getMaxScoreOfAllCodingItems} from "shared/components/rating/utils/coding-item"
import {codingDimensionsMock} from "shared/graphql/__mocks__"

describe("coding-item", () => {
  describe("getMaxScoreOfAllCodingItems", () => {
    it("correctly returns max score of all codingItems", () => {
      expect(getMaxScoreOfAllCodingItems(codingDimensionsMock[0].items)).toEqual(11)
      expect(getMaxScoreOfAllCodingItems(codingDimensionsMock[1].items)).toEqual(0)
      expect(getMaxScoreOfAllCodingItems(codingDimensionsMock[2].items)).toEqual(32)
    })
  })
})
