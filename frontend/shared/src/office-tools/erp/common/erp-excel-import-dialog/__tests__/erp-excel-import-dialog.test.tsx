import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {sampleCompanyIdMock} from "../../../../../../tests/__mocks__"
import {Button, FileDropzone, Modal, Overlay, Paper} from "../../../../../components"
import {Option} from "../../../../../utils"
import {ErpExcelImportDialog, ErpExcelImportDialogProps} from "../erp-excel-import-dialog"
import * as useErpExcelImportDialogHook from "../hooks/use-erp-excel-import-dialog"
import {UseErpExcelImportDialogHook} from "../hooks/use-erp-excel-import-dialog"

const file = {
  lastModified: new Date(2020, 10, 15).toISOString(),
  name: "mock-file"
} as unknown as File

const hookValuesDefault: UseErpExcelImportDialogHook = {
  file: Option.none(),
  selectFile: jest.fn(),
  deselectFile: jest.fn(),
  uploading: false,
  uploadSuccessful: false,
  uploadFile: jest.fn(),
  fileUploaded: false,
  uploadError: null
}

const stateSpy = jest.spyOn(useErpExcelImportDialogHook, "useErpExcelImportDialog")

const defaultProps: ErpExcelImportDialogProps = {
  sampleCompanyId: sampleCompanyIdMock,
  onDismiss: jest.fn()
}

const getComponent = (props?: Partial<ErpExcelImportDialogProps>) => (
  <ErpExcelImportDialog {...{...defaultProps, ...props}} />
)

describe("erp-excel-import-dialog", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (file)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, file: Option.of(file)})
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, file: Option.of(file), uploading: true})
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (upload successful)", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      file: Option.of(file),
      uploadSuccessful: true,
      fileUploaded: true
    })
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (upload failed)", async () => {
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      file: Option.of(file),
      fileUploaded: true,
      uploadError: "mock-error"
    })
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (no file)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(".erp-excel-import-content")).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-warning")).toHaveLength(1)

    const downloadLink = modalContent.find({"data-testid": "download-link"})
    expect(downloadLink).toHaveLength(1)
    expect(downloadLink.find(Button)).toHaveLength(1)

    expect(modalContent.find(".erp-excel-import-file-content")).toHaveLength(1)
    expect(modalContent.find(Paper)).toHaveLength(0)
    expect(modalContent.find(".erp-excel-import-upload-error")).toHaveLength(0)

    const dropZone = modalContent.find(FileDropzone)
    expect(dropZone).toHaveLength(1)

    const dropZoneContent = dropZone.dive()
    expect(dropZoneContent.find(".erp-excel-import-upload-indicator")).toHaveLength(0)
    expect(dropZoneContent.find(".erp-excel-import-upload-description")).toHaveLength(1)
  })
  it("has correct structure (loading)", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, uploading: true})

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(".erp-excel-import-content")).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-warning")).toHaveLength(1)

    const downloadLink = modalContent.find({"data-testid": "download-link"})
    expect(downloadLink).toHaveLength(1)
    expect(downloadLink.find(Button)).toHaveLength(1)

    expect(modalContent.find(".erp-excel-import-file-content")).toHaveLength(1)
    expect(modalContent.find(Paper)).toHaveLength(0)
    expect(modalContent.find(".erp-excel-import-upload-error")).toHaveLength(0)

    const dropZone = modalContent.find(FileDropzone)
    expect(dropZone).toHaveLength(1)

    const dropZoneContent = dropZone.dive()
    expect(dropZoneContent.find(".erp-excel-import-upload-indicator")).toHaveLength(1)
    expect(dropZoneContent.find(".erp-excel-import-upload-description")).toHaveLength(0)
  })
  it("has correct structure (file)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, file: Option.of(file)})

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(".erp-excel-import-content")).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-warning")).toHaveLength(1)

    const downloadLink = modalContent.find({"data-testid": "download-link"})
    expect(downloadLink).toHaveLength(1)
    expect(downloadLink.find(Button)).toHaveLength(1)

    expect(modalContent.find(".erp-excel-import-file-content")).toHaveLength(1)
    expect(modalContent.find(Paper)).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-upload-error")).toHaveLength(0)
    expect(modalContent.find(FileDropzone)).toHaveLength(0)
  })
  it("has correct structure (upload failed)", () => {
    stateSpy.mockReturnValue({...hookValuesDefault, file: Option.of(file), fileUploaded: true, uploadError: "Failed"})

    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const modal = overlay.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(".erp-excel-import-content")).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-warning")).toHaveLength(1)

    const downloadLink = modalContent.find({"data-testid": "download-link"})
    expect(downloadLink).toHaveLength(1)
    expect(downloadLink.find(Button)).toHaveLength(1)

    expect(modalContent.find(".erp-excel-import-file-content")).toHaveLength(1)
    expect(modalContent.find(Paper)).toHaveLength(1)
    expect(modalContent.find(".erp-excel-import-upload-error")).toHaveLength(1)
    expect(modalContent.find(FileDropzone)).toHaveLength(0)
  })
  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(hookValuesDefault)

    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const modal = component.find(Overlay).dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
