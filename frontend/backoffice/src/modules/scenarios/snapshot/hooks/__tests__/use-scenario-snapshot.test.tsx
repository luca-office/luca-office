import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {Provider} from "react-redux"
import {interventionsMock, referenceBookChaptersMock} from "shared/__mocks__"
import {OfficeTool} from "shared/enums"
import {
  filesMock,
  scenariosMock,
  surveyEventFragmentsMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyLightMock
} from "shared/graphql/__mocks__"
import {
  emailsQuery,
  filesForScenarioQuery,
  referenceBookChaptersForScenarioQuery,
  scenarioQuery,
  surveyLightQuery
} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {surveyEventsQuery} from "shared/graphql/queries/survey-event"
import {Children} from "shared/styles"
import {uuidRegexPattern} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {InitDependentOfficeTool} from "../../../../../redux/state/player-preview-state"
import {emailsMock} from "../../../../scenario-emails/emails/hooks/__mocks__/emails.mock"
import {useScenarioSnapshot} from "../use-scenario-snapshot"

const scenarioIdRegEx = new RegExp(`"scenarioId":"${uuidRegexPattern}"`.replace(/\/\^|\$\/i/g, ""))

const scenario = scenariosMock[0]
const surveyEventFragments = surveyEventFragmentsMock.map(mock => ({
  ...mock,
  surveyId: surveyIdMock,
  data:
    mock.data && scenarioIdRegEx.test(mock.data)
      ? mock.data.replace(scenarioIdRegEx, `"scenarioId":"${scenario.id}"`)
      : mock.data
}))
const interventions = interventionsMock.map(mock => ({...mock, scenarioId: scenario.id}))
const emails = emailsMock.map(mock => ({...mock, scenarioId: scenario.id}))

const allToolsInitializedMock: Record<InitDependentOfficeTool, boolean> = {
  [OfficeTool.EmailClient]: true,
  [OfficeTool.FileBrowser]: true,
  [OfficeTool.ReferenceBookViewer]: true,
  taskbar: true
}

const getConnectedHook = () =>
  renderHook(() => useScenarioSnapshot(scenario.id, surveyInvitationIdMock, surveyIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: surveyEventsQuery,
              variables: {surveyInvitationId: surveyInvitationIdMock, scenarioId: scenario.id}
            },
            result: {
              data: {
                surveyEvents: surveyEventFragments
              }
            }
          },
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenario.id}
            },
            result: {
              data: {scenario}
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {interventions}
            }
          },
          {
            request: {
              query: emailsQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {emails}
            }
          },
          {
            request: {
              query: referenceBookChaptersForScenarioQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                referenceBookChaptersForScenario: referenceBookChaptersMock
              }
            }
          },
          {
            request: {
              query: filesForScenarioQuery,
              variables: {scenarioId: scenario.id}
            },
            result: {
              data: {
                filesForScenario: filesMock
              }
            }
          },
          {
            request: {
              query: surveyLightQuery,
              variables: {id: surveyIdMock}
            },
            result: {
              data: {
                survey: surveyLightMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider
          store={fakeStore({
            ...initialAppState,
            playerPreview: {...initialAppState.playerPreview, initializedTools: allToolsInitializedMock}
          })}>
          {children}
        </Provider>
      </MockedProvider>
    )
  })

describe("use-scenario-snapshot", () => {
  describe("scenario", () => {
    it("should be default to be empty", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenario.orNull()).toBeNull()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should contain data after fetch", async () => {
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.scenario.orNull()).toEqual(scenario)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("openWindows", () => {
    it("should be default to be empty", async () => {
      const {result} = getConnectedHook()
      expect(result.current.openWindows).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("minimizedWindows", () => {
    it("should be default to be empty", async () => {
      const {result} = getConnectedHook()
      expect(result.current.minimizedWindows).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("openWindow", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.openWindow).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("closeWindow", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.closeWindow).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("minimizeWindow", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.minimizeWindow).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("interventions", () => {
    it("should be default to be empty", async () => {
      const {result} = getConnectedHook()
      expect(result.current.interventions).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should contain data after fetch", async () => {
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.interventions).toEqual(interventions)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("unreadEmailsCount", () => {
    it("should be default to be 0", async () => {
      const {result} = getConnectedHook()
      expect(result.current.unreadEmailsCount).toEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
