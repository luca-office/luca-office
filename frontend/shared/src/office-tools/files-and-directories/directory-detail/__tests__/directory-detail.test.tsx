import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {directoriesMock} from "../../../../__mocks__"
import {Heading, TableContainer} from "../../../../components"
import {filesMock} from "../../../../graphql/__mocks__"
import {DirectoryDetail, DirectoryDetailProps} from "../directory-detail"

const defaultProps: DirectoryDetailProps = {
  t: fakeTranslate,
  directory: directoriesMock[0],
  subdirectories: directoriesMock.filter(directory => directory.parentDirectoryId === directoriesMock[0].id),
  files: filesMock.filter(file => file.directoryId === directoriesMock[0].id),
  onSelectDirectory: jest.fn(),
  onSelectFile: jest.fn()
}

const getComponent = (props?: Partial<DirectoryDetailProps>) => <DirectoryDetail {...{...defaultProps, ...props}} />

describe("directory detail", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(TableContainer)).toHaveLength(1)
  })
})
