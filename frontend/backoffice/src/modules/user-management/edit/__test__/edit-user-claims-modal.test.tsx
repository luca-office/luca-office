import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, Icon, Label, Modal, Paper, ReadonlyActionField, SelectableCard} from "shared/components"
import {userAccountMock} from "shared/graphql/__mocks__"
import {UserGlobalClaim} from "../../../../enums"
import {EditUserClaimsModal, EditUserClaimsModalProps} from "../edit-user-claims-modal"

const globalClaims = [
  {claim: UserGlobalClaim.UserManagement, isSelected: true},
  {claim: UserGlobalClaim.FinalizeWithoutPublishing, isSelected: false},
  {claim: UserGlobalClaim.Archive, isSelected: false}
]

const defaultProps: EditUserClaimsModalProps = {
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  user: userAccountMock,
  isCurrentUser: false,
  isUpdateLoading: false,
  onClaimClick: jest.fn(),
  userClaims: globalClaims
}

const getComponent = (props?: Partial<EditUserClaimsModalProps>) => (
  <EditUserClaimsModal {...{...defaultProps, ...props}} />
)

describe("edit-user-claims-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(getComponent())
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(2)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(2)
    expect(component.find(Column)).toHaveLength(4)
    expect(component.find(ReadonlyActionField)).toHaveLength(4)
    expect(component.find(SelectableCard)).toHaveLength(4)
    expect(component.find(SelectableCard).first().prop("disabled")).toBe(false)
  })

  it("has correct structure with current user that is admin", async () => {
    const component = shallow(
      getComponent({isCurrentUser: true, user: {...userAccountMock, mayAdministrateUserAccounts: true}})
    )
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(2)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(2)
    expect(component.find(Column)).toHaveLength(4)
    expect(component.find(ReadonlyActionField)).toHaveLength(4)
    expect(component.find(SelectableCard)).toHaveLength(4)
    expect(component.find(SelectableCard).first().prop("disabled")).toBe(true)
    expect(component.find(SelectableCard).at(0).prop("selected")).toBe(true)
    expect(component.find(SelectableCard).at(1).prop("selected")).toBe(false)
    expect(component.find(SelectableCard).at(2).prop("selected")).toBe(false)
  })
  it("has correct structure with all claims selected", async () => {
    const component = shallow(
      getComponent({
        userClaims: [
          {claim: UserGlobalClaim.FinalizeWithoutPublishing, isSelected: true},
          {claim: UserGlobalClaim.Archive, isSelected: true},
          {claim: UserGlobalClaim.UserManagement, isSelected: true}
        ]
      })
    )
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Label)).toHaveLength(2)
    expect(component.find(Icon)).toHaveLength(2)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(2)
    expect(component.find(Column)).toHaveLength(4)
    expect(component.find(ReadonlyActionField)).toHaveLength(4)
    expect(component.find(SelectableCard)).toHaveLength(4)
    expect(component.find(SelectableCard).at(0).prop("selected")).toBe(true)
    expect(component.find(SelectableCard).at(1).prop("selected")).toBe(true)
    expect(component.find(SelectableCard).at(2).prop("selected")).toBe(true)
  })
})
