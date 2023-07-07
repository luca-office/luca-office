import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import {omit} from "lodash-es"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Option} from "shared/utils"
import wait from "waait"
import {EmailBodyMetaEntry, EmailBodySettingSelection} from "../../../../../../../../components/email"
import {selectOptionsMock} from "../../../../../../../../components/email/email-body-setting-selection/__mocks__/select-options.mock"
import {emailsMock} from "../../../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../../../hooks/use-email-update"
import {EmailBodySettings, EmailBodySettingsProps} from "../email-body-settings"
import * as useEmailBodySettingsHook from "../hooks/use-email-body-settings"
import {UseEmailBodySettingsHook} from "../hooks/use-email-body-settings"

const email = emailsMock[0]

const defaultProps: EmailBodySettingsProps = {
  email,
  isIntroductionEmail: false,
  associatedIntervention: Option.none(),
  emailOpeningInterventions: []
}

const options = selectOptionsMock.map(option => omit(option, "selected"))

const hookValuesDefault: UseEmailBodySettingsHook = {
  directoryOptions: options,
  markerOptions: options,
  isDelayOverlayVisible: false,
  showDelayOverlay: jest.fn(),
  hideDelayOverlay: jest.fn(),
  moveEmail: jest.fn()
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const stateSpy = jest.spyOn(useEmailBodySettingsHook, "useEmailBodySettings")
const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")

describe("email-body-settings", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const component = create(<EmailBodySettings {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySettings {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettingSelection)).toHaveLength(2)
    expect(tree.find(EmailBodyMetaEntry)).toHaveLength(1)
  })
  it("has correct structure (directory=sent)", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySettings {...{...defaultProps, email: emailsMock[6]}} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettingSelection)).toHaveLength(1)
    expect(tree.find(EmailBodyMetaEntry)).toHaveLength(1)
  })
  it("has correct structure intervention mail", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(
      <EmailBodySettings {...{...defaultProps, associatedIntervention: Option.of(interventionsMock[0])}} />
    )

    await act(() => wait(0))

    expect(tree.find(EmailBodyMetaEntry)).toHaveLength(1)
    expect(tree.find(EmailBodyMetaEntry).prop("label")).toContain("email__intervention_email_label")
    expect(tree.find(EmailBodySettingSelection).at(0).prop("disabled")).toBe(true)
    expect(tree.find(EmailBodySettingSelection).at(1).prop("disabled")).toBe(true)
  })
  it("enables marker selection", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySettings {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettingSelection).at(1).prop("disabled")).toBeTruthy()
  })
  it("disables selection", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySettings {...defaultProps} isIntroductionEmail={true} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettingSelection).at(0).prop("disabled")).toBeTruthy()
    expect(tree.find(EmailBodySettingSelection).at(1).prop("disabled")).toBeTruthy()
  })
})
