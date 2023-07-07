import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {mount} from "enzyme"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../../tests/redux/fake-store"
import {Button, Icon, OrlyButtonContainer} from "../../../../components"
import {participantDataMock} from "../../../../graphql/__mocks__"
import {initialSharedAppState} from "../../../../redux/state"
import {Option} from "../../../../utils"
// eslint-disable-next-line
import {emails} from "../../__tests__/__mocks__/emails"
import {EmailDetails, EmailDetailsProps} from "../email-details"
import {EmailFiles} from "../email-files/email-files"

const requiredProps: EmailDetailsProps = {
  email: {
    ...emails[0],
    recipient: "recipient@test.com"
  },
  introductionEmailId: Option.none(),
  createEmail: jest.fn(),
  deleteEmail: jest.fn(),
  sendEmail: jest.fn(),
  moveEmailToDirectory: jest.fn(),
  scenarioStartedAt: Option.of(new Date(2020, 12, 10)),
  scenarioFictiveDate: Option.none(),
  autoCompleteEmailAddresses: [],
  updateEmailText: jest.fn(),
  updateEmailMetadata: jest.fn(),
  updateEmail: jest.fn(),
  participantDataAndToken: {
    participantData: Option.of(participantDataMock[0]),
    token: Option.none()
  },
  sampleCompany: Option.none(),
  emailFiles: {
    addEmailFileToDownloads: jest.fn(),
    addEmailFileToUploads: jest.fn(),
    removeEmailFileFromUploads: jest.fn(),
    availableEmailDownloadIds: [],
    availableEmailUploadFiles: [],
    downloadableEmailsFiles: []
  }
}

describe("email-details", () => {
  it("render correctly with required props", () => {
    const emailDetails = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <EmailDetails {...requiredProps} />
      </Provider>
    )
    const tree = create(emailDetails).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should have the correct structure", () => {
    const emailDetails = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <EmailDetails {...requiredProps} />
      </Provider>
    )
    const tree = mount(emailDetails)

    expect(tree.find(Button)).toHaveLength(2)
    expect(tree.find(Icon)).toHaveLength(3)
    expect(tree.find(OrlyButtonContainer)).toHaveLength(1)
    expect(tree.find(EmailFiles)).toHaveLength(1)
  })

  it("should trigger the right handlers on click", async () => {
    const createEmailSpy = jest.fn()
    const emailDetails = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <EmailDetails {...{...requiredProps, ...{createEmail: createEmailSpy}}} />
      </Provider>
    )

    render(emailDetails)

    fireEvent.click(screen.getByText("email__reply"))

    await waitFor(() => {
      expect(createEmailSpy).toHaveBeenCalledTimes(1)
    })
  })
})
