import {MockedProvider} from "@apollo/client/testing"
import {shallow} from "enzyme"
import * as React from "react"
import {act as actRenderer, create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {sampleCompaniesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import * as useDeleteEmailHook from "shared/graphql/hooks/mutations/email/delete-email"
import {sampleCompanyQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {DeleteEntityHook} from "shared/models"
import {Option} from "shared/utils"
import wait from "waait"
import {SubHeaderDetailContainer} from "../../../components"
import {deleteEntityHookMock} from "../../../graphql/__mocks__"
import {Emails} from "../emails"
import * as useEmailFilesHook from "../emails/email/email-body/email-body-content/email-body-files/hooks/use-email-files"
import {UseEmailFilesHook} from "../emails/email/email-body/email-body-content/email-body-files/hooks/use-email-files"
import * as useEmailHook from "../emails/email/hooks/use-email"
import {UseEmailHook} from "../emails/email/hooks/use-email"
import * as useEmailUpdateHook from "../emails/email/hooks/use-email-update"
import {UseEmailUpdateHook} from "../emails/email/hooks/use-email-update"
import {emailsMock} from "../emails/hooks/__mocks__/emails.mock"
import * as useEmailsHook from "../emails/hooks/use-emails"
import {UseEmailsHook} from "../emails/hooks/use-emails"
import {ScenarioEmails, ScenarioEmailsProps} from "../scenario-emails"

const scenario = scenariosMock[0]
const email = emailsMock[0]
const sampleCompany = sampleCompaniesMock[0]

const defaultProps: ScenarioEmailsProps = {
  scenarioId: scenario.id,
  emailId: email.id,
  directory: EmailDirectory.Inbox
}

const emailsHookValuesDefault: UseEmailsHook = {
  scenario: Option.of(scenario),
  scenarioLoading: false,
  emails: emailsMock,
  emailsLoading: false,
  selectedEmailId: Option.of(email.id),
  selectEmail: jest.fn(),
  selectedDirectory: EmailDirectory.Inbox,
  selectDirectory: jest.fn(),
  introductionEmail: Option.none(),
  interventions: interventionsMock,
  actionsDisabled: false
}

const emailHookValuesDefault: UseEmailHook = {
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
  deleteFileHook: () => deleteEntityHookMock,
  createTextDocumentFile: jest.fn()
}

const getComponent = (props?: Partial<ScenarioEmailsProps>) => (
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
    <ScenarioEmails {...{...defaultProps, ...props}} />
  </MockedProvider>
)

const emailsStateSpy = jest.spyOn(useEmailsHook, "useEmails")
const emailStateSpy = jest.spyOn(useEmailHook, "useEmail")
const emailUpdateStateSpy = jest.spyOn(useEmailUpdateHook, "useEmailUpdate")
const deleteEmailStateSpy = jest.spyOn(useDeleteEmailHook, "useDeleteEmail")
const emailFilesSpy = jest.spyOn(useEmailFilesHook, "useEmailFiles")

describe("scenario-emails", () => {
  it("renders correctly", async () => {
    emailsStateSpy.mockReturnValue(emailsHookValuesDefault)
    emailStateSpy.mockReturnValue(emailHookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)

    const component = create(getComponent())
    await actRenderer(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    emailsStateSpy.mockReturnValue(emailsHookValuesDefault)
    emailStateSpy.mockReturnValue(emailHookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)

    const tree = shallow(getComponent()).find(ScenarioEmails).dive()

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(Emails)).toHaveLength(1)
    expect(tree.find(".placeholder")).toHaveLength(0)
  })
  it("has correct structure (no scenario id)", async () => {
    emailsStateSpy.mockReturnValue(emailsHookValuesDefault)
    emailStateSpy.mockReturnValue(emailHookValuesDefault)
    emailUpdateStateSpy.mockReturnValue(emailUpdateHookValuesDefault)
    deleteEmailStateSpy.mockReturnValue(deleteEntityHookValuesDefault)
    emailFilesSpy.mockReturnValue(emailBodyFilesHookValuesDefault)

    const tree = shallow(getComponent({scenarioId: undefined}))
      .find(ScenarioEmails)
      .dive()

    expect(tree.find(SubHeaderDetailContainer)).toHaveLength(1)
    expect(tree.find(Emails)).toHaveLength(0)

    const placeholder = tree.find(".placeholder")
    expect(placeholder).toHaveLength(1)
    expect(placeholder.childAt(0).text()).toEqual("email__placeholder")
  })
})
