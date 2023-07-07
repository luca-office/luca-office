// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Icon, Modal, Paper, Text} from "shared/components"
import {IconName} from "shared/enums"
import {fileMock, filesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {Directory} from "../../../../../models"
import * as useMoveOverlay from "../hooks/use-move-overlay"
import {UseMoveOverlay} from "../hooks/use-move-overlay"
import {MoveOverlay, MoveOverlayProps} from "../move-overlay"

const hookValuesDefault: UseMoveOverlay = {
  changeDirectory: jest.fn(),
  selectedTargetDirectory: Option.none(),
  setSelectedTargetDirectory: jest.fn()
}

const stateSpy = jest.spyOn(useMoveOverlay, "useMoveOverlay")

const defaultProps: MoveOverlayProps = {
  file: Option.none(),
  directory: Option.none(),
  onFilesSuccessfullyMoved: jest.fn(),
  onDismiss: jest.fn(),
  name: "file-name.png",
  parentDirectory: Option.none(),
  dataLoading: false,
  directories: directoriesForScenarioMock,
  files: filesMock
}

const useComponentWithProvider = (props?: Partial<MoveOverlayProps>) => (
  <MockedProvider>
    <MoveOverlay {...defaultProps} {...props} />
  </MockedProvider>
)

const useComponent = (props?: Partial<MoveOverlayProps>) => <MoveOverlay {...defaultProps} {...props} />

describe("Move File or Directory Overlay", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(useComponentWithProvider())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(useComponent(), {wrappingComponent: MockedProvider})
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
  })

  it("renders correct texts if file", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(useComponent({file: Option.of(fileMock)}), {wrappingComponent: MockedProvider})
    expect(component.find(Text).first().prop("children")).toBe("files_and_directories__move_modal_info_text_file")
    expect(component.find(Heading).first().prop("children")).toBe("files_and_directories__move_modal_file_name_label")
    expect(component.find(Text).last().prop("children")).toBe("file-name.png")
  })

  it("renders correct icon for description - file", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(useComponent({file: Option.of(fileMock)}), {wrappingComponent: MockedProvider})
    expect(component.find(Icon).prop("name")).toBe(IconName.Image)
  })

  it("renders correct icon for description - directory", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(useComponent({directory: Option.of<Directory>(directoriesForScenarioMock[0])}), {
      wrappingComponent: MockedProvider
    })
    expect(component.find(Icon).prop("name")).toBe(IconName.Folder)
  })
})
