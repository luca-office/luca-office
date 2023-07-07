import {mount} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ContentLoadingIndicator} from "../../../content-loading-indicator/content-loading-indicator"
import {ContentBottomActionbar, ContentMissingIndicator} from "../../index"
import {Content} from "../content"

describe("content", () => {
  it("renders correctly", () => {
    const component = (
      <Content>
        <div>test content</div>
      </Content>
    )
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correct structure", () => {
    const component = (
      <Content subHeader={<span>header</span>} actionBar={"actions"}>
        <div className="test">test content</div>
      </Content>
    )
    const tree = mount(component)
    const html = tree.html()

    expect(tree.find(".test")).toHaveLength(1)
    expect(tree.find("div")).toHaveLength(4)
    expect(tree.find("span")).toHaveLength(1)
    expect(tree.find(ContentBottomActionbar)).toHaveLength(1)
    expect(html).toContain("test content")
    expect(html).toContain("header")
    expect(html).toContain("actions")
  })
  it("renders correct structure loading", () => {
    const component = (
      <Content subHeader={<span>header</span>} actionBar={"actions"} loading={true}>
        <div className="test">test content</div>
      </Content>
    )
    const tree = mount(component)

    expect(tree.find(".test")).toHaveLength(0)
    expect(tree.find("div")).toHaveLength(3)
    expect(tree.find("span")).toHaveLength(1)
    expect(tree.find(ContentLoadingIndicator)).toHaveLength(1)
    expect(tree.find(ContentBottomActionbar)).toHaveLength(0)
  })
  it("renders correct structure missing content", () => {
    const component = (
      <Content subHeader={<span>header</span>} actionBar={"actions"} isContentMissing={true}>
        <div className="test">test content</div>
      </Content>
    )
    const tree = mount(component)

    expect(tree.find(".test")).toHaveLength(0)
    expect(tree.find("span")).toHaveLength(1)
    expect(tree.find(ContentMissingIndicator)).toHaveLength(1)
    expect(tree.find(ContentBottomActionbar)).toHaveLength(0)
  })
  it("renders correct structure missing content and loading", () => {
    const component = (
      <Content subHeader={<span>header</span>} actionBar={"actions"} isContentMissing={true} loading={true}>
        <div className="test">test content</div>
      </Content>
    )
    const tree = mount(component)

    expect(tree.find(".test")).toHaveLength(0)
    expect(tree.find("div")).toHaveLength(3)
    expect(tree.find("span")).toHaveLength(1)
    expect(tree.find(ContentMissingIndicator)).toHaveLength(0)
    expect(tree.find(ContentLoadingIndicator)).toHaveLength(1)
    expect(tree.find(ContentBottomActionbar)).toHaveLength(0)
  })
})
