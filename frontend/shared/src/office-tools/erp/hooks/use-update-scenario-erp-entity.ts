import {ErpType} from "../../../enums"
import {Relevance} from "../../../graphql/generated/globalTypes"
import {
  useUpdateScenarioErpComponent,
  useUpdateScenarioErpComponentErpProduct,
  useUpdateScenarioErpCustomer,
  useUpdateScenarioErpEmployee,
  useUpdateScenarioErpInvoice,
  useUpdateScenarioErpOrder,
  useUpdateScenarioErpOrderItem,
  useUpdateScenarioErpProduct,
  useUpdateScenarioErpSupplier
} from "../../../graphql/hooks"
import {ScenarioErpEntitySelector} from "../../../models"

export interface UseUpdateScenarioErpEntityHook {
  readonly loading: boolean
  readonly updateScenarioErpEntity: (type: ErpType, selector: ScenarioErpEntitySelector, relevance: Relevance) => void
}

export const useUpdateScenarioErpEntity = (scenarioId: UUID): UseUpdateScenarioErpEntityHook => {
  const {
    updateScenarioErpComponentErpProduct,
    updateScenarioErpComponentErpProductLoading
  } = useUpdateScenarioErpComponentErpProduct(scenarioId)
  const {updateScenarioErpComponent, updateScenarioErpComponentLoading} = useUpdateScenarioErpComponent(scenarioId)
  const {updateScenarioErpCustomer, updateScenarioErpCustomerLoading} = useUpdateScenarioErpCustomer(scenarioId)
  const {updateScenarioErpEmployee, updateScenarioErpEmployeeLoading} = useUpdateScenarioErpEmployee(scenarioId)
  const {updateScenarioErpInvoice, updateScenarioErpInvoiceLoading} = useUpdateScenarioErpInvoice(scenarioId)
  const {updateScenarioErpOrderItem, updateScenarioErpOrderItemLoading} = useUpdateScenarioErpOrderItem(scenarioId)
  const {updateScenarioErpOrder, updateScenarioErpOrderLoading} = useUpdateScenarioErpOrder(scenarioId)
  const {updateScenarioErpProduct, updateScenarioErpProductLoading} = useUpdateScenarioErpProduct(scenarioId)
  const {updateScenarioErpSupplier, updateScenarioErpSupplierLoading} = useUpdateScenarioErpSupplier(scenarioId)

  const updateErpComponentErpProduct = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpComponentErpProduct(selector.componentProductId, {relevance})
  }
  const updateErpComponent = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpComponent(selector.componentId, {relevance})
  }
  const updateErpCustomer = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpCustomer(selector.customerId, {relevance})
  }
  const updateErpEmployee = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpEmployee(selector.employeeId, {relevance})
  }
  const updateErpInvoice = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpInvoice(selector.invoiceId, {relevance})
  }
  const updateErpOrderItem = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpOrderItem(selector.orderItemId, {relevance})
  }
  const updateErpOrder = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpOrder(selector.orderId, {relevance})
  }
  const updateErpProduct = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpProduct(selector.productId, {relevance})
  }
  const updateErpSupplier = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    updateScenarioErpSupplier(selector.supplierId, {relevance})
  }

  const updateScenarioErpEntity = (type: ErpType, selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    switch (type) {
      case ErpType.Component:
        updateErpComponent(selector, relevance)
        break
      case ErpType.Customer:
        updateErpCustomer(selector, relevance)
        break
      case ErpType.Employee:
        updateErpEmployee(selector, relevance)
        break
      case ErpType.Invoice:
        updateErpInvoice(selector, relevance)
        break
      case ErpType.Order:
        updateErpOrder(selector, relevance)
        break
      case ErpType.OrderItem:
        updateErpOrderItem(selector, relevance)
        break
      case ErpType.Product:
        updateErpProduct(selector, relevance)
        break
      case ErpType.Supplier:
        updateErpSupplier(selector, relevance)
        break
      case ErpType.ComponentProduct:
        updateErpComponentErpProduct(selector, relevance)
    }
  }

  return {
    loading:
      updateScenarioErpComponentErpProductLoading ||
      updateScenarioErpComponentLoading ||
      updateScenarioErpCustomerLoading ||
      updateScenarioErpEmployeeLoading ||
      updateScenarioErpInvoiceLoading ||
      updateScenarioErpOrderItemLoading ||
      updateScenarioErpOrderLoading ||
      updateScenarioErpProductLoading ||
      updateScenarioErpSupplierLoading,
    updateScenarioErpEntity
  }
}
