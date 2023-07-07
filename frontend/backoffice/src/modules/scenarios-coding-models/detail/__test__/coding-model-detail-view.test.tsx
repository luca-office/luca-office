import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {ScenarioCodingModelTableOfContents} from "shared/components"
import {codingDimensionsMock, codingItemMock, codingModelsMock} from "shared/graphql/__mocks__"
import {CodingDimension} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {SubHeaderDetailContainer} from "../../../../components"
import {CodingItemDetailViewContainer} from "../coding-item/coding-item-detail-view-container"
import {MainDimensionDetailView} from "../coding-main-dimension/main-dimension-detail-view"
import {CodingModelDetailView, CodingModelDetailViewProps} from "../coding-model-detail-view"
import {SubDimensionDetailViewContainer} from "../coding-sub-dimension/sub-dimension-detail-view-container"
import {CodingModelDetailOverviewContainer} from "../overview/coding-model-detail-overview-container"

const defaultProps: CodingModelDetailViewProps = {
  allCodingDimensions: codingDimensionsMock,
  isReadOnly: false,
  codingDimension: Option.of<CodingDimension>(codingDimensionsMock[0]),
  codingItem: Option.none(),
  codingModel: codingModelsMock[0],
  handleSelectNode: jest.fn(),
  expandedNodeIds: [],
  scenarioId: "pfwefsdüfpsd",
  selectedNodeId: Option.none(),
  removeCodingModel: jest.fn(),
  navigateToOverview: jest.fn()
}

describe("coding-model-detail-view", () => {
  it("renders correctly", async () => {
    const component = create(
      <MockedProvider>
        <CodingModelDetailView {...defaultProps} />
      </MockedProvider>
    )
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure with main dimension -> render main dimension detail", async () => {
    const tree = shallow(<CodingModelDetailView {...defaultProps} />)

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(ScenarioCodingModelTableOfContents)).toHaveLength(1)
    expect(tree.find(MainDimensionDetailView)).toHaveLength(1)
    expect(tree.find(CodingModelDetailOverviewContainer)).toHaveLength(0)
    expect(tree.find(CodingItemDetailViewContainer)).toHaveLength(0)
  })

  it("has correct structure with sub dimension -> render sub dimension detail", async () => {
    const tree = shallow(
      <CodingModelDetailView {...defaultProps} codingDimension={Option.of(codingDimensionsMock[2])} />
    )

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(ScenarioCodingModelTableOfContents)).toHaveLength(1)
    expect(tree.find(MainDimensionDetailView)).toHaveLength(0)
    expect(tree.find(SubDimensionDetailViewContainer)).toHaveLength(1)
    expect(tree.find(CodingModelDetailOverviewContainer)).toHaveLength(0)
    expect(tree.find(CodingItemDetailViewContainer)).toHaveLength(0)
  })

  it("has correct structure no dimension -> render overview", async () => {
    const tree = shallow(<CodingModelDetailView {...defaultProps} codingDimension={Option.none()} />)

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(ScenarioCodingModelTableOfContents)).toHaveLength(1)
    expect(tree.find(MainDimensionDetailView)).toHaveLength(0)
    expect(tree.find(CodingModelDetailOverviewContainer)).toHaveLength(1)
    expect(tree.find(CodingItemDetailViewContainer)).toHaveLength(0)
  })

  it("has correct structure dimension and item -> render item detail", async () => {
    const tree = shallow(<CodingModelDetailView {...defaultProps} codingItem={Option.of(codingItemMock)} />)

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(ScenarioCodingModelTableOfContents)).toHaveLength(1)
    expect(tree.find(MainDimensionDetailView)).toHaveLength(0)
    expect(tree.find(CodingModelDetailOverviewContainer)).toHaveLength(0)
    expect(tree.find(CodingItemDetailViewContainer)).toHaveLength(1)
  })
})
