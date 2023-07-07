import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {act} from "react-dom/test-utils"
import {act as actRenderer, create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {sampleCompaniesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import * as useDeleteEmailHook from "shared/graphql/hooks/mutations/email/delete-email"
import {sampleCompanyQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {DeleteEntityHook} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {EmailContent, EmailHeader} from "../../../../../components"
import {deleteEntityHookMock} from "../../../../../graphql/__mocks__"
import {emailsMock} from "../../hooks/__mocks__/emails.mock"
import {Email, EmailProps} from "../email"
import {EmailBody} from "../email-body/email-body"
import * as useEmailFilesHook from "../email-body/email-body-content/email-body-files/hooks/use-email-files"
import {UseEmailFilesHook} from "../email-body/email-body-content/email-body-files/hooks/use-email-files"
import * as useEmailHook from "../hooks/use-email"
import {UseEmailHook} from "../hooks/use-email"
import * as useEmailUpdateHook from "../hooks/use-email-update"
import {UseEmailUpdateHook} from "../hooks/use-email-update"

const email = emailsMock[0]
const sampleCompany = sampleCompaniesMock[0]

const defaultProps: EmailProps = {
  selectedEmailId: Option.of(email.id),
  scenario: Option.of(scenariosMock[0]),
  actionsDisabled: false,
  interventions: interventionsMock
}

const hookValuesDefault: UseEmailHook = {
  email: Option.of(email),
  emailLoading: false,
  isIntroductionEmail: false,
  navigateToEmails: jest.fn(),
  navigateToIntervention: jest.fn(),
  isCreateInterventionModalVisible: false,
  toggleIsCreateInterventionModalVisible: jest.fn()
}

const emailUpdateHookValuesDefault: UseEmailUpdateHook = {
  updateEmail: jest.fn(() => Promise.resolve(Option.of(email))),
  updateEmailLoading: false
}

const deleteEntityHookValuesDefault: DeleteEntityHook = {
  deleteEntity: jest.fn(() => Promise.resolve()),
  deleteEntityLoading: false
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
const stateSpy = jest.spyOn(useEmailHook, "useEmail")
const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")
const deleteEmailStateSpy = jest.spyOn(useDeleteEmailHook, "useDeleteEmail")

const getComponent = (props?: Partial<EmailProps>) => (
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
    <Email {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("email", () => {
  it("renders correctly", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)

    const component = create(getComponent())
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    stateSpy.mockReturnValue(hookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)

    const tree = shallow(getComponent()).find(Email).dive()

    await act(() => wait(0))

    const emailContent = tree.find(EmailContent)
    expect(emailContent).toHaveLength(1)
    expect(emailContent.dive().find(EmailHeader)).toHaveLength(1)
    expect(emailContent.dive().find(EmailBody)).toHaveLength(1)
  })
})
