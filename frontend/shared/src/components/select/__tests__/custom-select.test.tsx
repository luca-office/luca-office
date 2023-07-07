import {mount, shallow} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../tests/redux/fake-store"
import {IconName} from "../../../enums"
import {initialSharedAppState} from "../../../redux/state"
import {FormFieldLabel} from "../.."
import {CustomSelect, SelectOptionCustomized} from "../custom-select"

const selectOptionsMock: SelectOptionCustomized[] = [
  {
    value: "value_1",
    label: "Value 1",
    iconColor: "red",
    iconName: IconName.EmailIncoming
  },
  {
    value: "value_2",
    label: "Value 2"
  },
  {
    value: "value_3",
    label: "Value 3",
    renderOptionLabel: label => <h2>{label}</h2>
  }
]
describe("custom-select", () => {
  it("renders correctly", () => {
    const component = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <CustomSelect onChange={jest.fn()} optionList={selectOptionsMock} value={selectOptionsMock[1].value} />
      </Provider>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with additional props", () => {
    const component = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <CustomSelect
          onChange={jest.fn()}
          optionList={selectOptionsMock}
          value={selectOptionsMock[1].value}
          searchable
          clearable
          labelKey={"confirm_button"}
          placeholderKey={"cancel_button"}
        />
      </Provider>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = mount(
      <Provider store={fakeStore(initialSharedAppState)}>
        <CustomSelect
          onChange={jest.fn()}
          optionList={selectOptionsMock}
          value={selectOptionsMock[1].value}
          searchable
          clearable
          labelKey={"confirm_button"}
          placeholderKey={"cancel_button"}
        />
      </Provider>
    )

    expect(component).toBeDefined()
    expect(component.find(FormFieldLabel)).toHaveLength(1)
    expect(component.html()).toContain("MockedSelect")
  })
})
