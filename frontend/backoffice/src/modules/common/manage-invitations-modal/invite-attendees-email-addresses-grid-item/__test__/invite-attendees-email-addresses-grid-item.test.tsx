import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Paper, Text} from "shared/components"
import {
  InviteAttendeesEmailAddressesGridItem,
  InviteAttendeesEmailAddressesGridItemProps
} from "../invite-attendees-email-addresses-grid-item"

const defaultProps: InviteAttendeesEmailAddressesGridItemProps = {
  emailAddress: "maxmustermann@web.de",
  isEmpty: false
}

const getComponent = (props?: Partial<InviteAttendeesEmailAddressesGridItemProps>) => (
  <InviteAttendeesEmailAddressesGridItem {...{...defaultProps, ...props}} />
)

describe("manage-invitations-modal-email-addresses-grid-item", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", () => {
    const component = getComponent()
    const tree = shallow(component)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
  })
})
