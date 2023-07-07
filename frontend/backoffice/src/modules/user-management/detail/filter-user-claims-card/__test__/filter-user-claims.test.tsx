import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Checkbox, Label, Paper} from "shared/components"
import {UserGlobalClaim} from "../../../../../enums"
import {FilterUserClaimsCard} from "../filter-user-claims-card"

describe("filter-user-claims", () => {
  it("renders correctly", () => {
    const component = create(<FilterUserClaimsCard globalClaims={[]} toggleUserClaim={jest.fn()} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(<FilterUserClaimsCard globalClaims={[]} toggleUserClaim={jest.fn()} />)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Checkbox)).toHaveLength(0)
  })
  it("has correct structure with rights and selected", () => {
    const component = shallow(
      <FilterUserClaimsCard
        globalClaims={[
          {isSelected: true, claim: UserGlobalClaim.UserManagement},
          {isSelected: false, claim: UserGlobalClaim.Archive}
        ]}
        toggleUserClaim={jest.fn()}
      />
    )
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Checkbox)).toHaveLength(2)
    expect(component.find(Checkbox).first().prop("checked")).toBe(true)
    expect(component.find(Checkbox).last().prop("checked")).toBe(false)
  })
})
