import {shallow} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {Column, Columns, Label, SelectableCard} from "shared/components"
import {AutomatedCodingItemRule} from "shared/graphql/generated/globalTypes"
import {AutomatedRulesCards, AutomatedRulesCardsProps} from "../automated-rules-cards"

const defaultProps: AutomatedRulesCardsProps = {
  selectedRule: AutomatedCodingItemRule.DocumentView,
  setSelectedRule: jest.fn()
}

const getComponent = (props?: Partial<AutomatedRulesCardsProps>) => (
  <AutomatedRulesCards {...{...defaultProps, ...props}} />
)

describe("AutomatedRulesCards", () => {
  it("renders correctly with default props", () => {
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (default props)", () => {
    const component = shallow(getComponent())

    expect(component.find(Label)).toHaveLength(1)
    expect(component.find(Columns)).toHaveLength(2)
    expect(component.find(Column)).toHaveLength(5)
    expect(component.find(SelectableCard)).toHaveLength(5)
  })
})
