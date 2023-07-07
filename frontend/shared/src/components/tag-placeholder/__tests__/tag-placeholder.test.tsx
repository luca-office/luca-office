import * as React from "react"
import {create} from "react-test-renderer"
import {TagPlaceholder} from "../tag-placeholder"

describe("tag-placeholder", () => {
  it("renders correctly", () => {
    const component = <TagPlaceholder />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
