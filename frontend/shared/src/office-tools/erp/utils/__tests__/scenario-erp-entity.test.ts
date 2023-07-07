import {
  scenarioErpComponentErpProductsMock,
  scenarioErpComponentsMock,
  scenarioErpCustomersMock,
  scenarioErpEmployeesMock,
  scenarioErpInvoicesMock,
  scenarioErpOrderItemsMock,
  scenarioErpOrdersMock,
  scenarioErpProductsMock,
  scenarioErpSuppliersMock
} from "../../../../../tests/__mocks__"
import {toScenarioErpEntity} from "../scenario-erp-entity"

const scenarioErpComponentErpProduct = scenarioErpComponentErpProductsMock[0]
const scenarioErpComponent = scenarioErpComponentsMock[0]
const scenarioErpCustomer = scenarioErpCustomersMock[0]
const scenarioErpEmployee = scenarioErpEmployeesMock[0]
const scenarioErpInvoice = scenarioErpInvoicesMock[0]
const scenarioErpOrderItem = scenarioErpOrderItemsMock[0]
const scenarioErpOrder = scenarioErpOrdersMock[0]
const scenarioErpProduct = scenarioErpProductsMock[0]
const scenarioErpSupplier = scenarioErpSuppliersMock[0]

describe("scenario-erp-entity", () => {
  describe("toScenarioErpEntity", () => {
    it("correctly converts data for ScenarioErpComponentErpProduct", () => {
      expect(toScenarioErpEntity(scenarioErpComponentErpProduct, ["componentProductId"])).toEqual({
        scenarioId: scenarioErpComponentErpProduct.scenarioId,
        sampleCompanyId: scenarioErpComponentErpProduct.sampleCompanyId,
        relevance: scenarioErpComponentErpProduct.relevance,
        selector: {componentProductId: scenarioErpComponentErpProduct.componentProductId}
      })
    })
    it("correctly converts data for ScenarioErpComponent", () => {
      expect(toScenarioErpEntity(scenarioErpComponent, ["componentId"])).toEqual({
        scenarioId: scenarioErpComponent.scenarioId,
        sampleCompanyId: scenarioErpComponent.sampleCompanyId,
        relevance: scenarioErpComponent.relevance,
        selector: {componentId: scenarioErpComponent.componentId}
      })
    })
    it("correctly converts data for ScenarioErpCustomer", () => {
      expect(toScenarioErpEntity(scenarioErpCustomer, ["customerId"])).toEqual({
        scenarioId: scenarioErpCustomer.scenarioId,
        sampleCompanyId: scenarioErpCustomer.sampleCompanyId,
        relevance: scenarioErpCustomer.relevance,
        selector: {customerId: scenarioErpCustomer.customerId}
      })
    })
    it("correctly converts data for ScenarioErpEmployee", () => {
      expect(toScenarioErpEntity(scenarioErpEmployee, ["employeeId"])).toEqual({
        scenarioId: scenarioErpEmployee.scenarioId,
        sampleCompanyId: scenarioErpEmployee.sampleCompanyId,
        relevance: scenarioErpEmployee.relevance,
        selector: {employeeId: scenarioErpEmployee.employeeId}
      })
    })
    it("correctly converts data for ScenarioErpInvoice", () => {
      expect(toScenarioErpEntity(scenarioErpInvoice, ["invoiceId"])).toEqual({
        scenarioId: scenarioErpInvoice.scenarioId,
        sampleCompanyId: scenarioErpInvoice.sampleCompanyId,
        relevance: scenarioErpInvoice.relevance,
        selector: {invoiceId: scenarioErpInvoice.invoiceId}
      })
    })
    it("correctly converts data for ScenarioErpOrderItem", () => {
      expect(toScenarioErpEntity(scenarioErpOrderItem, ["orderItemId"])).toEqual({
        scenarioId: scenarioErpOrderItem.scenarioId,
        sampleCompanyId: scenarioErpOrderItem.sampleCompanyId,
        relevance: scenarioErpOrderItem.relevance,
        selector: {orderItemId: scenarioErpOrderItem.orderItemId}
      })
    })
    it("correctly converts data for ScenarioErpOrder", () => {
      expect(toScenarioErpEntity(scenarioErpOrder, ["orderId"])).toEqual({
        scenarioId: scenarioErpOrder.scenarioId,
        sampleCompanyId: scenarioErpOrder.sampleCompanyId,
        relevance: scenarioErpOrder.relevance,
        selector: {orderId: scenarioErpOrder.orderId}
      })
    })
    it("correctly converts data for ScenarioErpProduct", () => {
      expect(toScenarioErpEntity(scenarioErpProduct, ["productId"])).toEqual({
        scenarioId: scenarioErpProduct.scenarioId,
        sampleCompanyId: scenarioErpProduct.sampleCompanyId,
        relevance: scenarioErpProduct.relevance,
        selector: {productId: scenarioErpProduct.productId}
      })
    })
    it("correctly converts data for ScenarioErpSupplier", () => {
      expect(toScenarioErpEntity(scenarioErpSupplier, ["supplierId"])).toEqual({
        scenarioId: scenarioErpSupplier.scenarioId,
        sampleCompanyId: scenarioErpSupplier.sampleCompanyId,
        relevance: scenarioErpSupplier.relevance,
        selector: {supplierId: scenarioErpSupplier.supplierId}
      })
    })
  })
})
