import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import pick from "lodash-es/pick"
import * as React from "react"
import {scenariosMock} from "shared/graphql/__mocks__"
import {updateScenarioMutation} from "shared/graphql/mutations"
import {Children} from "shared/styles"
import wait from "waait"
import {useScenarioUpdate} from "../use-scenario-update"

const scenario = scenariosMock[0]
const scenarioId = scenario.id
const getConnectedHook = () =>
  renderHook(() => useScenarioUpdate(scenario), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateScenarioMutation,
              variables: {
                id: scenarioId,
                update: pick(scenariosMock[0], [
                  "date",
                  "name",
                  "description",
                  "maxDurationInSeconds",
                  "introductionEmailId",
                  "shouldDisplayTime",
                  "tags",
                  "completionEmailAddress"
                ])
              }
            },
            result: {
              data: {
                updateScenario: scenario
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-scenario-update", () => {
  describe("updateScenario", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateScenario).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateScenarioLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateScenarioLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
