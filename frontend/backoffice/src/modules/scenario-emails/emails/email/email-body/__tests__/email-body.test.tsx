import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {act as actRenderer, create} from "react-test-renderer"
import {sampleCompaniesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {sampleCompanyQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {Option} from "shared/utils"
import wait from "waait"
import {deleteEntityHookMock} from "../../../../../../graphql/__mocks__"
import {emailsMock} from "../../../hooks/__mocks__/emails.mock"
import * as useEmailUpdateHook from "../../hooks/use-email-update"
import {UseEmailUpdateHook} from "../../hooks/use-email-update"
import {EmailBody, EmailBodyProps} from "../email-body"
import {EmailBodyContent} from "../email-body-content/email-body-content"
import {UseEmailFilesHook} from "../email-body-content/email-body-files/hooks/use-email-files"
import * as useEmailFilesHook from "../email-body-content/email-body-files/hooks/use-email-files"
import {EmailBodyFooter} from "../email-body-footer/email-body-footer"

const email = emailsMock[0]
const sampleCompany = sampleCompaniesMock[0]

const defaultProps: EmailBodyProps = {
  email: Option.of(email),
  emailLoading: false,
  emailOpeningInterventions: [],
  scenario: Option.of(scenariosMock[0]),
  isIntroductionEmail: false,
  actionsDisabled: false,
  associatedIntervention: Option.none(),
  onCreateInterventionClick: jest.fn(),
  navigateToIntervention: jest.fn()
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

const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")
const emailFilesSpy = jest.spyOn(useEmailFilesHook, "useEmailFiles")

const getComponent = (props?: Partial<EmailBodyProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: sampleCompanyQuery,
          variables: {
            id: sampleCompany.id
          }
        },
        result: {
          data: {
            sampleCompany: sampleCompany
          }
        }
      },
      {
        request: {
          query: scenarioQuestionnairesQuery,
          variables: {scenarioId: scenariosMock[0].id}
        },
        result: {
          data: {
            scenarioQuestionnaires: scenarioQuestionnairesMock
          }
        }
      }
    ]}>
    <EmailBody {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("email-body", () => {
  it("renders correctly", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const component = create(getComponent())
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)
    const tree = shallow(getComponent()).find(EmailBody).dive()

    await act(() => wait(0))

    expect(tree.find(EmailBodyContent)).toHaveLength(1)
    expect(tree.find(EmailBodyFooter)).toHaveLength(1)
  })
})
