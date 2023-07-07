import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {BinaryType, IconName, NodeType} from "../../../enums"
import {FileNode} from "../../../models"
import {Option} from "../../../utils"
import {Button, Card, CardFooter, CardHeader} from "../.."
import {TableOfContentsContainer} from "../../table-of-content/table-of-contents"
import {treeMock} from "../__mocks__/tree.mock"
import {FileExplorer, FileExplorerProps, getSortedTreeNodes} from "../file-explorer"
import {getByText, render, screen} from "@testing-library/react"

const fileNodeMock: FileNode = {
  binaryFileId: "spfosdkfsd",
  binaryFileUrl: "url@url.de",
  binaryType: BinaryType.Image,
  id: "sfpoksdf-fposjfd",
  name: "test-file",
  parentId: "sfopksdf-fsdpfosdk",
  tags: [],
  type: NodeType.File
}

const defaultProps: FileExplorerProps = {
  isLoading: false,
  onSelectNode: jest.fn(),
  expandedDirectoryIds: [],
  onCreateDirectory: jest.fn(),
  onExpandDirectory: jest.fn(),
  selectedNodeId: Option.none(),
  tree: treeMock,
  isCreateDirectoryButtonVisible: false
}

const getComponent = (props?: Partial<FileExplorerProps>) => <FileExplorer {...{...defaultProps, ...props}} />

describe("file-explorer", () => {
  it("renders correctly", () => {
    const fileExplorer = getComponent()
    const tree = create(fileExplorer).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with custom renderers", () => {
    const fileExplorer = getComponent({
      renderCustomFileSuffix: node => node.id + "test",
      renderCustomDirectoryIcon: node => IconName.Add
    })
    const tree = create(fileExplorer).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correct structure button visible", () => {
    // const fileExplorer = shallow()

    render(getComponent({isCreateDirectoryButtonVisible: true}))
    const createButton = screen.getAllByText("file_explorer__create_new_main_directories")

    expect(createButton.length).toBe(1)
  })

  it("renders correct structure button not visible", () => {
    // const fileExplorer = shallow()

    render(getComponent({isCreateDirectoryButtonVisible: false}))
    const createButton = screen.queryByText("file_explorer__create_new_main_directories")

    expect(createButton).toBeNull()
  })

  it("applies append / prepend logic correctly", () => {
    const nodes = [
      {...fileNodeMock, id: "1"},
      {...fileNodeMock, id: "2"},
      {...fileNodeMock, id: "3"},
      {...fileNodeMock, id: "4"}
    ]

    expect(getSortedTreeNodes(nodes).map(_ => _.id)).toEqual(["1", "2", "3", "4"])
    expect(getSortedTreeNodes(nodes, ["3"]).map(_ => _.id)).toEqual(["3", "1", "2", "4"])
    expect(getSortedTreeNodes(nodes, ["3", "2"]).map(_ => _.id)).toEqual(["3", "2", "1", "4"])
    expect(getSortedTreeNodes(nodes, []).map(_ => _.id)).toEqual(["1", "2", "3", "4"])
    expect(getSortedTreeNodes(nodes, [], ["1"]).map(_ => _.id)).toEqual(["2", "3", "4", "1"])
    expect(getSortedTreeNodes(nodes, ["3"], ["1"]).map(_ => _.id)).toEqual(["3", "2", "4", "1"])

    expect(getSortedTreeNodes(nodes, ["5"]).map(_ => _.id)).toEqual(["1", "2", "3", "4"])
    expect(getSortedTreeNodes(nodes, ["3"], ["3"]).map(_ => _.id)).toEqual(["3", "1", "2", "4", "3"])
  })
})
