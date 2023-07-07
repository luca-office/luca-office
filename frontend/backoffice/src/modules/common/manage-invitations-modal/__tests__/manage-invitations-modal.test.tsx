import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Modal} from "shared/components"
import {surveyInvitationsMock} from "shared/graphql/__mocks__"
import {SurveyInvitation} from "shared/models"
import {Option} from "shared/utils"
import {ManageInvitationModalProps, ManageInvitationsModal} from "../../../common"
import {emailAddressesMetadataMock} from "../__mocks__/email-addresses-metadata.mock"
import * as useInviteHook from "../hooks/use-manage-invitations-modal"
import {UseManageInvitationsModalHook} from "../hooks/use-manage-invitations-modal"
import {InviteAttendeesEmailAddressesGrid} from "../invite-attendees-email-addresses-grid/invite-attendees-email-addresses-grid"
import {InviteAttendeesEmailTextarea} from "../invite-attendees-email-textarea/invite-attendees-email-textarea"

const defaultProps: ManageInvitationModalProps = {
  invitationProcessLoading: false,
  handleInvitations: jest.fn(),
  existingInvitations: ["testmail@test.de", "cap@cap3.de"],
  onDismiss: jest.fn(),
  labelKey: "projects__survey_details_invite_title"
}
const hookValuesDefault: UseManageInvitationsModalHook = {
  alreadyInvitedAddresses: ["testmail@test.de", "cap@cap3.de"],
  createInvitations: jest.fn(),
  createInvitationsLoading: false,
  emailAddressesMetadata: emailAddressesMetadataMock,
  emailAddressesValue: "",
  onDeleteEmailAddress: jest.fn(),
  setEmailAddressesValue: jest.fn()
}

const stateSpy = jest.spyOn(useInviteHook, "useManageInvitationsModal")
const getComponent = (props?: ManageInvitationModalProps) => <ManageInvitationsModal {...props} {...defaultProps} />

describe("manage-invitations-modal", () => {
  it("renders correctly", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(getComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = shallow(getComponent())

    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(".wrapper")).toHaveLength(1)
    expect(component.find(InviteAttendeesEmailTextarea)).toHaveLength(1)
    expect(component.find(InviteAttendeesEmailAddressesGrid)).toHaveLength(1)
  })

  it("does not create Survey invitation with empty string", () => {
    const createSurveyInvitations = jest.fn()
    const createSurveyInvitationsMock = jest.fn(() =>
      Promise.resolve(Option.of<SurveyInvitation[]>(surveyInvitationsMock))
    )
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createInvitations: createSurveyInvitationsMock,
      emailAddressesValue: ""
    })
    const component = shallow(getComponent())
    component.find(Modal).dive().find(".confirm-button").last().simulate("click")
    expect(createSurveyInvitations).toHaveBeenCalledTimes(0)
  })

  it("does create Survey invitation with valid email string", () => {
    const createSurveyInvitationsMock = jest.fn(() =>
      Promise.resolve(Option.of<SurveyInvitation[]>(surveyInvitationsMock))
    )
    const createSurveyInvitations = createSurveyInvitationsMock
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      createInvitations: createSurveyInvitationsMock,
      emailAddressesValue: "test@test.de"
    })
    const component = shallow(getComponent())
    component.find(Modal).dive().find(".confirm-button").last().simulate("click")
    expect(createSurveyInvitations).toHaveBeenCalledTimes(1)
  })
})
