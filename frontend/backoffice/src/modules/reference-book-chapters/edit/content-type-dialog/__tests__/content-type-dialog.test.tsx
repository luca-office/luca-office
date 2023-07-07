import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, SelectableCard} from "shared/components"
import {ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {ContentTypeDialog, ContentTypeDialogProps} from "../content-type-dialog"

const defaultProps: ContentTypeDialogProps = {
  onDismiss: jest.fn(),
  onConfirm: jest.fn()
}

describe("content-type-dialog", () => {
  const mockComponent = <ContentTypeDialog {...defaultProps} />

  it("renders correctly", () => {
    const tree = create(mockComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(mockComponent)
    expect(component).toBeDefined()

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(4)
  })

  it("defaults to Text Content on Confirm Click", () => {
    const mockOnConfirm = jest.fn()
    const component = <ContentTypeDialog onDismiss={jest.fn()} onConfirm={mockOnConfirm} />
    const tree = mount(component)

    const modal = tree.find(Modal)
    expect(modal).toHaveLength(1)

    modal.props().onConfirm()
    expect(mockOnConfirm).toBeCalledWith(ReferenceBookContentType.TextContent)
  })
})
