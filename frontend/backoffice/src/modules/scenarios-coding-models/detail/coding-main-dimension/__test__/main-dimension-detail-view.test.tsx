// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Heading} from "shared/components"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {CodingModelCommonDetailView} from "../../common/detail-view/coding-model-common-detail-view"
import {DimensionsTable} from "../../common/dimensions-table/dimensions-table"
import {MainDimensionDetailView} from "../main-dimension-detail-view"

describe("main-dimension-detail-view", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <MainDimensionDetailView
          isReadOnly={false}
          scenarioId="sdfsdf-sdflsk"
          codingDimension={codingDimensionsMock[0]}
          allCodingDimensions={codingDimensionsMock}
        />
      </MockedProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = mount(
      <MockedProvider>
        <MainDimensionDetailView
          isReadOnly={false}
          scenarioId="sdfsdf-sdflsk"
          codingDimension={codingDimensionsMock[0]}
          allCodingDimensions={codingDimensionsMock}
        />
      </MockedProvider>
    )

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(4)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(DimensionsTable).prop("isItemsTable")).toBe(true)
    expect(component.find(Button)).toHaveLength(4)
  })

  it("has correct structure without items", async () => {
    const component = mount(
      <MockedProvider>
        <MainDimensionDetailView
          isReadOnly={false}
          scenarioId="sdfsdf-sdflsk"
          codingDimension={codingDimensionsMock[1]}
          allCodingDimensions={codingDimensionsMock}
        />
      </MockedProvider>
    )

    expect(component.find(DimensionsTable).prop("isItemsTable")).toBe(false)
  })
})
