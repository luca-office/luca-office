import {
  erpComponentErpProductsMock,
  erpComponentsMock,
  erpCustomersMock,
  erpEmployeesMock,
  erpInvoicesMock,
  erpOrderItemsMock,
  erpOrdersMock,
  erpProductsMock,
  erpSuppliersMock
} from "../../../../../tests/__mocks__"
import {ErpType} from "../../../../enums"
import {ErpEntity} from "../../../../models"
import {getScenarioErpEntitySelector} from "../scenario-erp-selector"

const erpComponentErpProduct = erpComponentErpProductsMock[0]
const erpComponent = erpComponentsMock[0]
const erpCustomer = erpCustomersMock[0]
const erpEmployee = erpEmployeesMock[0]
const erpInvoice = erpInvoicesMock[0]
const erpOrder = erpOrdersMock[0]
const erpOrderItem = erpOrderItemsMock[0]
const erpProduct = erpProductsMock[0]
const erpSupplier = erpSuppliersMock[0]

describe("scenario-erp-selector", () => {
  describe("getScenarioErpEntitySelector", () => {
    it("correctly returns selector for ScenarioErpComponentErpProduct", () => {
      expect(
        getScenarioErpEntitySelector(ErpType.ComponentProduct, (erpComponentErpProduct as unknown) as ErpEntity)
      ).toEqual({componentId: erpComponentErpProduct.componentId, productId: erpComponentErpProduct.productId})
    })
    it("correctly returns selector for ScenarioErpComponent", () => {
      expect(getScenarioErpEntitySelector(ErpType.Component, erpComponent)).toEqual({componentId: erpComponent.id})
    })
    it("correctly returns selector for ScenarioErpCustomer", () => {
      expect(getScenarioErpEntitySelector(ErpType.Customer, erpCustomer)).toEqual({customerId: erpCustomer.id})
    })
    it("correctly returns selector for ScenarioErpEmployee", () => {
      expect(getScenarioErpEntitySelector(ErpType.Employee, erpEmployee)).toEqual({employeeId: erpEmployee.id})
    })
    it("correctly returns selector for ScenarioErpInvoice", () => {
      expect(getScenarioErpEntitySelector(ErpType.Invoice, erpInvoice)).toEqual({invoiceId: erpInvoice.id})
    })
    it("correctly returns selector for ScenarioErpOrderItem", () => {
      expect(getScenarioErpEntitySelector(ErpType.OrderItem, erpOrderItem)).toEqual({orderItemId: erpOrderItem.id})
    })
    it("correctly returns selector for ScenarioErpOrder", () => {
      expect(getScenarioErpEntitySelector(ErpType.Order, erpOrder)).toEqual({orderId: erpOrder.id})
    })
    it("correctly returns selector for ScenarioErpProduct", () => {
      expect(getScenarioErpEntitySelector(ErpType.Product, erpProduct)).toEqual({productId: erpProduct.id})
    })
    it("correctly returns selector for ScenarioErpSupplier", () => {
      expect(getScenarioErpEntitySelector(ErpType.Supplier, erpSupplier)).toEqual({supplierId: erpSupplier.id})
    })
  })
})
