import {mount, shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {FormErrorText, Paper} from "shared/components"
import {Option} from "shared/utils"
import {LoginProps, VerifyToken} from "../verify-token"
import {mockedFormMethods} from "sharedTests/utils/form-methods-mock"

const defaultProps: LoginProps = {
  surveyInvitationHasBeenCalled: false,
  verifyEntryToken: jest.fn(),
  surveyInvitationLoading: false,
  errorCode: Option.none(),
  formData: mockedFormMethods
}

const getComponent = (props?: Partial<React.PropsWithChildren<LoginProps>>) => (
  <VerifyToken {...{...defaultProps, ...props}} />
)

describe("verify-token", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("shows error text if surveyInvitation has been called and data is null and survey is not loading", () => {
    const component = getComponent({surveyInvitationHasBeenCalled: true})
    const tree = mount(component)

    const formErrorText = tree.find(FormErrorText)
    expect(formErrorText).toHaveLength(1)
  })

  it("shows error text if surveyInvitation has been called and survey has already been completed and survey is not loading", () => {
    const component = getComponent({
      surveyInvitationHasBeenCalled: true,
      errorCode: Option.of("TokenAlreadyUsed")
    })
    const tree = mount(component)

    const formErrorText = tree.find(FormErrorText)
    expect(formErrorText).toHaveLength(1)
    expect(formErrorText.text()).toContain("auth__enter_code_error_survey_already_completed")
  })

  it("shows error text if surveyInvitation has been called and survey has ended and survey is not loading", () => {
    const component = getComponent({
      surveyInvitationHasBeenCalled: true,
      errorCode: Option.of("SurveyAlreadyEnded")
    })
    const tree = mount(component)

    const formErrorText = tree.find(FormErrorText)
    expect(formErrorText).toHaveLength(1)
    expect(formErrorText.text()).toContain("auth__enter_code_error_survey_ended")
  })

  it("shows no error text if surveyInvitation has been called and data is null and survey is loading", () => {
    const component = getComponent({
      surveyInvitationHasBeenCalled: true,
      surveyInvitationLoading: true
    })
    const tree = shallow(component)

    const formErrorText = tree.find(Paper).dive().find(FormErrorText)
    expect(formErrorText).toHaveLength(0)
  })

  it("shows no error text if not surveyInvitation has not been called and data is null and data is not loading", () => {
    const component = getComponent()
    const tree = shallow(component)

    const formErrorText = tree.find(Paper).dive().find(FormErrorText)
    expect(formErrorText).toHaveLength(0)
  })
})
