import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {MarkdownEditor} from "../markdown-editor"

describe("Markdown-editor", () => {
  it("renders correctly", () => {
    const component = <MarkdownEditor defaultValue="Hello World" onChange={jest.fn()} />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = shallow(<MarkdownEditor defaultValue="Hello World" onChange={jest.fn()} />)

    expect(component).toBeDefined()
  })
})
