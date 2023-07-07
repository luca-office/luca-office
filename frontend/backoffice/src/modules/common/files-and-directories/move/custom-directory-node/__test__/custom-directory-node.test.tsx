// importing from direct file because of issues of babel loader and spyOn
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {NodeType} from "shared/enums/node-type"
import {DirectoryNode} from "shared/models"
import {Option} from "shared/utils"
import {CustomDirectoryNode, CustomDirectoryNodeProps} from "../custom-directory-node"

const directoryNodeMock: DirectoryNode = {
  children: [],
  id: "fsdfds-sfsd",
  name: "Hauptordner",
  parentId: "ssdfsdf-sdfsd",
  type: NodeType.Directory
}

const defaultProps: CustomDirectoryNodeProps = {
  currentDirectoryId: Option.none(),
  currentParentDirectory: Option.none(),
  isChildOfOrigin: false,
  setSelectedTargetDirectory: jest.fn(),
  isDirectoryExpanded: false,
  isDirectorySelected: false,
  level: 0,
  node: directoryNodeMock,
  onClickChevron: jest.fn(),
  selectedTargetDirectory: Option.none()
}

const useComponent = (props?: Partial<CustomDirectoryNodeProps>) => <CustomDirectoryNode {...defaultProps} {...props} />

describe("Custom Directory Node", () => {
  it("renders correctly", async () => {
    const component = create(useComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - default props", async () => {
    const component = mount(useComponent())
    expect(component.find(Tooltip)).toHaveLength(2)
    expect(component.find(Icon)).toHaveLength(3)
    expect(component.find(Icon).first().prop("name")).toBe(IconName.ChevronFilledRight)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Move)
    expect(component.find(Text)).toHaveLength(2)
  })

  it("has correct structure - isSelectedTargetDirectory", async () => {
    const component = mount(useComponent({selectedTargetDirectory: Option.of("fsdfds-sfsd")}))
    expect(component.find(Tooltip)).toHaveLength(3)
    expect(component.find(Icon)).toHaveLength(3)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Close)
    expect(component.find(Text)).toHaveLength(1)
  })

  it("has correct structure - isParentDirectory", async () => {
    const component = mount(useComponent({currentParentDirectory: Option.of<DirectoryNode>(directoryNodeMock)}))

    expect(component.find(Tooltip)).toHaveLength(2)
    expect(component.find(Tooltip).first().prop("inactive")).toBe(true)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Folder)
    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(Text).last().prop("children")).toBe("files_and_directories__move_modal_current_position")
  })

  it("has correct structure with tooltip - isChild", async () => {
    const component = mount(useComponent({isChildOfOrigin: true}))

    expect(component.find(Tooltip)).toHaveLength(2)
    expect(component.find(Tooltip).first().prop("inactive")).toBe(false)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Folder)
    expect(component.find(Text)).toHaveLength(1)
  })

  it("has correct structure - directory expanded", async () => {
    const component = mount(useComponent({isDirectoryExpanded: true}))

    expect(component.find(Tooltip)).toHaveLength(2)
    expect(component.find(Icon)).toHaveLength(3)
    expect(component.find(Icon).first().prop("name")).toBe(IconName.ChevronFilledDown)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Move)
    expect(component.find(Text)).toHaveLength(2)
  })

  it("deselect target correctly", async () => {
    const setSelectedTargetDirectory = jest.fn()
    const targetDirectoryId = "fsdfds-sfsd"
    const component = mount(
      useComponent({setSelectedTargetDirectory, selectedTargetDirectory: Option.of(targetDirectoryId)})
    )

    render(useComponent({setSelectedTargetDirectory, selectedTargetDirectory: Option.of(targetDirectoryId)}))

    expect(component.find(Icon)).toHaveLength(3)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Close)

    fireEvent.click(screen.getByTestId("close-icon"), {evt: {stopPropagation: jest.fn()}})

    await waitFor(() => expect(setSelectedTargetDirectory).toBeCalledWith(expect.objectContaining({value: null})))
  })

  it("select targets correctly", async () => {
    const setSelectedTargetDirectory = jest.fn()
    const targetDirectoryId = "fsdfds-sfsd"
    const component = mount(useComponent({setSelectedTargetDirectory, selectedTargetDirectory: Option.none()}))

    render(useComponent({setSelectedTargetDirectory, selectedTargetDirectory: Option.of(targetDirectoryId)}))
    expect(component.find(Icon)).toHaveLength(3)
    expect(component.find(Icon).last().prop("name")).toBe(IconName.Move)

    fireEvent.click(screen.getByTestId("custom-directory-move"))

    await waitFor(() =>
      expect(setSelectedTargetDirectory).toBeCalledWith(expect.objectContaining({value: targetDirectoryId}))
    )
  })
})
