import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {act} from "react-test-renderer"
import {sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {sampleCompaniesQuery, scenarioQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useSampleCompanySelection} from "../use-sample-company-selection"

const scenario = scenariosMock[0]

const getConnectedHook = () =>
  renderHook(() => useSampleCompanySelection(scenario.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: sampleCompaniesQuery
            },
            result: {
              data: {
                sampleCompanies: sampleCompaniesMock
              }
            }
          },
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenario.id}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useSampleCompanySelection", () => {
  it("scenarioOption should be empty", async () => {
    const {result} = getConnectedHook()
    expect(result.current.scenarioOption.isEmpty()).toBe(true)
    // Silence mock provider act warnings
    await act(() => wait(0))
  })

  it("loading should default to be true", async () => {
    const {result} = getConnectedHook()
    expect(result.current.loading).toBe(true)
    // Silence mock provider act warnings
    await act(() => wait(0))
  })

  it("sampleCompanies should default to be defined", async () => {
    const {result} = getConnectedHook()
    expect(result.current.sampleCompanies).toBeDefined()
    // Silence mock provider act warnings
    await act(() => wait(0))
  })
})
