import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DesktopBackground} from "../desktop-background"

const getComponent = () => <DesktopBackground />

describe("desktop-background", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(".background-logo")).toHaveLength(1)
  })
})
