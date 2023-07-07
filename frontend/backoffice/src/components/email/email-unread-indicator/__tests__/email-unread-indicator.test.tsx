import {render} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {EmailUnreadIndicator, EmailUnreadIndicatorProps} from "../email-unread-indicator"

const defaultProps: EmailUnreadIndicatorProps = {
  text: "Test stuff"
}

const getComponent = (props?: Partial<EmailUnreadIndicatorProps>) => (
  <EmailUnreadIndicator {...{...defaultProps, ...props}} />
)

describe("email-unread-indicator-props", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = getComponent()
    const tree = render(component)
    expect(await tree.findByText("Test stuff")).toBeDefined()
  })
})
