import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {UploadFileType as FileType} from "../../../../enums"
import {FileDropzone} from "../../../file-drop-zone/file-drop-zone"
import {Text} from "../../../typography/typography"
import {UploadSection} from "../../upload-section/upload-section"
import {localFileMock} from "../__mocks__/local-file"
import {AcceptedFileTypes} from "../accepted-file-types/accepted-file-types"
import {SelectLocalFiles, SelectLocalFilesProps} from "../select-local-files"
import {render, screen} from "@testing-library/react"

const defaultProps: SelectLocalFilesProps = {
  fileTypes: [FileType.Graphic],
  onFileDeselect: jest.fn(),
  onFilesAccepted: jest.fn(),
  selectedFiles: [],
  selectTextDocument: jest.fn(),
  selectedTextDocuments: [],
  deselectTextDocument: jest.fn()
}

const useComponent = (props?: Partial<SelectLocalFilesProps>) => <SelectLocalFiles {...defaultProps} {...props} />

describe("SelectLocalFiles", () => {
  it("renders correctly", () => {
    const component = useComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure no files", () => {
    const component = mount(useComponent())
    render(useComponent())

    expect(component.find(AcceptedFileTypes)).toHaveLength(1)
    expect(component.find(UploadSection)).toHaveLength(3)
    expect(component.find(FileDropzone)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(5)
    expect(screen.queryAllByTestId("local-files-placeholder")).toHaveLength(1)
  })

  it("has correct structure 1 file", () => {
    const component = mount(useComponent({selectedFiles: [localFileMock]}))

    expect(component.find(AcceptedFileTypes)).toHaveLength(1)
    expect(component.find(UploadSection)).toHaveLength(3)
    expect(component.find(FileDropzone)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(5)
  })

  it("does disable dropzone if limited to one file and already one selected", () => {
    const component = mount(
      useComponent({
        selectedFiles: [localFileMock],
        isLimitedToSingleItem: true
      })
    )

    expect(component.find(UploadSection)).toHaveLength(3)
    expect(component.find(FileDropzone).prop("disabled")).toEqual(true)
  })
})
