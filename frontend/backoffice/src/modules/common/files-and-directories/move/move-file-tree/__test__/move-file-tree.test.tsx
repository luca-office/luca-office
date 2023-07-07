// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {FileExplorer, Heading} from "shared/components"
import {NodeType} from "shared/enums"
import {filesMock} from "shared/graphql/__mocks__"
import {DirectoryNode} from "shared/models"
import {Option} from "shared/utils"
import {directoriesForScenarioMock} from "../../../../../../graphql/__mocks__"
import {ROOT} from "../../hooks/use-move-overlay"
import * as useMoveFileTree from "../hooks/use-move-file-tree"
import {UseMoveFileTreeHook} from "../hooks/use-move-file-tree"
import {MoveFileTree, MoveFileTreeProps} from "../move-file-tree"

const hookValuesDefault: UseMoveFileTreeHook = {
  expandedDirectories: [],
  toggleExpandedDirectory: jest.fn()
}

const stateSpy = jest.spyOn(useMoveFileTree, "useMoveFileTree")

const defaultProps: MoveFileTreeProps = {
  isFile: false,
  currentParentDirectory: Option.none(),
  currentDirectoryId: Option.none(),
  selectedTargetDirectory: Option.none(),
  setSelectedTargetDirectory: jest.fn(),
  dataLoading: false,
  directories: directoriesForScenarioMock,
  files: filesMock
}

const mockParentDirectory: DirectoryNode = {
  id: "6b183a2e-0af6-4006-95b5-e2daca778616",
  parentId: "b6897871-96be-4927-894d-ee99b4a8f30a",
  name: "Urlaub",
  type: NodeType.Directory,
  children: []
}

const useComponentWithProvider = (props?: Partial<MoveFileTreeProps>) => (
  <MockedProvider>
    <MoveFileTree {...defaultProps} {...props} />
  </MockedProvider>
)

const useComponent = (props?: Partial<MoveFileTreeProps>) => <MoveFileTree {...defaultProps} {...props} />

describe("Move File Tree", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(useComponentWithProvider())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - all options empty", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(useComponent(), {wrappingComponent: MockedProvider})
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(FileExplorer)).toHaveLength(1)
  })

  it("renders root target option if selected directory has a parent", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(
      useComponent({
        currentParentDirectory: Option.of(mockParentDirectory)
      }),
      {
        wrappingComponent: MockedProvider
      }
    )

    expect(component.find(FileExplorer).dive().find(".custom-move-to-root")).toHaveLength(1)
    expect(component.find(FileExplorer).dive().find(".custom-move-to-root-close-button")).toHaveLength(0)
  })

  it("renders correctly if root is selected as target", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(
      useComponent({
        selectedTargetDirectory: Option.of(ROOT),
        currentParentDirectory: Option.of(mockParentDirectory)
      }),
      {
        wrappingComponent: MockedProvider
      }
    )

    expect(component.find(FileExplorer).dive().find(".custom-move-to-root")).toHaveLength(1)
    expect(component.find(FileExplorer).dive().find(".custom-move-to-root-close-button")).toHaveLength(1)
  })
})
