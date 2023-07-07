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
import {ViewerToolsType} from "shared/enums"
import {fileMock, filesMock, sampleCompaniesMock} from "shared/graphql/__mocks__"
import {deleteFileMutation} from "shared/graphql/mutations"
import {Option} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../../components"
import {HintText} from "../../../../../components/hint-text/hint-text"
import {directoriesForScenarioMock} from "../../../../../graphql/__mocks__"
import {DetailHeader} from "../../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {PreviewInfo} from "../../../../common/files-and-directories/file-detail/file-detail-utils"
import {FileDetail, FileDetailProps} from "../file-detail"
import * as useFileDetail from "../hooks/use-file-detail"
import {UseFileDetailHook} from "../hooks/use-file-detail"

const hookValuesDefault: UseFileDetailHook = {
  updateFile: jest.fn(),
  deselectFile: jest.fn(),
  filePreviewOption: Option.none(),
  setFilePreviewOption: jest.fn(),
  isMoveOverlayVisible: false,
  showMoveOverlay: jest.fn(),
  hideMoveOverlay: jest.fn(),
  allDirectories: directoriesForScenarioMock,
  allFiles: filesMock,
  dataLoading: false,
  isSampleCompanyPublished: false,
  isScenarioPublishedOrFinalized: false
}

const defaultProps: FileDetailProps = {
  disabled: true,
  file: fileMock,
  parentDirectory: Option.none(),
  sampleCompanyId: sampleCompaniesMock[0].id,
  isIntroFile: false,
  isLogoFile: false
}

const stateSpy = jest.spyOn(useFileDetail, "useFileDetail")

const getComponent = (props?: Partial<FileDetailProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: deleteFileMutation,
          variables: {id: fileMock.id}
        },
        result: {
          data: {
            deleteFile: fileMock.id
          }
        }
      }
    ]}>
    <FileDetail {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("file-detail", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent())
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(MediaFilePreview)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(HintText)).toHaveLength(0)
  })

  it("has correct structure intro file", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent({isIntroFile: true}))
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(MediaFilePreview)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(HintText)).toHaveLength(1)
  })

  it("has correct structure logo file", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = mount(getComponent({isLogoFile: true}))
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardContent)).toHaveLength(1)
    expect(component.find(DetailHeader)).toHaveLength(1)
    expect(component.find(MediaFilePreview)).toHaveLength(1)
    expect(component.find(FormFieldLabel)).toHaveLength(2)
    expect(component.find(InlineEditableHeaderContainer)).toHaveLength(1)
    expect(component.find(HintText)).toHaveLength(1)
  })

  it("renders no viewer tool if no preview is active", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, filePreviewOption: Option.none()})

    const component = mount(getComponent())
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(2)
  })

  it("renders viewer tool if preview is active", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      filePreviewOption: Option.of<PreviewInfo>({
        file: fileMock,
        viewerTool: ViewerToolsType.Image
      })
    })

    const component = mount(getComponent())
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ImageViewer)).toHaveLength(1)
    expect(component.find(PdfViewer)).toHaveLength(0)
    expect(component.find(Text)).toHaveLength(4)
  })

  it("triggers update name correctly", async () => {
    const updateFile = jest.fn()

    stateSpy.mockReturnValue({...hookValuesDefault, updateFile})

    const component = mount(getComponent({disabled: false}))
    component.find(InlineEditableHeaderContainer).props().onConfirm("test-file")
    expect(updateFile).toHaveBeenCalledTimes(1)
    expect(updateFile).toHaveBeenCalledWith({name: "test-file"}, fileMock)
  })
})
