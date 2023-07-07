import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button} from "shared/components"
import {ReferenceBookDetailFooter, ReferenceBookDetailFooterProps} from "../reference-book-detail-footer"

const defaultProps: ReferenceBookDetailFooterProps = {
  author: "Test",
  buttonText: "TestButton",
  creationDate: new Date(2020, 10, 5),
  disabled: false,
  onButtonClick: jest.fn()
}

describe("content-type-dialog", () => {
  const mockComponent = <ReferenceBookDetailFooter {...defaultProps} />

  it("renders correctly", () => {
    const tree = create(mockComponent).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const tree = shallow(mockComponent)

    expect(tree).toBeDefined()
  })

  it("triggers on Confirm on Click", () => {
    const mockOnConfirm = jest.fn()
    const component = <ReferenceBookDetailFooter {...{...defaultProps, onButtonClick: mockOnConfirm}} />
    const tree = shallow(component)

    const button = tree.find(Button)
    button.simulate("click")
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
  })
})
