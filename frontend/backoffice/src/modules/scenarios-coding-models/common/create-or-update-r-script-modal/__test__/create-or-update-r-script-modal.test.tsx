import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardHeader, Modal, Overlay, SelectableCard, Text, TextInput} from "shared/components"
import {rScriptsMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {ChooseRScriptModalProps, CreateOrUpdateRScriptModal} from "../create-or-update-r-script-modal"

const defaultProps: ChooseRScriptModalProps = {
  isConfirmButtonLoading: false,
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  rScripts: [],
  searchValue: "",
  selectedRScriptId: Option.none(),
  setSearchValue: jest.fn(),
  setSelectedRScriptId: jest.fn()
}

const getComponent = (props?: Partial<ChooseRScriptModalProps>) => (
  <CreateOrUpdateRScriptModal {...{...defaultProps, ...props}} />
)

describe("create-or-update-r-script-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(3)
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(0)
  })
  it("has correct structure with r script", () => {
    const component = shallow(getComponent({rScripts: rScriptsMock}))
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(3)
  })
  it("selected correct r Script", () => {
    const component = shallow(
      getComponent({rScripts: rScriptsMock, selectedRScriptId: Option.of("4d65fb23-d10d-42d4-a659-ba834e38f4c1")})
    )
    expect(component.find(SelectableCard)).toHaveLength(3)
    expect(component.find(SelectableCard).at(0).prop("selected")).toBe(false)
    expect(component.find(SelectableCard).at(1).prop("selected")).toBe(true)
    expect(component.find(SelectableCard).at(2).prop("selected")).toBe(false)
  })
})
