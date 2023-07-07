import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {SubHeader, TextInput} from "shared/components"
import {userAccountMock, userAccountsMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {UserGlobalClaim} from "../../../../enums"
import {UserAccount} from "../../../../models"
import {EditUserClaimsModalContainer} from "../../edit/edit-user-claims-modal-container"
import {FilterUserClaimsCard} from "../filter-user-claims-card/filter-user-claims-card"
import {UserManagementDetail} from "../user-management-detail"
import {UserTable} from "../user-table/user-table"

const globalClaims = [
  {isSelected: false, claim: UserGlobalClaim.UserManagement},
  {isSelected: false, claim: UserGlobalClaim.Archive},
  {isSelected: false, claim: UserGlobalClaim.FinalizeWithoutPublishing}
]

describe("user-management-detail", () => {
  it("renders correctly", () => {
    const component = create(
      <UserManagementDetail
        setUserForEditingModal={jest.fn()}
        userForEditingModal={Option.none()}
        toggleUserClaim={jest.fn()}
        onSearchValueChange={jest.fn()}
        searchValue=""
        users={userAccountsMock}
        globalClaims={globalClaims}
      />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(
      <UserManagementDetail
        setUserForEditingModal={jest.fn()}
        userForEditingModal={Option.none()}
        toggleUserClaim={jest.fn()}
        onSearchValueChange={jest.fn()}
        searchValue=""
        users={userAccountsMock}
        globalClaims={globalClaims}
      />
    )
    expect(component.find(SubHeader)).toHaveLength(1)
    expect(component.find(FilterUserClaimsCard)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(EditUserClaimsModalContainer)).toHaveLength(0)
    expect(component.find(UserTable)).toHaveLength(1)
  })
  it("has correct structure with editing modal", async () => {
    const component = shallow(
      <UserManagementDetail
        setUserForEditingModal={jest.fn()}
        userForEditingModal={Option.of<UserAccount>(userAccountMock)}
        toggleUserClaim={jest.fn()}
        onSearchValueChange={jest.fn()}
        searchValue=""
        users={userAccountsMock}
        globalClaims={globalClaims}
      />
    )
    expect(component.find(SubHeader)).toHaveLength(1)
    expect(component.find(FilterUserClaimsCard)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(EditUserClaimsModalContainer)).toHaveLength(1)
    expect(component.find(UserTable)).toHaveLength(1)
  })
  it("toggles search on Change correctly", () => {
    const onSearchChange = jest.fn()
    const component = shallow(
      <UserManagementDetail
        setUserForEditingModal={jest.fn()}
        userForEditingModal={Option.none()}
        toggleUserClaim={jest.fn()}
        onSearchValueChange={onSearchChange}
        searchValue=""
        users={userAccountsMock}
        globalClaims={globalClaims}
      />
    )
    const textInput = component.find(TextInput)
    expect(textInput).toHaveLength(1)
    const search = "test"
    act(() => {
      textInput.simulate("change", search)
    })
    expect(onSearchChange).toBeCalledWith("test")
  })
})
