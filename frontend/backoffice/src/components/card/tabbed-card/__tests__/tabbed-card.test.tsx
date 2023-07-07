import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardFooter, CardHeader, Text} from "shared/components"
import {cardTabsMock} from "../__mocks__/card-tabs.mock"
import {TabbedCard, TabbedCardProps} from "../tabbed-card"

const getComponent = (props?: Partial<TabbedCardProps>) => (
  <TabbedCard
    tabs={cardTabsMock}
    renderCardHeader={index => <div className={"tab-header"}>sample {index}</div>}
    renderCardFooter={index => <div className={"tab-footer"}>sample {index}</div>}
    {...props}>
    <div className={"text"}>sample</div>
  </TabbedCard>
)

describe("tabable-card", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(CardHeader)).toHaveLength(1)
    expect(component.find(CardFooter)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(cardTabsMock.length * 2)
    expect(component.find(".card-tab")).toHaveLength(cardTabsMock.length)
    expect(component.find(".card-tab-content")).toHaveLength(cardTabsMock.length)
    expect(component.find(".tab-header")).toHaveLength(1)
    expect(component.find(".tab-footer")).toHaveLength(1)
    expect(component.find(".tab-content")).toHaveLength(cardTabsMock.length)
  })
  it("executes actions", () => {
    const selectSpy = jest.fn()
    const component = shallow(getComponent({onSelectTab: selectSpy, defaultActiveIndex: 1}))
    expect(component.find(".card-tab")).toHaveLength(cardTabsMock.length)
    component.find(".card-tab").first().simulate("click")
    expect(selectSpy).toHaveBeenCalledWith(0)
  })
})
