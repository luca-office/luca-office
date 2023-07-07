import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Button, ResetPasswordLink, Text, TextInput} from "shared/components"
import {UserInformationLogin} from "../user-information-login"

describe("User Information Login", () => {
  it("renders correctly", async () => {
    const component = create(
      <UserInformationLogin login={jest.fn()} onSignUpClicked={jest.fn()} loginLoading={false} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly loading", async () => {
    const component = create(<UserInformationLogin login={jest.fn()} onSignUpClicked={jest.fn()} loginLoading={true} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    const component = shallow(
      <UserInformationLogin login={jest.fn()} onSignUpClicked={jest.fn()} loginLoading={false} />
    )
    expect(component.find(Text)).toHaveLength(2)
    expect(component.find(TextInput)).toHaveLength(2)
    expect(component.find(Button)).toHaveLength(1)
    expect(component.find(ResetPasswordLink)).toHaveLength(1)
  })
})
