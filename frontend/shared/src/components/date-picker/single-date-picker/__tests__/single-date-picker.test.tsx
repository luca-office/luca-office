import {mount, shallow} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../../tests/redux/fake-store"
import {initialSharedAppState} from "../../../../redux/state"
import {Label} from "../../../label/label"
import {SingleDatePicker, SingleDatePickerProps} from "../single-date-picker"

const defaultProps: SingleDatePickerProps = {
  label: "test label",
  onChange: jest.fn,
  value: new Date("Mon Sep 21 2020 18:27:05 GMT+0200 (Central European Summer Time)")
}

const getComponent = (props?: Partial<SingleDatePickerProps>) => (
  <Provider store={fakeStore(initialSharedAppState)}>
    <SingleDatePicker {...{...defaultProps, ...props}} />
  </Provider>
)

describe("date-picker", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders disabled", () => {
    const component = getComponent({disabled: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Label)).toHaveLength(1)
    expect(tree.html()).toContain("Mocked Date Picker")
  })
})
