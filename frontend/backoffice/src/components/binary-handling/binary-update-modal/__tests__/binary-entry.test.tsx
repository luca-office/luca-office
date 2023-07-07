import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {BinaryEntry, BinaryEntryProps} from "../binary-entry"

const defaultProps: BinaryEntryProps = {
  className: "binary-entry",
  headerKey: "file__preview__label"
}

const getComponent = (props?: Partial<BinaryEntryProps>) => <BinaryEntry {...{...defaultProps, ...props}} />

describe("binary-entry", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(".binary-entry-header")).toHaveLength(1)
    expect(tree.find(".binary-entry-content")).toHaveLength(1)
  })
})
