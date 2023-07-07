import * as React from "react"
import {create} from "react-test-renderer"
import {DeleteOrArchiveEntityButton, DeleteOrArchiveEntityButtonProps} from "../delete-or-archive-entity-button"

const deleteFn = jest.fn()
const defaultProps: DeleteOrArchiveEntityButtonProps = {
  disabled: false,
  entityId: "123",
  useDeleteHook: id => ({deleteEntity: deleteFn, deleteEntityLoading: false})
}

const getComponent = (props?: Partial<DeleteOrArchiveEntityButtonProps>) => (
  <DeleteOrArchiveEntityButton {...{...defaultProps, ...props}} />
)

describe("delete-or-archive-entity-button", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
