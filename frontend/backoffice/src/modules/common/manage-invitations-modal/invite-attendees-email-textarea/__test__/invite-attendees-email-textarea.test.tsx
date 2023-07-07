import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Paper, Text, TextArea} from "shared/components"
import {emailAddressesMetadataMock} from "../../__mocks__/email-addresses-metadata.mock"
import {InviteAttendeesEmailTextarea, InviteAttendeesEmailTextareaProps} from "../invite-attendees-email-textarea"

const defaultProps: InviteAttendeesEmailTextareaProps = {
  emailAddresseesMetadata: emailAddressesMetadataMock,
  onTextAreaChange: jest.fn(),
  textAreaValue: ""
}

const getComponent = (props?: Partial<InviteAttendeesEmailTextareaProps>) => (
  <InviteAttendeesEmailTextarea {...{...defaultProps, ...props}} />
)

describe("manage-invitations-modal-email-textarea", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = getComponent({
      emailAddresseesMetadata: {
        ...emailAddressesMetadataMock,
        hasInvalidAddress: false,
        alreadyInvitedAddresses: [],
        duplicatedAddresses: []
      }
    })
    const tree = shallow(component)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(TextArea)).toHaveLength(1)
    expect(tree.find(Text).last().prop("children")).toContain(
      "projects__survey_details_invite_emails_number_of_valid_addresses"
    )
  })

  it("has correct structure - containing non valid emails", () => {
    const component = getComponent({
      emailAddresseesMetadata: {
        ...emailAddressesMetadataMock,
        hasInvalidAddress: true,
        alreadyInvitedAddresses: [],
        duplicatedAddresses: []
      }
    })
    const tree = shallow(component)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(TextArea)).toHaveLength(1)
    expect(tree.find(Text).last().prop("children")).toContain("projects__survey_details_invite_emails_invalid")
  })

  it("has correct structure - containing duplicated emails", () => {
    const component = getComponent({
      emailAddresseesMetadata: {...emailAddressesMetadataMock, hasInvalidAddress: false, alreadyInvitedAddresses: []}
    })
    const tree = shallow(component)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(TextArea)).toHaveLength(1)
    expect(tree.find(Text).last().prop("children")).toContain("projects__survey_details_invite_emails_duplications")
  })

  it("has correct structure - containing already invited mails", () => {
    const component = getComponent({
      emailAddresseesMetadata: {...emailAddressesMetadataMock, hasInvalidAddress: false, duplicatedAddresses: []}
    })
    const tree = shallow(component)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(2)
    expect(tree.find(TextArea)).toHaveLength(1)
    expect(tree.find(Text).last().prop("children")).toContain("projects__survey_details_invite_emails_already_invited")
  })
})
