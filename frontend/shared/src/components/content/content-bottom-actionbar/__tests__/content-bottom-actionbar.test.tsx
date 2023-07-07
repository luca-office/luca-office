import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentBottomActionbar} from "../content-bottom-actionbar"

describe("content-bottom-actionbar", () => {
  it("renders correctly", () => {
    const component = <ContentBottomActionbar />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = <ContentBottomActionbar>hello world</ContentBottomActionbar>
    const tree = shallow(component)

    expect(tree.find(".bottom-action-bar")).toHaveLength(1)
    expect(tree.html()).toContain("hello world")
  })
})
