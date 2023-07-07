// importing from direct file because of issues of babel loader and spyOn
import * as React from "react"
import {create} from "react-test-renderer"
import * as useSignUpModalHook from "../hooks/use-sign-up-modal"
import {UseSignUpModalHook} from "../hooks/use-sign-up-modal"
import {SignUpModal} from "../sign-up-modal"

const hookValuesDefault: UseSignUpModalHook = {
  signUp: jest.fn(),
  signUpLoading: false
}

const stateSpy = jest.spyOn(useSignUpModalHook, "useSignUpModal")

describe("SignUp Modal", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    const component = create(<SignUpModal onDismiss={jest.fn()} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly loading", async () => {
    stateSpy.mockReturnValue({...hookValuesDefault, signUpLoading: true})
    const component = create(<SignUpModal onDismiss={jest.fn()} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
