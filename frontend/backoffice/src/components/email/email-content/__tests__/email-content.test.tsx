import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {EmailContent, EmailContentProps} from "../email-content"

const defaultProps: React.PropsWithChildren<EmailContentProps> = {
  header: <div>Header</div>,
  children: <div>Content</div>
}

const getComponent = (props?: Partial<React.PropsWithChildren<EmailContentProps>>) => (
  <EmailContent {...{...defaultProps, ...props}} />
)

describe("email-content", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".email-content-header")).toHaveLength(1)
    expect(tree.find(".email-content-content")).toHaveLength(1)
  })
  it("renders header and content", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(".email-content-header").text()).toEqual("Header")
    expect(tree.find(".email-content-content").text()).toEqual("Content")
  })
})
