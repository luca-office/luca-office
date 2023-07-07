import {shallow} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {fakeStore} from "../../../../tests/redux/fake-store"
import {OfficeWindow, WindowActionBar} from "../../../components"
import {participantDataMock} from "../../../graphql/__mocks__"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {initialSharedAppState} from "../../../redux/state"
import {Option} from "../../../utils"
import {EmailClient, EmailClientProps} from "../email-client"
import {EmailDetails} from "../email-details/email-details"
import {EmailListContainer} from "../email-list/email-list-container"
import {emails} from "./__mocks__/emails"

const requiredProps: EmailClientProps = {
  emailsLoading: false,
  selectedEmail: emails[0],
  selectedEmailId: emails[0].id,
  introductionEmailId: Option.none(),
  visibleEmails: emails,
  onClose: jest.fn(),
  onChangeSearchValue: jest.fn(),
  onSelectEmail: jest.fn(),
  onChangeEmailDirectory: jest.fn(),
  activeEmailDirectory: EmailDirectory.Inbox,
  createEmail: jest.fn(),
  deleteEmail: jest.fn(),
  sendEmail: jest.fn(),
  moveEmailToDirectory: jest.fn(),
  onMinimize: jest.fn(),
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

describe("email-client", () => {
  it("renders correctly with required props", () => {
    const emailClient = (
      <Provider store={fakeStore(initialSharedAppState)}>
        <EmailClient {...requiredProps} />
      </Provider>
    )

    const tree = create(emailClient).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should have the correct structure", () => {
    const emailClient = <EmailClient {...requiredProps} />
    const tree = shallow(emailClient)

    expect(tree.find(OfficeWindow)).toHaveLength(1)
    expect(tree.find(WindowActionBar)).toHaveLength(1)
    expect(tree.find(EmailListContainer)).toHaveLength(1)
    expect(tree.find(EmailDetails)).toHaveLength(1)
  })
})
