import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {EditingStatusIndicator, EditingStatusIndicatorProps} from "../editing-status-indicator"

const defaultProps: EditingStatusIndicatorProps = {
  isFinalized: false,
  t: fakeTranslate
}

const getComponent = (props?: Partial<EditingStatusIndicatorProps>) => (
  <EditingStatusIndicator {...{...defaultProps, ...props}} />
)

describe("editing-status-indicator", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly - finalized", () => {
    const component = getComponent({isFinalized: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".editing-status-indicator")).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(0)
  })
  it("has correct structure (text mode)", () => {
    const component = getComponent({iconOnly: false})
    const tree = shallow(component)

    expect(tree.find(".editing-status-indicator")).toHaveLength(1)
    expect(tree.find(Icon)).toHaveLength(0)
    expect(tree.find(Text)).toHaveLength(2)
  })
})
