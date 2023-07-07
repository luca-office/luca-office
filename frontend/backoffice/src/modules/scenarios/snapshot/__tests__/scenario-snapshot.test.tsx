import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import * as React from "react"
import {Provider} from "react-redux"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Desktop} from "shared/components"
import {binaryViewerWindows, officeToolWindows} from "shared/components/desktop/config"
import {
  scenarioIdMock,
  scenariosMock,
  surveyEventsMock,
  surveyIdMock,
  surveyInvitationIdMock
} from "shared/graphql/__mocks__"
import {emailsQuery, scenarioQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {surveyEventsQuery} from "shared/graphql/queries/survey-event"
import {Option} from "shared/utils"
import * as date from "shared/utils/date"
import {fakeStore} from "sharedTests/redux/fake-store"
import {getDateValueMock} from "sharedTests/utils/date-mock"
import {initialAppState} from "../../../../redux/state/app-state"
import {emailsMock} from "../../../scenario-emails/emails/hooks/__mocks__/emails.mock"
import * as useSurveySnapshotHook from "../hooks/use-scenario-snapshot"
import {UseSurveySnapshotHook} from "../hooks/use-scenario-snapshot"
import {ScenarioSnapshot, SurveySnapshotProps} from "../scenario-snapshot"

const scenario = scenariosMock[0]
const availableWindows = [...officeToolWindows, ...binaryViewerWindows].map(window => window.tool)
const interventions = interventionsMock.map(mock => ({...mock, scenarioId: scenario.id}))

const defaultProps: SurveySnapshotProps = {
  scenarioId: scenario.id,
  surveyInvitationId: surveyInvitationIdMock,
  surveyId: surveyIdMock
}

const stateHookValuesDefault: UseSurveySnapshotHook = {
  dataLoading: false,
  availableWindows,
  scenario: Option.of(scenario),
  openWindows: [],
  minimizedWindows: [],
  openWindow: jest.fn(),
  closeWindow: jest.fn(),
  minimizeWindow: jest.fn(),
  interventions,
  unreadEmailsCount: 6
}

const stateSpy = jest.spyOn(useSurveySnapshotHook, "useScenarioSnapshot")

const defaultTimeValue = "00:00"
const timeSpy = jest.spyOn(date, "formatTime")

const surveyId = surveyIdMock
const surveyInvitationId = surveyInvitationIdMock
const scenarioId = scenarioIdMock

const getComponent = (props?: Partial<SurveySnapshotProps>) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: surveyEventsQuery,
          variables: {surveyId, surveyInvitationId, scenarioId}
        },
        result: {
          data: surveyEventsMock
        }
      },
      {
        request: {
          query: scenarioQuery,
          variables: {id: scenarioId}
        },
        result: {
          data: Option.of(scenariosMock[0])
        }
      },
      {
        request: {
          query: interventionsQuery,
          variables: {scenarioId}
        },
        result: {
          data: Option.of(interventionsMock)
        }
      },
      {
        request: {
          query: emailsQuery,
          variables: {scenarioId}
        },
        result: {
          data: Option.of(emailsMock)
        }
      }
    ]}
    addTypename={true}>
    <Provider
      store={fakeStore({
        ...initialAppState
      })}>
      <ScenarioSnapshot {...{...defaultProps, ...props}} />
    </Provider>
  </MockedProvider>
)

describe("scenario-snapshot", () => {
  const _Date = Date
  beforeEach(() => {
    const mockDate = getDateValueMock(1970, 1, 1)
    Date = mockDate
    window.HTMLElement.prototype.scroll = jest.fn()
  })
  afterEach(() => {
    Date = _Date
  })

  it("renders correctly", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    timeSpy.mockReturnValue(defaultTimeValue)
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    stateSpy.mockReturnValue(stateHookValuesDefault)
    timeSpy.mockReturnValue(defaultTimeValue)
    const component = getComponent()
    const tree = mount(component)

    expect(tree.find(Desktop)).toHaveLength(1)
  })
})
