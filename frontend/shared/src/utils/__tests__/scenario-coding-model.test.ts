import {codingDimensionsMock} from "../../graphql/__mocks__"
import {Option} from "../option"
import {getExpandedNodeIdsFromCodingDimensions} from "../scenario-coding-model"

describe("utils-coding-models-tree", () => {
  it("should get no expanded Id", () => {
    const expandedNodeIds = getExpandedNodeIdsFromCodingDimensions(Option.none(), codingDimensionsMock)
    expect(expandedNodeIds).toHaveLength(0)
  })
  it("should get expanded id correct for main dimension", () => {
    const expandedNodeIds = getExpandedNodeIdsFromCodingDimensions(
      Option.of(codingDimensionsMock[0].id),
      codingDimensionsMock
    )
    expect(expandedNodeIds).toEqual(["daad-adasd-asd"])
  })
  it("should get expanded ids correct for sub dimension", () => {
    const expandedNodeIds = getExpandedNodeIdsFromCodingDimensions(
      Option.of(codingDimensionsMock[2].id),
      codingDimensionsMock
    )
    expect(expandedNodeIds).toEqual(["daad-adasd-asd-sdfsipjfs", "daad-adasd-ölmxcvor"])
  })
})
