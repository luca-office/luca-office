import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DesktopBackground} from "../desktop-background"
import {DesktopBackgroundOverlay} from "../desktop-background-overlay"

const getComponent = () => <DesktopBackgroundOverlay />

describe("desktop-background-overlay", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)
    expect(tree.find(DesktopBackground)).toHaveLength(1)
  })
})
