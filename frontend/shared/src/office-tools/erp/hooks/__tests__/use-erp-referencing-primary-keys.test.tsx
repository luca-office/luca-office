import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {
  erpComponentErpProductsMockGraphQl,
  erpComponentsMockGraphQl,
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrderItemsMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl,
  sampleCompanyIdMock
} from "../../../../../tests/__mocks__"
import {ErpType} from "../../../../enums"
import {Children} from "../../../../styles"
import {erpReferencingPrimaryKeysQueryResponsesMock} from "../__mocks__/erp-referencing-primary-keys-query-responses.mock"
import {useErpReferencingPrimaryKeys} from "../use-erp-referencing-primary-keys"

const erpOrderKeys = erpOrdersMockGraphQl.map(mock => mock.id)
const erpInvoiceKeys = erpInvoicesMockGraphQl.map(mock => mock.id)
const erpOrderItemKeys = erpOrderItemsMockGraphQl.map(mock => mock.id)
const erpComponentsKeys = erpComponentsMockGraphQl.map(mock => mock.id)

const erpOrder = erpOrdersMockGraphQl[0]
const erpCustomer = erpCustomersMockGraphQl[0]
const erpEmployee = erpEmployeesMockGraphQl[0]
const erpProduct = erpProductsMockGraphQl[0]
const erpSupplier = erpSuppliersMockGraphQl[0]
const erpInvoice = erpInvoicesMockGraphQl[0]

const getConnectedHook = (id: number, type: ErpType) =>
  renderHook(() => useErpReferencingPrimaryKeys(sampleCompanyIdMock, type, id), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={erpReferencingPrimaryKeysQueryResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-erp-referencing-primary-keys", () => {
  describe("loading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook(erpOrder.id, ErpType.Order)
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("primaryKeys", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook(erpOrder.id, ErpType.Order)
      expect(result.current.primaryKeys).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("returns referencing primary keys for ErpCustomer", async () => {
      const {result, waitForValueToChange} = getConnectedHook(erpCustomer.id, ErpType.Customer)
      await waitForValueToChange(() => result.current.primaryKeys)
      await act(() => wait(0))
      expect(result.current.primaryKeys).toEqual({[ErpType.Order]: {id: [erpOrderKeys[0]]}})
    })
    it("returns referencing primary keys for ErpOrder", async () => {
      const {result, waitForValueToChange} = getConnectedHook(erpOrder.id, ErpType.Order)
      await waitForValueToChange(() => result.current.primaryKeys)
      await act(() => wait(0))
      expect(result.current.primaryKeys).toEqual({
        [ErpType.Invoice]: {id: [erpInvoiceKeys[0]]},
        [ErpType.OrderItem]: {id: [erpOrderItemKeys[0]]}
      })
    })
    it("returns referencing primary keys for ErpProduct", async () => {
      const componentProductResult = erpComponentErpProductsMockGraphQl.slice(0, 2)
      const {result, waitForValueToChange} = getConnectedHook(erpProduct.id, ErpType.Product)
      await waitForValueToChange(() => result.current.primaryKeys)
      await act(() => wait(0))
      expect(result.current.primaryKeys).toEqual({
        [ErpType.OrderItem]: {id: [erpOrderItemKeys[0]]},
        [ErpType.ComponentProduct]: {
          componentId: componentProductResult.map(({componentId}) => componentId),
          productId: componentProductResult.map(({productId}) => productId)
        }
      })
    })
    it("returns referencing primary keys for ErpSupplier", async () => {
      const {result, waitForValueToChange} = getConnectedHook(erpSupplier.id, ErpType.Supplier)
      await waitForValueToChange(() => result.current.primaryKeys)
      await act(() => wait(0))
      expect(result.current.primaryKeys).toEqual({[ErpType.Component]: {id: [erpComponentsKeys[0]]}})
    })
    it("returns empty referencing primary keys", async () => {
      const {result} = getConnectedHook(erpInvoice.id, ErpType.Invoice)
      expect(result.current.primaryKeys).toEqual({})
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
