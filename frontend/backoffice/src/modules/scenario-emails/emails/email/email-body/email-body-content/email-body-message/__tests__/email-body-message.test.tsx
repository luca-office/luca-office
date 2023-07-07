import {MockedProvider} from "@apollo/client/testing"
import {render} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {act, create} from "react-test-renderer"
import {Heading, Icon, ReadonlyActionField, TextInput} from "shared/components"
import {Option} from "shared/utils"
import wait from "waait"
import {InlineEditableTextareaContainer, OverlayEditField} from "../../../../../../../../components"
import {emailsMock} from "../../../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../../../hooks/use-email-update"
import {EmailBodyMessage, EmailBodyMessageProps} from "../email-body-message"

const email = emailsMock[0]

const defaultProps: EmailBodyMessageProps = {
  email,
  scenario: Option.none()
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")

describe("email-body-message", () => {
  it("renders correctly", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const component = create(
      <MockedProvider>
        <EmailBodyMessage {...defaultProps} />
      </MockedProvider>
    )
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
