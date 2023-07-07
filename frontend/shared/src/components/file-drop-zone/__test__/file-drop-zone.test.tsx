import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "../../../utils"
import {Text} from "../../typography/typography"
import {FileDropzone, FileDropZoneProps} from "../file-drop-zone"
import * as fileDropZoneHook from "../hooks/use-file-drop-zone"
import {UseFileDropZoneHook} from "../hooks/use-file-drop-zone"
import {FileUploadError} from "../utils/error-messages"

const defaultProps: FileDropZoneProps = {
  onFilesAccepted: jest.fn(),
  accept: {
    "image/*": [".jpg", ".svg", ".png", ".jpeg", ".gif"]
  }
}

const hookValuesDefault: UseFileDropZoneHook = {
  dropzone: {
    open: jest.fn(),
    isFocused: false,
    isDragReject: false,
    acceptedFiles: [],
    fileRejections: [],
    getInputProps: jest.fn(),
    getRootProps: jest.fn(),
    inputRef: {current: null},
    isDragAccept: true,
    isDragActive: false,
    isFileDialogActive: false,
    rootRef: {current: null}
  },
  fileUploadError: Option.none()
}

const stateSpy = jest.spyOn(fileDropZoneHook, "useFileDropzone")

const getComponent = (props?: Partial<FileDropZoneProps>) => <FileDropzone {...{...defaultProps, ...props}} />

describe("file-drop-zone", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (hide select button)", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent({hideSelectButton: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(".file-dropzone-wrapper")).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
  })
  it("has correct structure with error", () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      fileUploadError: Option.of<FileUploadError>(FileUploadError.FileTooLarge)
    })
    const component = getComponent({})
    const tree = shallow(component)
    expect(tree.find(".file-dropzone-wrapper")).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(3)
  })
})
