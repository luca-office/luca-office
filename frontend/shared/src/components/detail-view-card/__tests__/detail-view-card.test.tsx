import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {DetailViewCard, DetailViewCardProps} from "../detail-view-card"

const defaultProps: DetailViewCardProps = {
  label: "DetailViewCard",
  content: <div className={"test-content"}>Content</div>,
  footer: <div className={"test-footer"}>Footer</div>
}

const getComponent = (props?: Partial<DetailViewCardProps>) => <DetailViewCard {...{...defaultProps, ...props}} />

describe("detail-view-card", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has content and footer", () => {
    const component = getComponent()
    const tree = shallow(component)

    const content = tree.find(".test-content")
    expect(content).toHaveLength(1)

    const footer = tree.find(".test-footer")
    expect(footer).toHaveLength(1)
  })
  it("render custom header", () => {
    const component = getComponent({cardHeader: <div className="card-header">header</div>})
    const tree = shallow(component)

    const content = tree.find(".card-header")
    expect(content).toHaveLength(1)
  })
})
