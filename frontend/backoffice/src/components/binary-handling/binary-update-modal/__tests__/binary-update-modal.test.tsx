import {queryAllByTestId, render} from "@testing-library/react"
import {shallow} from "enzyme"
import {create} from "react-test-renderer"
import {Button, FileDropzone, Modal} from "shared/components"
import {imageBinariesMock, videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {BinaryType} from "shared/enums"
import {BinaryEntry} from "../binary-entry"
import {BinaryUpdateModal, BinaryUpdateModalProps} from "../binary-update-modal"

const defaultProps: BinaryUpdateModalProps = {
  disabled: false,
  onConfirm: jest.fn(),
  onDelete: jest.fn(),
  onDismiss: jest.fn(),
  src: imageBinariesMock[0].path,
  type: BinaryType.Image
}

const getComponent = (props?: Partial<BinaryUpdateModalProps>) => <BinaryUpdateModal {...{...defaultProps, ...props}} />

describe("binary-update-modal", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (Image)", () => {
    const component = getComponent()
    const tree = shallow(component)

    const modal = tree.find(Modal)
    expect(modal).toHaveLength(1)

    const content = modal.dive()
    const controls = content.find(Button)
    expect(controls).toHaveLength(3)

    const binaryEntries = content.find(BinaryEntry)
    expect(binaryEntries).toHaveLength(2)

    const preview = binaryEntries.at(0).dive()
    expect(preview.find(".image")).toHaveLength(1)
    expect(preview.find("video")).toHaveLength(0)

    const dropZone = binaryEntries.at(1).dive()
    expect(dropZone.find(FileDropzone)).toHaveLength(1)
  })
  it("has correct structure (Video)", async () => {
    const component = getComponent({type: BinaryType.Video, src: videoBinariesMock[0].path})
    const {queryAllByTestId} = render(component)

    expect(queryAllByTestId("video-preview")).toHaveLength(1)
    expect(queryAllByTestId("image-preview")).toHaveLength(0)
  })
  it("handles clicks", () => {
    const mockOnDelete = jest.fn()
    const mockOnDismiss = jest.fn()
    const component = getComponent({onDelete: mockOnDelete, onDismiss: mockOnDismiss})
    const tree = shallow(component)

    const controls = tree.find(Modal).dive().find(Button)

    const confirmButton = controls.at(2).shallow()
    const mockOnConfirm = jest.fn()
    confirmButton.setProps({
      onClick: mockOnConfirm
    })
    confirmButton.simulate("click")
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)

    controls.at(0).simulate("click")
    expect(mockOnDelete).toHaveBeenCalledTimes(1)

    controls.at(1).simulate("click")
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })
})
