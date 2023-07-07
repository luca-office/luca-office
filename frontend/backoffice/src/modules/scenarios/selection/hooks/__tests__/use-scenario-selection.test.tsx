import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock, projectModulesMock, projectScenariosMock, projectsMock} from "shared/graphql/__mocks__"
import {checkLoginQuery, projectModulesQuery, projectQuery, scenariosQuery, surveysQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useScenarioSelection} from "../use-scenario-selection"

const projectId = projectModulesMock[0].projectId
const getConnectedHook = () =>
  renderHook(() => useScenarioSelection(projectId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: scenariosQuery
            },
            result: {
              data: {
                scenarios: projectScenariosMock.filter(scenario => !!scenario.finalizedAt)
              }
            }
          },
          {
            request: {
              query: projectModulesQuery,
              variables: {projectId}
            },
            result: {
              data: {
                projectModules: projectModulesMock
              }
            }
          },
          {
            request: {
              query: projectQuery,
              variables: {id: projectId}
            },
            result: {
              data: {
                project: projectsMock[0]
              }
            }
          },
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: surveysQuery,
              variables: {projectId}
            },
            result: {
              data: {
                surveys: []
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-scenario-selection", () => {
  describe("scenarios", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()

      expect(result.current.scenarios).toBeDefined()
      expect(result.current.scenarios.length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("userMayFinalizeWithoutPublishing", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()

      expect(result.current.userMayFinalizeWithoutPublishing).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isProjectFinalized", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()

      expect(result.current.isProjectFinalized).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
