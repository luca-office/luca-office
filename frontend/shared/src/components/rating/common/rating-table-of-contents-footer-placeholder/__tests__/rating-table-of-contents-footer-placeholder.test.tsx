import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Icon} from "../../../../icon/icon"
import {Text} from "../../../../typography/typography"
import {RatingTableOfContentsFooterPlaceholder} from "../rating-table-of-contents-footer-placeholder"

const getComponent = () => <RatingTableOfContentsFooterPlaceholder />

describe("rating-table-of-contents-footer-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
  })
})
