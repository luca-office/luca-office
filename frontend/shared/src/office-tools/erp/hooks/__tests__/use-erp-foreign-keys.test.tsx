import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl,
  sampleCompanyIdMock
} from "../../../../../tests/__mocks__"
import {ErpType} from "../../../../enums"
import {Children} from "../../../../styles"
import {erpForeignKeysQueryResponsesMock} from "../__mocks__/erp-foreign-keys-query-responses.mock"
import {useErpForeignKeys} from "../use-erp-foreign-keys"

const erpOrderKeys = erpOrdersMockGraphQl.map(mock => `${mock.id}`)
const erpProductKeys = erpProductsMockGraphQl.map(mock => `${mock.id}`)
const erpSupplierKeys = erpSuppliersMockGraphQl.map(mock => `${mock.id}`)
const erpCustomerKeys = erpCustomersMockGraphQl.map(mock => `${mock.id}`)
const erpEmployeeKeys = erpEmployeesMockGraphQl.map(mock => `${mock.id}`)

const getConnectedHook = (type: ErpType) =>
  renderHook(() => useErpForeignKeys(sampleCompanyIdMock, type), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={erpForeignKeysQueryResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-erp-foreign-keys", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook(ErpType.Component)
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("foreignKeys", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook(ErpType.Component)
      expect(result.current.foreignKeys).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("returns foreign keys for ErpInvoice", async () => {
      const {result, waitForValueToChange} = getConnectedHook(ErpType.Invoice)
      await waitForValueToChange(() => result.current.foreignKeys)
      await act(() => wait(0))
      expect(result.current.foreignKeys).toEqual({[ErpType.Order]: erpOrderKeys})
    })
    it("returns foreign keys for ErpOrderItem", async () => {
      const {result, waitForValueToChange} = getConnectedHook(ErpType.OrderItem)
      await waitForValueToChange(() => result.current.foreignKeys)
      await act(() => wait(0))
      expect(result.current.foreignKeys).toEqual({[ErpType.Order]: erpOrderKeys, [ErpType.Product]: erpProductKeys})
    })
    it("returns foreign keys for ErpComponent", async () => {
      const {result, waitForValueToChange} = getConnectedHook(ErpType.Component)
      await waitForValueToChange(() => result.current.foreignKeys)
      await act(() => wait(0))
      expect(result.current.foreignKeys).toEqual({[ErpType.Supplier]: erpSupplierKeys})
    })
    it("returns foreign keys for ErpOrder", async () => {
      const {result, waitForValueToChange} = getConnectedHook(ErpType.Order)
      await waitForValueToChange(() => result.current.foreignKeys)
      await act(() => wait(0))
      expect(result.current.foreignKeys).toEqual({
        [ErpType.Customer]: erpCustomerKeys,
        [ErpType.Employee]: erpEmployeeKeys
      })
    })
    it("returns empty foreign keys", async () => {
      const {result, waitForValueToChange} = getConnectedHook(ErpType.Employee)
      await waitForValueToChange(() => result.current.foreignKeys)
      await act(() => wait(0))
      expect(result.current.foreignKeys).toEqual({})
    })
  })
})
