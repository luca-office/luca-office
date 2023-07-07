import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {sampleCompanyQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useErpContainer} from "../use-erp-container"

const sampleCompanyId = sampleCompaniesMock[0].id

const getConnectedHook = () =>
  renderHook(() => useErpContainer({sampleCompanyId}), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: sampleCompanyQuery,
              variables: {id: sampleCompanyId}
            },
            result: {
              data: sampleCompaniesMock[0]
            }
          }
        ]}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("UseErpContainer", () => {
  describe("sampleCompany", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sampleCompany).toBeDefined()
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
  describe("isPreviewVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isPreviewVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isReadonly", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isReadonly).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenario", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenario).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
