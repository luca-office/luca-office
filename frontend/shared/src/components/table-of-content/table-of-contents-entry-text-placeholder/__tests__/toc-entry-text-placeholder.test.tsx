import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {HeadingLevel, IconName} from "../../../../enums"
import {errorColor} from "../../../../styles"
import {Heading, Icon} from "../../.."
import {TocEntryPlaceholder} from "../table-of-contents-entry-text-placeholder"

const getComponent = () => <TocEntryPlaceholder />

describe("toc-entry-text-placeholder", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    const icon = tree.find(Icon)
    expect(icon).toHaveLength(1)
    expect(icon.prop("color")).toEqual(errorColor)
    expect(icon.prop("name")).toEqual(IconName.AlignmentLeft)

    const heading = tree.find(Heading)
    expect(heading).toHaveLength(1)
    expect(heading.prop("level")).toEqual(HeadingLevel.h3)
    expect(heading.dive().text()).toEqual("reference_books__placeholder_text")
  })
})
