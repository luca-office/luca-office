import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {act as actTestRenderer, create} from "react-test-renderer"
import {LoadingIndicator} from "shared/components"
import {Option} from "shared/utils"
import wait from "waait"
import {deleteEntityHookMock} from "../../../../../../../graphql/__mocks__"
import {emailsMock} from "../../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../../hooks/use-email-update"
import {EmailBodyContent, EmailBodyContentProps} from "../email-body-content"
import {EmailBodyFiles} from "../email-body-files/email-body-files"
import {UseEmailFilesHook} from "../email-body-files/hooks/use-email-files"
import * as useEmailFilesHook from "../email-body-files/hooks/use-email-files"
import {EmailBodyMessage} from "../email-body-message/email-body-message"
import {EmailBodySender} from "../email-body-sender/email-body-sender"
import {EmailBodySettings} from "../email-body-settings/email-body-settings"
import {MockedProvider} from "@apollo/client/testing"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

const email = emailsMock[0]

const defaultProps: EmailBodyContentProps = {
  email: Option.of(email),
  emailLoading: false,
  isIntroductionEmail: false,
  associatedIntervention: Option.none(),
  scenario: Option.none(),
  emailOpeningInterventions: []
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const emailBodyFilesHookValuesDefault: UseEmailFilesHook = {
  uploadVisible: false,
  files: [],
  hideUpload: jest.fn(),
  showUpload: jest.fn(),
  filesLoading: false,
  uploadBinaries: jest.fn(),
  createTextDocumentFile: jest.fn(),
  deleteFileHook: () => deleteEntityHookMock
}

const emailFilesSpy = jest.spyOn(useEmailFilesHook, "useEmailFiles")
const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")

describe("email-body-content", () => {
  it("renders correctly", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const component = create(
      <MockedProvider>
        <EmailBodyContent {...defaultProps} />
      </MockedProvider>
    )

    await actTestRenderer(() => wait(0))

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const tree = shallow(<EmailBodyContent {...defaultProps} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettings)).toHaveLength(1)
    expect(tree.find(EmailBodySender)).toHaveLength(1)
    expect(tree.find(EmailBodyMessage)).toHaveLength(1)
    expect(tree.find(EmailBodyFiles)).toHaveLength(1)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
  })

  it("shows loading indicator", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const tree = shallow(<EmailBodyContent {...{...defaultProps, emailLoading: true}} />)

    await act(() => wait(0))

    expect(tree.find(EmailBodySettings)).toHaveLength(0)
    expect(tree.find(EmailBodySender)).toHaveLength(0)
    expect(tree.find(EmailBodyMessage)).toHaveLength(0)
    expect(tree.find(EmailBodyFiles)).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(1)
  })

  it("shows placeholder", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const tree = shallow(<EmailBodyContent {...{...defaultProps, email: Option.none()}} />)

    await act(() => wait(0))

    render(<EmailBodyContent {...{...defaultProps, email: Option.none()}} />)

    expect(tree.find(EmailBodySettings)).toHaveLength(0)
    expect(tree.find(EmailBodySender)).toHaveLength(0)
    expect(tree.find(EmailBodyMessage)).toHaveLength(0)
    expect(tree.find(EmailBodyFiles)).toHaveLength(0)
    expect(tree.find(LoadingIndicator)).toHaveLength(0)
    expect(screen.queryByText("email__placeholder_not_found")).toBeInTheDocument()
    // expect(tree.find("div").at(1).text()).toEqual("email__placeholder_not_found")
  })
})
