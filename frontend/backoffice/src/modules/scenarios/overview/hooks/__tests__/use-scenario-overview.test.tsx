import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock, scenariosMock} from "shared/graphql/__mocks__"
import {checkLoginQuery, scenariosQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useScenarioOverview} from "../use-scenario-overview"

const getConnectedHook = () =>
  renderHook(() => useScenarioOverview(), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: scenariosQuery
            },
            result: {
              data: {
                scenarios: scenariosMock
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
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useScenarioOverview", () => {
  describe("scenarios", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()

      expect(result.current.scenarios).toBeDefined()
      expect(result.current.scenarios.length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
