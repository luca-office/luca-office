import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Icon, Text, Tooltip} from "shared/components"
import {useLucaTranslation} from "shared/translations"
import {emailAddressesMetadataMock} from "../../__mocks__/email-addresses-metadata.mock"
import {InviteAttendeesEmailAddressesGridItem} from "../../invite-attendees-email-addresses-grid-item/invite-attendees-email-addresses-grid-item"
import {
  InviteAttendeesEmailAddressesGrid,
  InviteAttendeesEmailAddressesGridProps
} from "../invite-attendees-email-addresses-grid"

const mockedAlreadyInvitedEmailAddresses = emailAddressesMetadataMock.alreadyInvitedAddresses
const mockedEmailAddresses = emailAddressesMetadataMock.validAddresses

const defaultProps: InviteAttendeesEmailAddressesGridProps = {
  emailAddressesMetadata: emailAddressesMetadataMock,
  onDeleteEmailAddress: jest.fn(),
  alreadyInvitedEmailAddresses: mockedAlreadyInvitedEmailAddresses
}

const getComponent = (props?: Partial<InviteAttendeesEmailAddressesGridProps>) => (
  <InviteAttendeesEmailAddressesGrid {...{...defaultProps, ...props}} />
)

describe("manage-invitations-modal-email-addresses-grid", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure - two mails", () => {
    const component = getComponent({
      emailAddressesMetadata: {
        ...emailAddressesMetadataMock,
        validAddresses: [mockedEmailAddresses[0], mockedEmailAddresses[1]],
        uniqueAddresses: [mockedEmailAddresses[0], mockedEmailAddresses[1]],
        duplicatedAddresses: [],
        alreadyInvitedAddresses: []
      },
      alreadyInvitedEmailAddresses: []
    })
    const tree = shallow(component)

    expect(tree.find(".wrapper")).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(".grid-wrapper")).toHaveLength(1)
    expect(tree.find(".grid-top-bar")).toHaveLength(1)
    expect(tree.find(".grid-scroll-wrapper")).toHaveLength(1)
    expect(tree.find(InviteAttendeesEmailAddressesGridItem)).toHaveLength(2)
    tree.find(InviteAttendeesEmailAddressesGridItem).forEach(node => {
      expect(node.prop("isEmpty")).toBe(false)
    })
    expect(tree.find(InviteAttendeesEmailAddressesGridItem).first().prop("emailAddress")).toBe(mockedEmailAddresses[0])
    expect(tree.find(InviteAttendeesEmailAddressesGridItem).last().prop("emailAddress")).toBe(mockedEmailAddresses[1])
    expect(tree.find(".grid-bottom-bar")).toHaveLength(1)
  })

  it("has correct structure - empty emails", () => {
    const component = getComponent({
      emailAddressesMetadata: {
        ...emailAddressesMetadataMock,
        validAddresses: [],
        uniqueAddresses: [],
        duplicatedAddresses: [],
        alreadyInvitedAddresses: []
      },
      alreadyInvitedEmailAddresses: []
    })
    const tree = shallow(component)

    expect(tree.find(".wrapper")).toHaveLength(1)
    expect(tree.find(Heading)).toHaveLength(1)
    expect(tree.find(".grid-wrapper")).toHaveLength(1)
    expect(tree.find(".grid-top-bar")).toHaveLength(1)
    expect(tree.find(".grid-scroll-wrapper")).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    tree.find(InviteAttendeesEmailAddressesGridItem).forEach(node => {
      expect(node.prop("isEmpty")).toBe(true)
      expect(node.prop("emailAddress")).toBe("")
    })
    expect(tree.find(".grid-bottom-bar")).toHaveLength(1)
  })

  it("has correct structure - with one existing emails and no new emails", () => {
    const component = getComponent({
      emailAddressesMetadata: {
        ...emailAddressesMetadataMock,
        validAddresses: [],
        uniqueAddresses: [],
        duplicatedAddresses: [],
        alreadyInvitedAddresses: []
      },
      alreadyInvitedEmailAddresses: mockedAlreadyInvitedEmailAddresses
    })
    const tree = shallow(component)

    tree.find(InviteAttendeesEmailAddressesGridItem).forEach((node, index) => {
      expect(node.prop("isEmpty")).toBe(false)
      expect(node.prop("emailAddress")).toBe(mockedAlreadyInvitedEmailAddresses[index])
      expect(node.prop("disabled")).toBe(true)
    })
  })

  it("has correct structure - with one existing emails and two new emails", () => {
    const component = getComponent({
      emailAddressesMetadata: {
        ...emailAddressesMetadataMock,
        validAddresses: [mockedEmailAddresses[0], mockedEmailAddresses[1]],
        uniqueAddresses: [mockedEmailAddresses[0], mockedEmailAddresses[1]],
        duplicatedAddresses: [],
        alreadyInvitedAddresses: []
      },
      alreadyInvitedEmailAddresses: mockedAlreadyInvitedEmailAddresses
    })
    const tree = shallow(component)

    const addresses = [...mockedAlreadyInvitedEmailAddresses, ...[mockedEmailAddresses[0], mockedEmailAddresses[1]]]

    tree.find(InviteAttendeesEmailAddressesGridItem).forEach((node, index) => {
      expect(node.prop("isEmpty")).toBe(false)
      expect(node.prop("emailAddress")).toBe(addresses[index])
      if (index < 1) {
        // first email should be disabled, because it's already invited
        expect(node.prop("disabled")).toBe(true)
      } else {
        expect(node.prop("disabled")).toBe(false)
      }
    })
  })

  it("displays the tooltip on hover of trashcan icon", () => {
    const component = getComponent({
      emailAddressesMetadata: {...emailAddressesMetadataMock, uniqueAddresses: mockedEmailAddresses},
      alreadyInvitedEmailAddresses: []
    })
    const tree = shallow(component)
    const {t} = useLucaTranslation()

    const gridItem = tree.find(InviteAttendeesEmailAddressesGridItem).first().dive()
    const trashcan = gridItem.find(Icon)
    trashcan.simulate("mouseover")
    expect(gridItem.find(Tooltip).first().prop("title")).toEqual(t("projects__survey_details_tooltip_remove_from_list"))
  })

  it("displays the tooltip on hover disabled grid item", () => {
    const component = getComponent({
      emailAddressesMetadata: {...emailAddressesMetadataMock, uniqueAddresses: []},
      alreadyInvitedEmailAddresses: mockedAlreadyInvitedEmailAddresses
    })
    const tree = shallow(component)
    const {t} = useLucaTranslation()

    const gridItem = tree.find(InviteAttendeesEmailAddressesGridItem).first().dive()
    gridItem.simulate("mouseover")
    expect(gridItem.find(Tooltip).first().prop("title")).toEqual(
      t("projects__survey_details_tooltip_invite_already_sent")
    )
  })
})
