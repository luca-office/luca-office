import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Card, CardContent, CardHeader, Heading, Icon} from "shared/components"
import {SelectionDetailPlaceholder} from "../selection-detail-placeholder"

describe("selection-detail-placeholder", () => {
  it("renders correctly", () => {
    const component = create(<SelectionDetailPlaceholder />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const tree = shallow(<SelectionDetailPlaceholder />)

    expect(tree.find(Card)).toHaveLength(1)
    expect(tree.find(CardContent)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(2)
    expect(tree.find(Icon)).toHaveLength(1)
  })
})
