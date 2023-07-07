import {act} from "@testing-library/react"
import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Option} from "shared/utils"
import wait from "waait"
import {EmailBodyMetaEntry} from "../../../../../../../../components/email"
import {emailsMock} from "../../../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../../../hooks/use-email-update"
import {EmailBodySender, EmailBodySenderProps} from "../email-body-sender"

const email = emailsMock[0]

const defaultProps: EmailBodySenderProps = {
  email
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")

describe("email-body-sender", () => {
  it("renders correctly", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const component = create(<EmailBodySender {...defaultProps} />)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySender {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodyMetaEntry)).toHaveLength(2)
  })
  it("has correct structure (disabled)", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    const tree = shallow(<EmailBodySender {...defaultProps} disabled={true} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodyMetaEntry)).toHaveLength(2)
    tree.find(EmailBodyMetaEntry).forEach(entry => expect(entry.prop("disabled")).toBeTruthy())
  })
})
