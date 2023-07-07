// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {
  Card,
  CardContent,
  FormFieldLabel,
  ImageViewer,
  MediaFilePreview,
  Overlay,
  PdfViewer,
  Text
} from "shared/components"
import {FileType, ViewerToolsType} from "shared/enums"
import {fileMock, filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {Relevance} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {InlineEditableHeaderContainer} from "../../../../../components"
import {HintText} from "../../../../../components/hint-text/hint-text"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {DetailHeader} from "../../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {PreviewInfo} from "../../../../common/files-and-directories/file-detail/file-detail-utils"
import {PathActionField} from "../../../../common/files-and-directories/file-detail/path-action-field/path-action-field"
import {CreateFileOpeningInterventionModalContainer} from "../../../../scenario-interventions"
import {FileDetailFooter} from ".."
import {FileDetail} from "../file-detail"
import * as useFileDetail from "../hooks/use-file-detail"
import {UseFileDetailHook} from "../hooks/use-file-detail"

const hookValuesDefault: UseFileDetailHook = {
  updateFile: jest.fn(),
  updateInProgress: false,
  previewInfoOption: Option.none(),
  deselectFile: jest.fn(),
  setPreviewInfoOption: jest.fn(),
  t: fakeTranslate,
  isUpdateDirectoryOverlayVisible: false,
  isCreateInterventionModalVisible: false,
  setIsUpdateDirectoryOverlayVisible: jest.fn(),
  setIsCreateInterventionModalVisible: jest.fn(),
  allDirectories: directoriesForScenarioMock,
  allFiles: filesMock,
  dataLoading: false,
  expandDirectoryId: jest.fn(),
  scenarioDurationInSeconds: 600,
  navigateToIntervention: jest.fn(),
  navigateToSampleCompany: jest.fn,
  selectedInterventionCellIndex: {rowIndex: 1, columnIndex: 1},
  setSelectedInterventionCellIndex: jest.fn(),
  isChooseTextDocumentsInterventionTypeModelVisible: false,
  isCreateTextDocumentsInterventionModalVisible: false,
  setIsChooseTextDocumentsInterventionTypeModelVisible: jest.fn(),
  setIsCreateTextDocumentsInterventionModalVisible: jest.fn()
}

const scenarioId = "abcdef-ghijkl"

const stateSpy = jest.spyOn(useFileDetail, "useFileDetail")

const fileDetail = (
  <MockedProvider>
    <FileDetail
      interventionCount={0}
      disabled={false}
      parentDirectory={Option.none()}
      scenarioId={scenarioId}
      file={fileMock}
      emailId={null}
      spreadsheetCellContentInterventions={[]}
    />
  </MockedProvider>
)
const fileDetailSampleCompany = (
  <MockedProvider>
    <FileDetail
      interventionCount={0}
      disabled={false}
      parentDirectory={Option.none()}
      scenarioId={scenarioId}
      file={fileMock}
      sampleCompanyId={sampleCompaniesMock[0].id}
      emailId={null}
      spreadsheetCellContentInterventions={[]}
    />
  </MockedProvider>
)

describe("File Detail View", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(fileDetail)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(fileDetail)
    expect(component.find(Card)).toHaveLength(3)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(MediaFilePreview)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(FileDetailFooter)).toHaveLength(1)
    expect(component.find(PathActionField)).toHaveLength(1)
  })
  it("has correct structure with sample company", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(fileDetailSampleCompany)
    expect(component.find(Card)).toHaveLength(3)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(MediaFilePreview)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(FileDetailFooter)).toHaveLength(1)
    expect(component.find(HintText)).toHaveLength(1)
    expect(component.find(PathActionField)).toHaveLength(0)
  })

  it("renders no viewer tool if no preview active", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, previewInfoOption: Option.none()})

    const component = mount(fileDetail)
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(3)
  })

  it("renders correct viewer tool with image preview active", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      previewInfoOption: Option.of<PreviewInfo>({
        file: fileMock,
        viewerTool: ViewerToolsType.Image
      })
    })

    const component = mount(fileDetail)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ImageViewer)).toHaveLength(1)
    expect(component.find(PdfViewer)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(5)
  })

  it("triggers update name correctly", async () => {
    const updateFile = jest.fn()

    stateSpy.mockReturnValue({...hookValuesDefault, updateFile})

    const component = mount(fileDetail)
    component.find(InlineEditableHeaderContainer).props().onConfirm("test-file")
    expect(updateFile).toHaveBeenCalledTimes(1)
    expect(updateFile).toHaveBeenCalledWith(fileMock.id, {
      binaryFileId: fileMock.fileType === FileType.Media ? fileMock.binaryFileId : null,
      relevance: fileMock.relevance,
      tags: fileMock.tags,
      name: "test-file.png",
      directoryId: fileMock.directoryId
    })
  })

  it("triggers update relevance correctly", async () => {
    const updateFile = jest.fn()

    stateSpy.mockReturnValue({...hookValuesDefault, updateFile})

    const component = mount(fileDetail)
    component.find(FileDetailFooter).props().updateFile({relevance: Relevance.Irrelevant})
    expect(updateFile).toHaveBeenCalledTimes(1)
    expect(updateFile).toHaveBeenCalledWith(fileMock.id, {
      binaryFileId: fileMock.fileType === FileType.Media ? fileMock.binaryFileId : null,
      relevance: Relevance.Irrelevant,
      tags: fileMock.tags,
      name: fileMock.name,
      directoryId: fileMock.directoryId
    })
  })

  it("shows create intervention modal", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isCreateInterventionModalVisible: true})

    const component = mount(fileDetail)

    expect(component.find(CreateFileOpeningInterventionModalContainer)).toHaveLength(1)
  })

  it("does not show create intervention modal", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isCreateInterventionModalVisible: false})

    const component = mount(fileDetail)

    expect(component.find(CreateFileOpeningInterventionModalContainer)).toHaveLength(0)
  })
})
