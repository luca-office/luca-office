import React from "react"
import {create} from "react-test-renderer"
import {InfoTag} from "shared/components/scenario-info-card/info-tag"

describe("InfoTag", () => {
  it("renders correctly (string content)", () => {
    const component = create(<InfoTag label={"Label"} content={"Content"} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (html content)", () => {
    const component = create(<InfoTag label={"Label"} content={<div>HTML Content</div>} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
