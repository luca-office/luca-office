import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon, Text} from "shared/components"
import {HintText, HintTextProps} from "../hint-text"

const defaultProps: HintTextProps = {
  text: "Test"
}

const getComponent = (props?: Partial<HintTextProps>) => <HintText {...{...defaultProps, ...props}} />

describe("hint-text", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
})
