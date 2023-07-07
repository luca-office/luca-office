import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../tests/utils/translate-mock"
import {directoriesMock} from "../../../__mocks__"
import {FilesAndDirectoriesDetailEmpty, OfficeWindow} from "../../../components"
import {filesMock} from "../../../graphql/__mocks__"
import {Option} from "../../../utils"
import {DirectoryDetail} from "../directory-detail/directory-detail"
import {FileDetail} from "../file-detail/file-detail"
import {FilesAndDirectories, FilesAndDirectoriesProps} from "../files-and-directories"

const defaultProps: FilesAndDirectoriesProps = {
  onClose: jest.fn(),
  onMinimize: jest.fn(),
  selectedDirectoryId: Option.none(),
  selectedFileId: Option.none(),
  isLoading: false,
  directories: directoriesMock,
  files: filesMock,
  onSelectDirectory: jest.fn(),
  onSelectFile: jest.fn(),
  onExpandDirectory: jest.fn(),
  onOpenFile: jest.fn(),
  onOpenSpreadsheetFile: jest.fn(),
  onOpenTextDocumentFile: jest.fn(),
  expandedDirectoryIds: [],
  t: fakeTranslate
}

const getComponent = (props?: Partial<FilesAndDirectoriesProps>) => (
  <FilesAndDirectories {...{...defaultProps, ...props}} />
)

describe("files and directories", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (no selection)", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(OfficeWindow)).toHaveLength(1)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(1)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
    expect(tree.find(FileDetail)).toHaveLength(0)
  })

  it("has correct structure (directory selected)", () => {
    const component = getComponent({selectedDirectoryId: Option.of("a90f0a95-1e7f-4486-becf-0d8ea02a1378")})
    const tree = shallow(component)

    expect(tree.find(OfficeWindow)).toHaveLength(1)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(1)
    expect(tree.find(FileDetail)).toHaveLength(0)
  })

  it("has correct structure (file selected)", () => {
    const component = getComponent({selectedFileId: Option.of("e1523252-f245-457d-a4dc-669423530c09")})
    const tree = shallow(component)

    expect(tree.find(OfficeWindow)).toHaveLength(1)
    expect(tree.find(FilesAndDirectoriesDetailEmpty)).toHaveLength(0)
    expect(tree.find(DirectoryDetail)).toHaveLength(0)
  })
})
