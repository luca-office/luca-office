import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, CardHeader, Heading, Icon, Text, Tooltip} from "shared/components"
import {EmailBodyMessageHeader, EmailBodyMessageHeaderProps} from "../email-body-message-header"

const defaultProps: EmailBodyMessageHeaderProps = {
  onTemplateSelection: jest.fn()
}

const getComponent = (props?: Partial<EmailBodyMessageHeaderProps>) => (
  <EmailBodyMessageHeader {...{...defaultProps, ...props}} />
)

describe("email-body-message-header", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(Tooltip)).toHaveLength(5)
    expect(tree.find(Icon)).toHaveLength(1)
    expect(tree.find(CardHeader)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(4)
  })
})
