import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon} from "shared/components"
import {SettingsHeaderIcons} from "../settings-header-icons"

describe("settings-header-icons", () => {
  it("renders correctly", () => {
    const component = <SettingsHeaderIcons />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(<SettingsHeaderIcons />)
    expect(component.find(Icon)).toHaveLength(1)
  })

  it("has correct structure with optional props", () => {
    const component = shallow(<SettingsHeaderIcons showMail={true} showTextEditor={true} />)
    expect(component.find(Icon)).toHaveLength(3)
  })
})
