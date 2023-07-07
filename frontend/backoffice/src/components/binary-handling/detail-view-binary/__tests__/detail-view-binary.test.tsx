import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, ContentImage, Paper} from "shared/components"
import {imageBinariesMock, videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {UploadFileType as FileType} from "shared/enums"
import {BinaryFile} from "shared/models"
import {BinaryFormPlaceholder, DetailViewBinary, DetailViewBinaryProps} from "../../.."

const defaultProps: DetailViewBinaryProps = {
  createText: "test create text",
  placeholderText: "placeholder",
  binaryFile: undefined,
  label: "label",
  onBinariesSuccessfullyUploaded: jest.fn,
  onDeleteBinary: jest.fn,
  readonly: false,
  acceptedFileTypes: [FileType.Graphic]
}

const getComponent = (props?: Partial<DetailViewBinaryProps>) => <DetailViewBinary {...{...defaultProps, ...props}} />

describe("detail-view-binary", () => {
  it("renders correctly without binary", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with binary", () => {
    const component = getComponent({binaryFile: (imageBinariesMock[0] as unknown) as BinaryFile})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with binary, readonly", () => {
    const component = getComponent({binaryFile: (imageBinariesMock[0] as unknown) as BinaryFile, readonly: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (no binary)", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".detail-view-binary")).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(BinaryFormPlaceholder)).toHaveLength(1)
  })
  it("has correct structure (binary)", () => {
    const component = getComponent({binaryFile: (imageBinariesMock[0] as unknown) as BinaryFile})
    const tree = shallow(component)

    expect(tree.find(".detail-view-binary")).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(ContentImage)).toHaveLength(1)
    expect(tree.find(".remove-overlay")).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Button).prop("disabled")).toBeFalsy()
  })
  it("has correct structure (video)", () => {
    const component = getComponent({binaryFile: (videoBinariesMock[0] as unknown) as BinaryFile})
    const tree = shallow(component)

    expect(tree.find(".detail-view-binary")).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(ContentImage)).toHaveLength(1)
    expect(tree.find(".remove-overlay")).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Button).prop("disabled")).toBeFalsy()
  })
  it("has correct structure (binary) - readonly", () => {
    const component = getComponent({binaryFile: (imageBinariesMock[0] as unknown) as BinaryFile, readonly: true})
    const tree = shallow(component)

    expect(tree.find(".detail-view-binary")).toHaveLength(1)
    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(ContentImage)).toHaveLength(1)
    expect(tree.find(".remove-overlay")).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
    expect(tree.find(Button).prop("disabled")).toBeTruthy()
  })
})
