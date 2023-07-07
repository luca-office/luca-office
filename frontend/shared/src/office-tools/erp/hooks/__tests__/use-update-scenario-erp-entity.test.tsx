import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {scenarioIdMock} from "../../../../../tests/__mocks__"
import {Children} from "../../../../styles"
import {updateScenarioErpEntityResponsesMock} from "../__mocks__/update-scenario-erp-entity-responses.mock"
import {useUpdateScenarioErpEntity} from "../use-update-scenario-erp-entity"

const getConnectedHook = () =>
  renderHook(() => useUpdateScenarioErpEntity(scenarioIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={updateScenarioErpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-update-scenario-erp-entity", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateScenarioErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateScenarioErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
