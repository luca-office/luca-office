import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {IconName} from "../../../../../enums"
import {Icon} from "../../../../icon/icon"
import {Text} from "../../../../typography/typography"
import {RatingTableOfContentsFooter, RatingTableOfContentsFooterProps} from "../rating-table-of-contents-footer"

const defaultProps: RatingTableOfContentsFooterProps = {
  allRated: false,
  score: 35,
  maxScore: 60
}

const getComponent = (props?: Partial<RatingTableOfContentsFooterProps>) => (
  <RatingTableOfContentsFooter {...{...defaultProps, ...props}} />
)

describe("rating-table-of-contents-footer", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (all rated)", () => {
    const component = getComponent({allRated: true})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(2)

    const icon = tree.find(Icon)
    expect(icon).toHaveLength(1)
    expect(icon.prop("name")).toEqual(IconName.Sandglass)
  })
  it("has correct structure (all rated)", () => {
    const component = getComponent({allRated: true})
    const tree = shallow(component)

    expect(tree.find(Text)).toHaveLength(2)

    const icon = tree.find(Icon)
    expect(icon).toHaveLength(1)
    expect(icon.prop("name")).toEqual(IconName.Check)
  })
})
