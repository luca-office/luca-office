import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {Heading, MediaFilePreview} from "../../../../components"
import {filesMock} from "../../../../graphql/__mocks__"
import {FileDetail, FileDetailProps} from "../file-detail"

const defaultProps: FileDetailProps = {
  t: fakeTranslate,
  file: filesMock[0],
  openFile: jest.fn(),
  openSpreadsheet: jest.fn(),
  openTextDocument: jest.fn()
}

const getComponent = (props?: Partial<FileDetailProps>) => <FileDetail {...{...defaultProps, ...props}} />

describe("file detail", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(MediaFilePreview)).toHaveLength(1)
  })
})
