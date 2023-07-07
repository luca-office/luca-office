// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, FormFieldLabel} from "shared/components"
import {filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../../components"
import {HintText} from "../../../../../components/hint-text/hint-text"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {CreateDirectoryModal} from "../../create-directory/create-directory-modal"
import {DetailHeader} from "../../file-detail/detail-header/detail-header"
import {PathActionField} from "../../file-detail/path-action-field/path-action-field"
import {DirectoryDetail, DirectoryDetailProps} from "../directory-detail"

const directoryMock = directoriesForScenarioMock[0]

const deleteEntityHookMock = jest.fn(() => ({
  deleteEntity: jest.fn(() => Promise.resolve()),
  deleteEntityLoading: false
}))

const getComponent = (props?: Partial<DirectoryDetailProps>) => (
  <MockedProvider>
    <DirectoryDetail
      disabled={false}
      navigateToSampleCompany={jest.fn}
      directoryConfig={{
        directory: directoryMock,
        parentDirectory: Option.none(),
        subdirectories: [],
        allDirectories: directoriesForScenarioMock,
        updateDirectory: jest.fn(() => Promise.resolve(Option.of(directoryMock))),
        selectDirectory: jest.fn(),
        deselectDirectory: jest.fn(),
        deleteDirectoryHook: deleteEntityHookMock,
        renderCreateDirectoryModal: jest.fn()
      }}
      fileConfig={{
        files: [],
        allFiles: filesMock,
        selectFile: jest.fn(),
        deleteFileHook: deleteEntityHookMock,
        createFilesFromBinaries: jest.fn()
      }}
      createFileOverlayConfig={{
        isCreateFileOverlayVisible: false,
        showCreateFileOverlay: jest.fn(),
        hideCreateFileOverlay: jest.fn()
      }}
      createSubdirectoryOverlayConfig={{
        isCreateSubdirectoryOverlayVisible: false,
        showCreateSubdirectoryOverlay: jest.fn()
      }}
      updateDirectoryOverlayConfig={{
        isUpdateDirectoryOverlayVisible: false,
        setIsUpdateDirectoryOverlayVisible: jest.fn()
      }}
      updateInProgress={false}
      dataLoading={false}
      {...props}
    />
  </MockedProvider>
)

describe("Directory Detail View", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = mount(getComponent())
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(CreateDirectoryModal)).toHaveLength(0)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(PathActionField)).toHaveLength(1)
  })
  it("has correct structure for sample company", () => {
    const component = mount(getComponent({sampleCompanyId: sampleCompaniesMock[0].id}))
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(CreateDirectoryModal)).toHaveLength(0)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(PathActionField)).toHaveLength(0)
  })

  it("triggers update name correctly", () => {
    const updateDirectory = jest.fn()
    const component = mount(
      getComponent({
        directoryConfig: {
          directory: directoryMock,
          parentDirectory: Option.none(),
          subdirectories: [],
          allDirectories: directoriesForScenarioMock,
          updateDirectory,
          selectDirectory: jest.fn(),
          deselectDirectory: jest.fn(),
          deleteDirectoryHook: deleteEntityHookMock,
          renderCreateDirectoryModal: jest.fn()
        }
      })
    )
    component.find(InlineEditableHeaderContainer).props().onConfirm("test-directory")
    expect(updateDirectory).toHaveBeenCalledTimes(1)
    expect(updateDirectory).toHaveBeenCalledWith(directoryMock.id, {name: "test-directory", parentDirectoryId: null})
  })
})
