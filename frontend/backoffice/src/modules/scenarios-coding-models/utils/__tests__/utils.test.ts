import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {
  accumulateItemScoreFromDimension,
  countItemsFromDimension,
  getTotalAccumulatedScore
} from "../util-dimension-table"

describe("utils-coding-models", () => {
  it("should count one item - has no subdimension", () => {
    const count = countItemsFromDimension(codingDimensionsMock[0], codingDimensionsMock)
    expect(count).toEqual(1)
  })
  it("should count three item with 2 subdimension", () => {
    const count = countItemsFromDimension(codingDimensionsMock[1], codingDimensionsMock)
    expect(count).toEqual(3)
  })
  it("should count three item subdimension given", () => {
    const count = countItemsFromDimension(codingDimensionsMock[2], codingDimensionsMock)
    expect(count).toEqual(3)
  })
  it("should accumulate score of three items correctly", () => {
    const count = accumulateItemScoreFromDimension(codingDimensionsMock[1], codingDimensionsMock)
    expect(count).toEqual(32)
  })
  it("should accumulate score of one main dimension items correctly", () => {
    const count = accumulateItemScoreFromDimension(codingDimensionsMock[0], codingDimensionsMock)
    expect(count).toEqual(11)
  })
  it("should accumulate score of one sub dimension items correctly", () => {
    const count = accumulateItemScoreFromDimension(codingDimensionsMock[2], codingDimensionsMock)
    expect(count).toEqual(32)
  })
  it("should accumulate  total score of dimensions  correctly", () => {
    const count = getTotalAccumulatedScore(codingDimensionsMock)
    expect(count).toEqual(43)
  })
})
