import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Text} from "../../../../typography/typography"
import {RatingPlaceholder, RatingPlaceholderProps} from "../rating-placeholder"

const getComponent = (props?: Partial<RatingPlaceholderProps>) => <RatingPlaceholder {...{...props}} />

describe("rating-placeholder", () => {
  it("renders correctly", () => {
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (custom labels)", () => {
    const component = create(getComponent({title: "custom_title", description: "custom_description"}))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const tree = shallow(getComponent())

    const heading = tree.find(Heading)
    expect(heading).toHaveLength(1)
    expect(heading.html()).toContain("rating__rating__placeholder_headline")

    const text = tree.find(Text)
    expect(text).toHaveLength(1)
    expect(text.html()).toContain("rating__rating__placeholder_text")
  })
  it("has correct structure (custom labels)", () => {
    const tree = shallow(getComponent({title: "custom_title", description: "custom_description"}))

    const heading = tree.find(Heading)
    expect(heading).toHaveLength(1)
    expect(heading.html()).toContain("custom_title")

    const text = tree.find(Text)
    expect(text).toHaveLength(1)
    expect(text.html()).toContain("custom_description")
  })
})
