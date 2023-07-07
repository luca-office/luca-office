import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Breadcrumb} from "../breadcrumb"

const getComponent = () => <Breadcrumb />

describe("breadcrumb", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(getComponent())

    const breadcrumb = component.find(".breadcrumb")
    expect(breadcrumb).toHaveLength(1)
  })
})
