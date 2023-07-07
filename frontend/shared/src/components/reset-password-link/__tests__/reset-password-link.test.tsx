import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "../../../../tests/utils/form-methods-mock"
import {Text} from "../../typography/typography"
import * as useResetPasswordLinkHook from "../hooks/use-reset-password-link"
import {UseResetPasswordLinkHook} from "../hooks/use-reset-password-link"
import {RequestPasswordResetEmailModal, UseRequestResetPasswordModalHook} from "../request-password-reset-email-modal"
import * as useRequestResetPasswordModalHook from "../request-password-reset-email-modal/hooks/use-request-password-reset-email-modal"
import {ResetPasswordLink} from "../reset-password-link"

const requestPasswordResetEmailHookValuesDefault: UseRequestResetPasswordModalHook = {
  formMethods: mockedFormMethods,
  requestPasswordResetEmail: jest.fn(() => Promise.resolve({})),
  showSuccessModal: jest.fn()
}
const requestPasswordResetEmailSpy = jest.spyOn(useRequestResetPasswordModalHook, "useRequestPasswordResetEmail")

const stateHookValuesDefault: UseResetPasswordLinkHook = {
  isResetOverlayVisible: false,
  showResetOverlay: jest.fn(),
  hideResetOverlay: jest.fn()
}
const stateSpy = jest.spyOn(useResetPasswordLinkHook, "useResetPasswordLink")

const useComponent = () => <ResetPasswordLink />

describe("reset-password-link", () => {
  it("renders correctly (modal not visible)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    requestPasswordResetEmailSpy.mockReturnValue(requestPasswordResetEmailHookValuesDefault)
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly (modal visible)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isResetOverlayVisible: true})
    const component = create(useComponent())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure (modal not visible)", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    requestPasswordResetEmailSpy.mockReturnValue(requestPasswordResetEmailHookValuesDefault)
    const component = shallow(useComponent())

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(RequestPasswordResetEmailModal)).toHaveLength(0)
  })
  it("has correct structure (modal visible)", () => {
    stateSpy.mockReturnValue({...stateHookValuesDefault, isResetOverlayVisible: true})
    const component = shallow(useComponent())

    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(RequestPasswordResetEmailModal)).toHaveLength(1)
  })
})
