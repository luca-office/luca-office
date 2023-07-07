import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {UploadFileType as FileType} from "../../../enums"
import {Modal} from "../../modal/modal"
import {Overlay} from "../../overlay/overlay"
import * as useUploadFileModalHook from "../hooks/use-upload-file-modal"
import {UseUploadFileModalHook} from "../hooks/use-upload-file-modal"
import {SelectLocalFiles} from "../select-local-files/select-local-files"
import {UploadBinaryViewer} from "../upload-binary-viewer/upload-binary-viewer"
import {UploadFileModal} from "../upload-file-modal"

const hookValuesDefault: UseUploadFileModalHook = {
  deselectFile: jest.fn(),
  isUploading: false,
  selectedFiles: [],
  acceptedFileTypes: [],
  selectFiles: jest.fn(),
  setAcceptedFileTypes: jest.fn(),
  uploadBinaries: jest.fn(),
  selectedTextDocuments: [],
  selectTextDocument: jest.fn(),
  deselectTextDocument: jest.fn()
}

const mockedFile: File = {
  arrayBuffer: jest.fn(),
  lastModified: 2503,
  name: "file",
  size: 23234,
  slice: jest.fn(),
  stream: () => new ReadableStream(),
  text: jest.fn(),
  type: ".jpg",
  webkitRelativePath: "/mocked"
}

const stateSpy = jest.spyOn(useUploadFileModalHook, "useUploadFileModal")

const uploadFileModal = (
  <UploadFileModal
    acceptedFileTypes={[FileType.PDF]}
    onBinariesSuccessfullyUploaded={jest.fn()}
    onDismiss={jest.fn()}
  />
)

describe("Upload File Modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(uploadFileModal)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(uploadFileModal)
    expect(component.find(SelectLocalFiles)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Overlay)).toHaveLength(0)
    expect(component.find(UploadBinaryViewer)).toHaveLength(0)
  })

  it("uploads binaries on confirm", async () => {
    const uploadBinaries = jest.fn()

    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      acceptedFileTypes: [FileType.PDF],
      selectedFiles: [{id: "dsdsdf-sdfoskdf", file: mockedFile}],
      uploadBinaries
    })

    const component = shallow(uploadFileModal)
    component.find(Modal).props().onConfirm()
    expect(uploadBinaries).toHaveBeenCalledTimes(1)
  })

  it("disabled confirm button", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      acceptedFileTypes: [FileType.PDF],
      selectedFiles: [{id: "dsdsdf-sdfoskdf", file: mockedFile}],
      isUploading: true
    })

    const component = shallow(uploadFileModal)
    expect(component.find(Modal).prop("confirmButtonDisabled")).toBe(true)
  })

  it("enables confirm button", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      acceptedFileTypes: [FileType.PDF],
      selectedFiles: [{id: "dsdsdf-sdfoskdf", file: mockedFile}],
      isUploading: false
    })

    const component = shallow(uploadFileModal)
    expect(component.find(Modal).prop("confirmButtonDisabled")).toBe(false)
  })
})
