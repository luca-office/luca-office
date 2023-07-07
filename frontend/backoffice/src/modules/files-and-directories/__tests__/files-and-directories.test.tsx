import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {directoriesMock} from "shared/__mocks__/directories.mock"
import {DetailViewHeader, FileExplorer} from "shared/components"
import {treeMock} from "shared/components/file-explorer/__mocks__/tree.mock"
import {filesMock, scenariosMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import wait from "waait"
import {CreateDirectoryModalContainer} from "../create-directory/create-directory-modal-container"
import {DirectoryDetail} from "../detail/directory-detail/directory-detail"
import {FileDetail} from "../detail/file-detail/file-detail"
import {FilesAndDirectories, FilesAndDirectoriesProps} from "../files-and-directories"
import * as useFilesAndDirectoriesHook from "../hooks/use-files-and-directories"
import {UseFilesAndDirectoriesHook} from "../hooks/use-files-and-directories"
import {FilesAndDirectoriesPreview} from "../preview/files-and-directories-preview"

const scenario = scenariosMock[0]

const defaultProps: FilesAndDirectoriesProps = {
  scenarioId: scenario.id,
  selectedDirectoryId: Option.none(),
  selectedFileId: Option.none()
}

const hookValuesDefault: UseFilesAndDirectoriesHook = {
  scenario: Option.of(scenario),
  isLoading: false,
  directories: directoriesMock,
  files: filesMock,
  fileOpeningInterventions: [],
  onSelectNode: jest.fn(),
  onExpandDirectory: jest.fn(),
  isCreateDirectoryModalVisible: false,
  showCreateDirectoryModal: jest.fn(),
  hideCreateDirectoryModal: jest.fn(),
  navigateToScenarioDetail: jest.fn(),
  isPreviewVisible: false,
  setPreviewVisibility: jest.fn(),
  isDirectoryReadonly: jest.fn(),
  getIconForRootDirectory: jest.fn(),
  isFileReadonly: jest.fn(),
  fileExplorerTree: treeMock,
  expandedDirectoryIds: [],
  sampleCompanyId: undefined,
  spreadsheetCellContentInterventions: [],
  textDocumentContentInterventions: []
}

const stateSpy = jest.spyOn(useFilesAndDirectoriesHook, "useFilesAndDirectories")

const getComponent = (props?: Partial<FilesAndDirectoriesProps>) => (
  <FilesAndDirectories {...{...defaultProps, ...props}} />
)

describe("files-and-directories", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(CreateDirectoryModalContainer)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesPreview)).toHaveLength(0)
  })
  it("has correct structure (selected directory)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({selectedDirectoryId: Option.of(directoriesMock[0].id)}))

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(1)
    expect(tree.find(CreateDirectoryModalContainer)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesPreview)).toHaveLength(0)
  })
  it("has correct structure (selected file)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent({selectedFileId: Option.of(filesMock[0].id)}))

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(1)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(CreateDirectoryModalContainer)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesPreview)).toHaveLength(0)
  })
  it("has correct structure (visible directory creation modal)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isCreateDirectoryModalVisible: true})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(CreateDirectoryModalContainer)).toHaveLength(1)
    expect(tree.find(FilesAndDirectoriesPreview)).toHaveLength(0)
  })
  it("has correct structure (visible preview)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isPreviewVisible: true})
    const tree = shallow(getComponent())

    await act(() => wait(0))

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(CreateDirectoryModalContainer)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesPreview)).toHaveLength(1)
  })
})
