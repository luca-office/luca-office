import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay, SelectableCard, Text} from "shared/components"
import {EditDateModalProps, EditScenarioDateModal} from "../edit-date-modal"

const defaultProps: EditDateModalProps = {
  isFictiveDateSelected: false,
  onConfirm: jest.fn(),
  onDismiss: jest.fn(),
  selectedFictiveDate: new Date(),
  setIsFictiveDateSelected: jest.fn(),
  setSelectedFictiveDate: jest.fn()
}

const fictiveDate = new Date(10, 10, 2020)

const getComponent = (props?: Partial<EditDateModalProps>) => <EditScenarioDateModal {...{...defaultProps, ...props}} />

describe("edit-date-modal", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(2)
    expect(component.find(SelectableCard).first().prop("selected")).toBe(true)
    expect(component.find(SelectableCard).last().prop("selected")).toBe(false)
  })
  it("has correct structure fictive Date Selected", () => {
    const component = shallow(getComponent({isFictiveDateSelected: true}))
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(SelectableCard)).toHaveLength(2)
    expect(component.find(SelectableCard).first().prop("selected")).toBe(false)
    expect(component.find(SelectableCard).last().prop("selected")).toBe(true)
  })

  it("triggers onConfirm correctly", () => {
    const onConfirm = jest.fn()

    const component = shallow(getComponent({onConfirm}))
    component.find(Modal).dive().find(".confirm-button").simulate("click")
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledWith(null)
  })
  it("triggers onConfirm correctly with fictive date", () => {
    const onConfirm = jest.fn()

    const component = shallow(getComponent({onConfirm, isFictiveDateSelected: true, selectedFictiveDate: fictiveDate}))
    component.find(Modal).dive().find(".confirm-button").simulate("click")
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledWith(fictiveDate.toISOString())
  })
})
