// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {CreateMainDimensionModal} from "shared/components"
import {codingDimensionsMock, codingModelsMock} from "shared/graphql/__mocks__"
import wait from "waait"
import {ResortModal} from "../../../../../components"
import {CodingModelCommonDetailView} from "../../common/detail-view/coding-model-common-detail-view"
import {DimensionsTable} from "../../common/dimensions-table/dimensions-table"
import {CodingModelDetailOverview} from "../coding-model-detail-overview"
import {DimensionMetadata} from "../detail-dimension-metadata/dimension-metadata"

const detailOverviewComponent = (
  <MockedProvider>
    <CodingModelDetailOverview
      navigateToDimensionDetail={jest.fn()}
      isRepositionLoading={false}
      isSortModalVisible={false}
      repositionDimensions={jest.fn()}
      setIsSortModalVisible={jest.fn()}
      isReadOnly={false}
      setShowCreateMainDimensionsModal={jest.fn()}
      isCreateMainDimensionsModalVisible={false}
      codingDimensions={codingDimensionsMock}
      codingModel={codingModelsMock[0]}
      handleUpdate={jest.fn()}
    />
  </MockedProvider>
)

describe("coding-model-detail-overview", () => {
  it("renders correctly", async () => {
    const component = create(detailOverviewComponent)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const component = mount(detailOverviewComponent, {wrappingComponent: MockedProvider})
    await act(() => wait(0))

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(DimensionMetadata)).toHaveLength(1)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(CreateMainDimensionModal)).toHaveLength(0)
  })
  it("has correct structure with create modal", async () => {
    const component = mount(
      <CodingModelDetailOverview
        navigateToDimensionDetail={jest.fn()}
        isRepositionLoading={false}
        isSortModalVisible={false}
        repositionDimensions={jest.fn()}
        setIsSortModalVisible={jest.fn()}
        isReadOnly={false}
        setShowCreateMainDimensionsModal={jest.fn()}
        isCreateMainDimensionsModalVisible={true}
        codingDimensions={codingDimensionsMock}
        codingModel={codingModelsMock[0]}
        handleUpdate={jest.fn()}
      />,
      {wrappingComponent: MockedProvider}
    )
    await act(() => wait(0))

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(DimensionMetadata)).toHaveLength(1)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(CreateMainDimensionModal)).toHaveLength(1)
    expect(component.find(ResortModal)).toHaveLength(0)
  })
  it("has correct structure with sort modal", async () => {
    const component = mount(
      <CodingModelDetailOverview
        navigateToDimensionDetail={jest.fn()}
        isRepositionLoading={false}
        isSortModalVisible={true}
        repositionDimensions={jest.fn()}
        setIsSortModalVisible={jest.fn()}
        isReadOnly={false}
        setShowCreateMainDimensionsModal={jest.fn()}
        isCreateMainDimensionsModalVisible={false}
        codingDimensions={codingDimensionsMock}
        codingModel={codingModelsMock[0]}
        handleUpdate={jest.fn()}
      />,
      {wrappingComponent: MockedProvider}
    )
    await act(() => wait(0))

    expect(component.find(CodingModelCommonDetailView)).toHaveLength(1)
    expect(component.find(DimensionMetadata)).toHaveLength(1)
    expect(component.find(DimensionsTable)).toHaveLength(1)
    expect(component.find(CreateMainDimensionModal)).toHaveLength(0)
    expect(component.find(ResortModal)).toHaveLength(1)
  })
})
