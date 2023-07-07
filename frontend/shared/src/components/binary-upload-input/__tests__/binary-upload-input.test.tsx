import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ViewerToolsType} from "../../../enums"
import {Option} from "../../../utils"
import {Button} from "../../button/button"
import {Icon} from "../../icon/icon"
import {ImageViewer} from "../../image-viewer/image-viewer"
import {Paper} from "../../paper/paper"
import {PdfViewer} from "../../pdf-viewer/pdf-viewer"
import {Tooltip} from "../../tooltip/tooltip"
import {Text} from "../../typography/typography"
import {UploadFileModal} from "../../upload-file-modal/upload-file-modal"
import {binaryFileMock} from "../__mocks__/binary-file.mock"
import {BinaryUploadInput, BinaryUploadInputProps} from "../binary-upload-input"
import * as useBinaryUploadInputHook from "../hooks/use-binary-upload-input"
import {UseBinaryUploadInputHook} from "../hooks/use-binary-upload-input"

const hookValuesDefault: UseBinaryUploadInputHook = {
  isUploadModalVisible: false,
  showUploadModal: jest.fn(),
  hideUploadModal: jest.fn(),
  binary: Option.none(),
  updateBinary: jest.fn(),
  resetBinary: jest.fn(),
  viewerTool: Option.none(),
  isBinaryViewerVisible: false,
  showBinaryViewer: jest.fn(),
  hideBinaryViewer: jest.fn()
}

const stateSpy = jest.spyOn(useBinaryUploadInputHook, "useBinaryUploadInput")

const defaultProps: BinaryUploadInputProps = {
  onUpload: jest.fn(),
  onDelete: jest.fn()
}

const getComponent = (props?: Partial<BinaryUploadInputProps>) => <BinaryUploadInput {...{...defaultProps, ...props}} />

describe("binary-upload-input", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (binary available)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, binary: Option.of(binaryFileMock)})
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (disabled)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, binary: Option.of(binaryFileMock)})
    const component = create(getComponent({disabled: true}))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent())

    expect(component.find(".binary-input")).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)

    const tooltip = component.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Button)).toHaveLength(1)

    const paper = component.find(Paper)
    expect(paper).toHaveLength(0)

    expect(component.find(UploadFileModal)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
  })
  it("has correct structure (binary available)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, binary: Option.of(binaryFileMock)})
    const component = shallow(getComponent())

    expect(component.find(".binary-input")).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(1)

    const tooltip = component.find(Tooltip)
    expect(tooltip).toHaveLength(0)

    const paper = component.find(Paper)
    expect(paper).toHaveLength(1)

    const paperContent = paper.dive()
    expect(paperContent.find(Icon)).toHaveLength(2)
    expect(paperContent.find(Text)).toHaveLength(1)

    expect(component.find(UploadFileModal)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
  })
  it("has correct structure (disabled)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, binary: Option.of(binaryFileMock)})
    const component = shallow(getComponent({disabled: true}))

    expect(component.find(".binary-input")).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(2)

    const tooltip = component.find(Tooltip)
    expect(tooltip).toHaveLength(0)

    const paper = component.find(Paper)
    expect(paper).toHaveLength(1)

    const paperContent = paper.dive()
    expect(paperContent.find(Icon)).toHaveLength(1)
    expect(paperContent.find(Text)).toHaveLength(2)

    expect(component.find(UploadFileModal)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
  })
  it("has correct structure (upload-modal visible)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, isUploadModalVisible: true})
    const component = shallow(getComponent())

    expect(component.find(".binary-input")).toHaveLength(1)
    expect(component.find(Icon)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)

    const tooltip = component.find(Tooltip)
    expect(tooltip).toHaveLength(1)
    expect(tooltip.dive().find(Button)).toHaveLength(1)

    const paper = component.find(Paper)
    expect(paper).toHaveLength(0)

    expect(component.find(UploadFileModal)).toHaveLength(1)
    expect(component.find(ImageViewer)).toHaveLength(0)
    expect(component.find(PdfViewer)).toHaveLength(0)
  })
  it("has correct structure (binary-viewer visible)", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      binary: Option.of(binaryFileMock),
      viewerTool: Option.of<ViewerToolsType>(ViewerToolsType.Image),
      isBinaryViewerVisible: true
    })
    const component = shallow(getComponent())

    expect(component.find(".binary-input")).toHaveLength(0)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Text)).toHaveLength(1)

    const tooltip = component.find(Tooltip)
    expect(tooltip).toHaveLength(0)

    const paper = component.find(Paper)
    expect(paper).toHaveLength(1)

    const paperContent = paper.dive()
    expect(paperContent.find(Icon)).toHaveLength(2)
    expect(paperContent.find(Text)).toHaveLength(1)

    expect(component.find(UploadFileModal)).toHaveLength(0)
    expect(component.find(ImageViewer)).toHaveLength(1)
    expect(component.find(PdfViewer)).toHaveLength(0)
  })
})
