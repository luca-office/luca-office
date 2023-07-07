import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, Icon, Text} from "shared/components"
import {codingItemMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import {CodingItemMetaCard, ItemMetaCardProps} from "../coding-item-meta-card"

const defaultProps: ItemMetaCardProps = {
  codingItem: Option.of(codingItemMock)
}

const getComponent = (props?: Partial<ItemMetaCardProps>) => <CodingItemMetaCard {...{...defaultProps, ...props}} />

describe("coding-item-meta-card", () => {
  it("renders correctly (selected coding item)", async () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (no selected coding item)", async () => {
    const component = create(getComponent({codingItem: Option.none()}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (selected coding item)", async () => {
    const component = shallow(getComponent())

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(8)
    expect(component.find(Icon)).toHaveLength(2)
  })
  it("has correct structure (no selected coding item)", async () => {
    const component = shallow(getComponent({codingItem: Option.none()}))

    expect(component.find(Card)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(8)
    expect(component.find(Icon)).toHaveLength(1)
  })
})
