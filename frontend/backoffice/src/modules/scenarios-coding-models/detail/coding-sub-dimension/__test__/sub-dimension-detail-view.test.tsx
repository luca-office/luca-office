// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, Heading} from "shared/components"
import {codingDimensionsMock} from "shared/graphql/__mocks__"
import {ScoringType} from "shared/graphql/generated/globalTypes"
import {ResortModal} from "../../../../../components"
import {CreateItemModal} from "../../../create/create-item/create-item-modal"
import {CodingModelCommonDetailView} from "../../common/detail-view/coding-model-common-detail-view"
import {DimensionsTable} from "../../common/dimensions-table/dimensions-table"
import {SubDimensionDetailView} from "../sub-dimension-detail-view"

describe("sub-dimension-detail-view", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <SubDimensionDetailView
          navigateToItemDetail={jest.fn()}
          isRepositionLoading={false}
          isSortModalVisible={false}
          repositionItems={jest.fn()}
          setIsSortModalVisible={jest.fn()}
          scenarioId="sfsdlfksd"
          isReadOnly={false}
          setShowCreateItemModal={jest.fn()}
          showCreateItemModal={false}
          deleteCodingDimensionHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          deleteCodingItemHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          updateCodingDimension={jest.fn()}
          maxScore={100}
          codingDimension={codingDimensionsMock[0]}
          entities={[{id: "sdfsfsdsdfsdf", scoringType: ScoringType.Analytical, maxScore: 15, title: "Item 1"}]}
        />
      </MockedProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = mount(
      <MockedProvider>
        <SubDimensionDetailView
          navigateToItemDetail={jest.fn()}
          isRepositionLoading={false}
          isSortModalVisible={false}
          repositionItems={jest.fn()}
          setIsSortModalVisible={jest.fn()}
          isReadOnly={false}
          scenarioId="sfsdlfksd"
          setShowCreateItemModal={jest.fn()}
          showCreateItemModal={false}
          deleteCodingDimensionHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          deleteCodingItemHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          updateCodingDimension={jest.fn()}
          maxScore={100}
          codingDimension={codingDimensionsMock[0]}
          entities={[{id: "sdfsfsdsdfsdf", scoringType: ScoringType.Analytical, maxScore: 15, title: "Item 1"}]}
        />
      </MockedProvider>
    )

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(4)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(4)
    expect(component.find(CreateItemModal)).toHaveLength(0)
  })

  it("has correct structure show create dialog", async () => {
    const component = mount(
      <MockedProvider>
        <SubDimensionDetailView
          navigateToItemDetail={jest.fn()}
          isRepositionLoading={false}
          isSortModalVisible={false}
          repositionItems={jest.fn()}
          setIsSortModalVisible={jest.fn()}
          isReadOnly={false}
          scenarioId="sfsdlfksd"
          setShowCreateItemModal={jest.fn()}
          showCreateItemModal={true}
          deleteCodingDimensionHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          deleteCodingItemHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          updateCodingDimension={jest.fn()}
          maxScore={100}
          codingDimension={codingDimensionsMock[0]}
          entities={[{id: "sdfsfsdsdfsdf", scoringType: ScoringType.Analytical, maxScore: 15, title: "Item 1"}]}
        />
      </MockedProvider>
    )

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(15)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(6)
    expect(component.find(CreateItemModal)).toHaveLength(1)
    expect(component.find(ResortModal)).toHaveLength(0)
  })
  it("has correct structure show sort items dialog", async () => {
    const component = mount(
      <MockedProvider>
        <SubDimensionDetailView
          navigateToItemDetail={jest.fn()}
          isRepositionLoading={false}
          isSortModalVisible={true}
          repositionItems={jest.fn()}
          setIsSortModalVisible={jest.fn()}
          isReadOnly={false}
          scenarioId="sfsdlfksd"
          setShowCreateItemModal={jest.fn()}
          showCreateItemModal={false}
          deleteCodingDimensionHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          deleteCodingItemHook={{deleteEntity: jest.fn(), deleteEntityLoading: false}}
          updateCodingDimension={jest.fn()}
          maxScore={100}
          codingDimension={codingDimensionsMock[0]}
          entities={[{id: "sdfsfsdsdfsdf", scoringType: ScoringType.Analytical, maxScore: 15, title: "Item 1"}]}
        />
      </MockedProvider>
    )

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(7)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(Button)).toHaveLength(8)
    expect(component.find(CreateItemModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(1)
  })
})
