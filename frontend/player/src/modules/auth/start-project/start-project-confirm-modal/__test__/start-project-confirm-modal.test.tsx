import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Heading, Text} from "shared/components"
import {surveyInvitationMock} from "../../../../../graphql/__mocks__"
import {StartProjectConfirmModal} from "../start-project-confirm-modal"

describe("Start-Project-Confirm-Modal", () => {
  it("renders correctly", () => {
    const component = create(
      <StartProjectConfirmModal onDismiss={jest.fn()} onConfirm={jest.fn()} surveyInvitation={surveyInvitationMock} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(
      <StartProjectConfirmModal onDismiss={jest.fn()} onConfirm={jest.fn()} surveyInvitation={surveyInvitationMock} />
    )
    expect(component.find(Text)).toHaveLength(3)
    expect(component.find(Heading)).toHaveLength(1)
  })
})
