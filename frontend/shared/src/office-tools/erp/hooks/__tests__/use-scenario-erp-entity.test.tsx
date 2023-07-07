import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {scenarioIdMock} from "../../../../../tests/__mocks__"
import {Children} from "../../../../styles"
import {scenarioErpEntityResponsesMock} from "../__mocks__/scenario-erp-entity-responses.mock"
import {useScenarioErpEntity} from "../use-scenario-erp-entity"

const getConnectedHook = () =>
  renderHook(() => useScenarioErpEntity(scenarioIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={scenarioErpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-scenario-erp-entity", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("getScenarioErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.getScenarioErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
