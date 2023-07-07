import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {sampleCompanyIdMock, scenarioIdMock} from "../../../../../tests/__mocks__"
import {Children} from "../../../../styles"
import {createScenarioErpEntityResponsesMock} from "../__mocks__/create-scenario-erp-entity-responses.mock"
import {useCreateScenarioErpEntity} from "../use-create-scenario-erp-entity"

const getConnectedHook = () =>
  renderHook(() => useCreateScenarioErpEntity(scenarioIdMock, sampleCompanyIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={createScenarioErpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-create-scenario-erp-entity", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("createScenarioErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createScenarioErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
