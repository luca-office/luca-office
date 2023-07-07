import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal, Overlay} from "shared/components"
import {surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {ManageInvitationsModal} from "../../../../common"
import {InviteAttendeesEmailAddressesGrid} from "../../../../common/manage-invitations-modal/invite-attendees-email-addresses-grid/invite-attendees-email-addresses-grid"
import {InviteAttendeesEmailTextarea} from "../../../../common/manage-invitations-modal/invite-attendees-email-textarea/invite-attendees-email-textarea"
import * as useRaterInvitationOverlayHook from "../hooks/use-rater-invitation-overlay"
import {UseRaterInvitationOverlayHook} from "../hooks/use-rater-invitation-overlay"
import {RaterInvitationOverlay, RaterInvitationOverlayProps} from "../rater-invitation-overlay"

const survey = surveysMock[0]
const emails = userAccountsMock.map(({email}) => email)

const defaultProps: RaterInvitationOverlayProps = {
  surveyId: survey.id,
  existingRaterEmails: emails,
  onDismiss: jest.fn()
}

const stateHookValuesDefault: UseRaterInvitationOverlayHook = {
  dataLoading: false,
  actionLoading: false,
  inviteRaters: jest.fn(() => Promise.resolve()),
  setEmails: jest.fn(),
  showRaterWarning: false
}

const stateSpy = jest.spyOn(useRaterInvitationOverlayHook, "useRaterInvitationOverlay")

const getComponent = (props?: Partial<RaterInvitationOverlayProps>) => (
  <RaterInvitationOverlay {...{...defaultProps, ...props}} />
)

describe("rater-invitation-overlay", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = create(getComponent())

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = shallow(getComponent())

    const overlay = component.find(Overlay)
    expect(overlay).toHaveLength(1)

    const invitationsModal = component.find(Overlay).dive().find(ManageInvitationsModal)
    expect(invitationsModal).toHaveLength(1)

    const modal = invitationsModal.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const modalContent = modal.dive()
    expect(modalContent.find(InviteAttendeesEmailTextarea)).toHaveLength(1)
    expect(modalContent.find(InviteAttendeesEmailAddressesGrid)).toHaveLength(1)
  })
  it("triggers dismiss correctly", async () => {
    const onDismissMock = jest.fn()
    stateSpy.mockReturnValue(stateHookValuesDefault)
    const component = shallow(getComponent({onDismiss: onDismissMock}))

    const invitationsModal = component.find(Overlay).dive().find(ManageInvitationsModal)
    expect(invitationsModal).toHaveLength(1)

    const modal = invitationsModal.dive().find(Modal)
    expect(modal).toHaveLength(1)

    const onDismissHandler = modal.prop("onDismiss")
    expect(onDismissHandler).toBeDefined()

    onDismissHandler!()
    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })
})
