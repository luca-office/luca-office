import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, OverviewCard} from "../../card"
import {SettingsFooterCard, SettingsFooterCardProps} from "../settings-footer-card"

const defaultProps: SettingsFooterCardProps = {
  label: "email-body-footer-card-label",
  text: "email-body-footer-card-text"
}

const getComponent = (props?: Partial<SettingsFooterCardProps>) => (
  <SettingsFooterCard {...{...defaultProps, ...props}} />
)

describe("email-body-footer-card", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const overviewCard = tree.find(OverviewCard)
    expect(overviewCard).toHaveLength(1)

    const card = overviewCard.dive().find(Card)
    expect(card).toHaveLength(1)

    const content = card.dive()
    const label = content.find(".label")
    const text = content.find(".text")
    expect(label).toHaveLength(1)
    expect(text).toHaveLength(1)
    expect(content.find(".content")).toHaveLength(1)
    expect(content.find(".disabled-overlay")).toHaveLength(0)

    expect(label.text()).toEqual(defaultProps.label)
    expect(text.text()).toEqual(defaultProps.text)
  })
})
