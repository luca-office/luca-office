import {shallow} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import wait from "waait"
import {IconName} from "../../../enums"
import {codingDimensionNodesMock} from "../../../graphql/__mocks__"
import {BaseNode} from "../../../models"
import {Option} from "../../../utils"
import {CreateMainDimensionModal} from "../../create-main-dimension-modal/create-main-dimension-modal"
import {Icon} from "../../icon/icon"
import {TableOfContentsContainer, TableOfContentsEntry} from "../../table-of-content"
import {Text} from "../../typography/typography"
import {
  CodingModelTableOfContentsProps,
  ScenarioCodingModelTableOfContents
} from "../scenario-coding-model-table-of-contents"

const defaultProps: CodingModelTableOfContentsProps<BaseNode> = {
  allCodingNodes: codingDimensionNodesMock,
  handleSelectNode: jest.fn(),
  selectedNodeId: Option.none(),
  isReadOnly: false,
  expandedNodeIds: []
}

const getComponent = (props?: Partial<CodingModelTableOfContentsProps<BaseNode>>) => (
  <ScenarioCodingModelTableOfContents {...defaultProps} {...props} />
)

describe("coding-model-table-of-contents", () => {
  it("renders correctly", async () => {
    const component = create(getComponent())
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const tree = shallow(getComponent())

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(3)
    expect(tree.find(CreateMainDimensionModal)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(1)
  })

  it("has correct structure no dimension", async () => {
    const tree = shallow(getComponent({allCodingNodes: []}))

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(0)
    expect(tree.find(CreateMainDimensionModal)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(1)
  })

  it("has correct structure modal visible", async () => {
    const tree = shallow(getComponent({isModalVisible: true, renderModal: () => <Text>Test</Text>}))

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(3)
    expect(tree.find(CreateMainDimensionModal)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(2)
  })

  it("has correct structure custom overview Text", async () => {
    const tree = shallow(getComponent({customOverviewElement: <Icon name={IconName.Add} />}))

    expect(tree.find(TableOfContentsContainer)).toHaveLength(1)
    expect(tree.find(TableOfContentsEntry)).toHaveLength(3)
    expect(tree.find(CreateMainDimensionModal)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(0)
    expect(tree.find(Icon)).toHaveLength(1)
  })

  it("calls navigateToOverview method on click", async () => {
    const navigateToOverviewSpy = jest.fn()
    const tree = shallow(getComponent({navigateToOverview: navigateToOverviewSpy}))

    const link = tree.find(Text)
    link.simulate("click")
    expect(navigateToOverviewSpy).toHaveBeenCalledTimes(1)
  })
})
