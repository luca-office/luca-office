import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {fontColor, fontColorLight} from "shared/styles"
import {UserTableClaimsField} from "../user-table-claims-field"

describe("user-table-claims-field", () => {
  it("renders correctly", () => {
    const component = create(
      <UserTableClaimsField
        mayAdministrateRScripts={false}
        mayAdministrateUserAccounts={false}
        mayArchive={false}
        mayFinalizeWithoutPublishing={false}
      />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(
      <UserTableClaimsField
        mayAdministrateRScripts={false}
        mayAdministrateUserAccounts={false}
        mayArchive={false}
        mayFinalizeWithoutPublishing={false}
      />
    )
    expect(component.find(Icon)).toHaveLength(4)
    expect(component.find(Text)).toHaveLength(4)
  })
  it("has correct structure with mayAdministrateUserAccounts true", () => {
    const component = shallow(
      <UserTableClaimsField
        mayAdministrateRScripts={false}
        mayAdministrateUserAccounts={true}
        mayArchive={false}
        mayFinalizeWithoutPublishing={false}
      />
    )
    expect(component.find(Icon)).toHaveLength(4)
    expect(component.find(Text)).toHaveLength(4)
    expect(component.find(Icon).first().prop("color")).toBe(fontColor)
    expect(component.find(Icon).at(1).prop("color")).toBe(fontColorLight)
    expect(component.find(Icon).at(2).prop("color")).toBe(fontColorLight)
  })
  it("has correct structure with all claims true", () => {
    const component = shallow(
      <UserTableClaimsField
        mayAdministrateRScripts={true}
        mayAdministrateUserAccounts={true}
        mayArchive={true}
        mayFinalizeWithoutPublishing={true}
      />
    )
    expect(component.find(Icon)).toHaveLength(4)
    expect(component.find(Text)).toHaveLength(4)
    expect(component.find(Icon).first().prop("color")).toBe(fontColor)
    expect(component.find(Icon).at(1).prop("color")).toBe(fontColor)
    expect(component.find(Icon).at(2).prop("color")).toBe(fontColor)
    expect(component.find(Icon).at(3).prop("color")).toBe(fontColor)
  })
})
