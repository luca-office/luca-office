import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {scenarioIdMock} from "../../../../../tests/__mocks__"
import {Children} from "../../../../styles"
import {deleteScenarioErpEntityResponsesMock} from "../__mocks__/delete-scenario-erp-entity-responses.mock"
import {useDeleteScenarioErpEntity} from "../use-delete-scenario-erp-entity"

const getConnectedHook = () =>
  renderHook(() => useDeleteScenarioErpEntity(scenarioIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={deleteScenarioErpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-delete-scenario-erp-entity", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("deleteScenarioErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.deleteScenarioErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
