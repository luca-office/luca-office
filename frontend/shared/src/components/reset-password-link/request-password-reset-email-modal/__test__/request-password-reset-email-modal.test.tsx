import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {mockedFormMethods} from "../../../../../tests/utils/form-methods-mock"
import {TextInput} from "../../../input"
import {Modal} from "../../../modal/modal"
import {Overlay} from "../../../overlay/overlay"
import {Text} from "../../../typography/typography"
import * as useRequestPasswordResetEmail from "../hooks/use-request-password-reset-email-modal"
import {UseRequestResetPasswordModalHook} from "../index"
import {RequestPasswordResetEmailModal} from "../request-password-reset-email-modal"

const hookValuesDefault: UseRequestResetPasswordModalHook = {
  requestPasswordResetEmail: jest.fn(),
  formMethods: mockedFormMethods,
  showSuccessModal: jest.fn()
}

const stateSpy = jest.spyOn(useRequestPasswordResetEmail, "useRequestPasswordResetEmail")

describe("request-password-reset-modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<RequestPasswordResetEmailModal onDismiss={jest.fn()} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault})

    const component = shallow(<RequestPasswordResetEmailModal onDismiss={jest.fn()} />)
    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(Modal)).toHaveLength(1)
    expect(component.find(Text)).toHaveLength(1)
    expect(component.find(TextInput)).toHaveLength(1)
  })

  it("does not submit with field errors", async () => {
    const handleSubmit = jest.fn()
    const requestPasswordResetEmail = jest.fn()
    stateSpy.mockReturnValue({
      ...hookValuesDefault,
      requestPasswordResetEmail,
      formMethods: {
        ...mockedFormMethods,
        errors: {title: undefined, description: {type: "error", message: "Error at Field"}},
        handleSubmit
      } as any
    })

    const component = mount(<RequestPasswordResetEmailModal onDismiss={jest.fn()} />)

    component.find(".confirm-button").last().simulate("click")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(requestPasswordResetEmail).toHaveBeenCalledTimes(0)
  })
})
