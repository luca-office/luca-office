import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {checkLoginMock, codingModelsMock} from "shared/graphql/__mocks__"
import {checkLoginQuery, codingModelsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useCodingModelOverviewHook} from "../use-coding-models-overview"

const scenarioId = "sdfjsdfäsdfölskdf"

const getConnectedHook = () =>
  renderHook(() => useCodingModelOverviewHook(scenarioId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingModelsQuery
            },
            result: {
              data: {
                codingModels: codingModelsMock
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

describe("useCodingModelsOverview", () => {
  describe("scenariosWithCodingModel", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()

      expect(result.current.scenariosWithCodingModel).toBeDefined()
      expect(result.current.scenariosWithCodingModel.length).toBeGreaterThanOrEqual(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
