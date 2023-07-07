import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {automatedCodingItemMock} from "../../../graphql/__mocks__"
import {Label} from "../../label/label"
import {Paper} from "../../paper/paper"
import {Heading, Text} from "../../typography/typography"
import {AutomatedCodingItemRuleField, AutomatedCodingItemRuleFieldProps} from "../automated-coding-item-rule-field"

const defaultProps: AutomatedCodingItemRuleFieldProps = {
  automatedCodingItem: automatedCodingItemMock
}

const getComponent = (props?: Partial<AutomatedCodingItemRuleFieldProps>) => (
  <AutomatedCodingItemRuleField {...{...defaultProps, ...props}} />
)

describe("automated-coding-item-rule-field", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (default props)", () => {
    const component = shallow(getComponent())

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Paper)).toHaveLength(1)
    expect(component.find(Heading)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
  })
})
