import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {sampleCompanyIdMock} from "../../../../../tests/__mocks__"
import {Children} from "../../../../styles"
import {erpEntityResponsesMock} from "../__mocks__/erp-entity-responses.mock"
import {useFetchErpEntities} from "../use-fetch-erp-entities"

const getConnectedHook = () =>
  renderHook(() => useFetchErpEntities(sampleCompanyIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={erpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-fetch-erp-entities", () => {
  describe("fetchErpEntities", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.fetchErpEntities).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("refetchAllErpEntities", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.refetchAllErpEntities).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
