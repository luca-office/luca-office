import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Text} from "shared/components"
import {RaterRatingOverviewPlaceholder} from "../rater-rating-overview-placeholder"

const getComponent = () => <RaterRatingOverviewPlaceholder />

describe("rater-rating-overview-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const heading = tree.find(Heading)
    expect(heading).toHaveLength(1)
    expect(heading.html()).toContain("rater_rating__placeholder_title")

    const text = tree.find(Text)
    expect(text).toHaveLength(1)
    expect(text.html()).toContain("rater_rating__placeholder_description")
  })
})
