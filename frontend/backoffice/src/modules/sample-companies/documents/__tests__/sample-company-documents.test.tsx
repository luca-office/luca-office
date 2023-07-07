import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewHeader, FileExplorer, FilesAndDirectoriesDetailEmpty} from "shared/components"
import {treeMock} from "shared/components/file-explorer/__mocks__/tree.mock"
import {fileMock, filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {DirectoryNode} from "shared/models"
import {Option} from "shared/utils"
import {HintText} from "../../../../components/hint-text/hint-text"
import {directoriesForScenarioMock} from "../../../../graphql/__mocks__"
import {DirectoryDetail} from "../directory-detail/directory-detail"
import {FileDetail} from "../file-detail/file-detail"
import * as useSampleCompanyDocuments from "../hooks/use-sample-company-documents"
import {UseSampleCompanyDocumentsHook} from "../hooks/use-sample-company-documents"
import {SampleCompanyDocumentProps, SampleCompanyDocuments} from "../sample-company-documents"

const sampleCompanyMock = sampleCompaniesMock[0]
const directory = directoriesForScenarioMock[0]

const hookValuesDefault: UseSampleCompanyDocumentsHook = {
  loading: false,
  navigateToPrevious: jest.fn(),
  onSelectNode: jest.fn(),
  tree: Option.of(treeMock),
  expandedDirectoryIds: [treeMock.children[0].id],
  selectedFile: Option.none(),
  isFileDisabled: jest.fn(() => false),
  getParentDirectory: jest.fn(() => Option.of(treeMock.children[0] as DirectoryNode)),
  isCreateDirectoryModalVisible: false,
  showCreateDirectoryModal: jest.fn(),
  hideCreateDirectoryModal: jest.fn(),
  selectedDirectory: Option.none(),
  subDirectories: Option.none(),
  filesInSelectedDirectory: Option.of(filesMock),
  isRootDirectorySelected: false,
  introFileId: Option.of(sampleCompaniesMock[0].profileFileId),
  logoFileId: Option.of(sampleCompaniesMock[0].logoFileId)
}

const defaultProps: SampleCompanyDocumentProps = {
  sampleCompanyId: sampleCompanyMock.id
}

const stateSpy = jest.spyOn(useSampleCompanyDocuments, "useSampleCompanyDocuments")

const getComponent = (props?: Partial<SampleCompanyDocumentProps>) => (
  <SampleCompanyDocuments {...{...defaultProps, ...props}} />
)

describe("sample-company-documents", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (no selection)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const tree = shallow(getComponent())

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(1)
  })
  it("has correct structure (selected file)", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      selectedDirectory: Option.of(directory),
      selectedFile: Option.of(fileMock)
    })
    const tree = shallow(getComponent())

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(1)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(0)
    expect(tree.find(HintText)).toHaveLength(0)
  })

  it("has correct structure (selected directory)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, selectedDirectory: Option.of(directory)})
    const tree = shallow(getComponent())

    expect(tree.find(DetailViewHeader)).toHaveLength(1)
    expect(tree.find(FileExplorer)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(1)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(0)
  })
})
