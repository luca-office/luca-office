import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Tag} from "shared/components"
import {MetaEntryTags, MetaEntryTagsProps} from "../.."

const defaultProps: MetaEntryTagsProps = {
  disabled: false,
  handleUpdate: jest.fn(),
  tags: [],
  updateLoading: false
}

const getComponent = (props?: Partial<MetaEntryTagsProps>) => <MetaEntryTags {...{...defaultProps, ...props}} />

describe("meta-entry-tags", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders tags correctly", () => {
    const component = getComponent({tags: ["tag1", "tag2", "tag3"]})
    const tree = mount(component)

    const tags = tree.find(Tag)
    expect(tags).toHaveLength(3)
    expect(tags.first().prop("text")).toBe("tag1")
    expect(tags.last().prop("text")).toBe("tag3")
  })
})
