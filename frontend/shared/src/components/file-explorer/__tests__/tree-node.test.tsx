import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "../../../utils"
import {Icon} from "../../icon/icon"
import {Tooltip} from "../../tooltip/tooltip"
import {treeNodeTypeMock, treeNodeWithFiles} from "../__mocks__/tree.mock"
import {TreeNode, TreeNodeProps} from "../tree-node"

const defaultProps: TreeNodeProps = {
  node: treeNodeTypeMock,
  expandedDirectoryIds: [],
  level: 0,
  onExpandDirectory: jest.fn(),
  selectedNodeId: Option.none()
}

const getComponent = (props?: Partial<TreeNodeProps>) => <TreeNode {...{...defaultProps, ...props}} />

describe("tree-node", () => {
  it("renders correctly", () => {
    const treeNode = getComponent()
    const tree = create(treeNode).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure", () => {
    const treeNode = shallow(getComponent())

    expect(treeNode.find(".tree-node")).toHaveLength(1)
    expect(treeNode.find(".tree-node-file-count")).toHaveLength(1)
    expect(treeNode.find(Tooltip)).toHaveLength(1)
    expect(treeNode.find(TreeNode)).toHaveLength(0)
  })

  it("renders correct structure directories expanded", () => {
    const treeNode = shallow(getComponent({expandedDirectoryIds: ["sdfs-qweqpork"]}))

    expect(treeNode.find(".tree-node")).toHaveLength(1)
    expect(treeNode.find(".tree-node-file-count")).toHaveLength(1)
    expect(treeNode.find(Tooltip)).toHaveLength(1)
    expect(treeNode.find(TreeNode)).toHaveLength(1)
  })

  it("renders correct file count", () => {
    const treeNode = shallow(getComponent({expandedDirectoryIds: ["sdfs-qweqpork"], node: treeNodeWithFiles}))

    expect(treeNode.find(".tree-node")).toHaveLength(1)
    expect(treeNode.find(".tree-node-file-count")).toHaveLength(1)
    expect(treeNode.find(".tree-node-file-count").prop("children")).toEqual("Urlaub (3)")
  })
})
