import {ErpType} from "../../../enums"
import {
  useDeleteScenarioErpComponent,
  useDeleteScenarioErpComponentErpProduct,
  useDeleteScenarioErpCustomer,
  useDeleteScenarioErpEmployee,
  useDeleteScenarioErpInvoice,
  useDeleteScenarioErpOrder,
  useDeleteScenarioErpOrderItem,
  useDeleteScenarioErpProduct,
  useDeleteScenarioErpSupplier
} from "../../../graphql/hooks"
import {ScenarioErpEntitySelector} from "../../../models"

export interface UseDeleteScenarioErpEntityHooker {
  readonly loading: boolean
  readonly deleteScenarioErpEntity: (type: ErpType, selector: ScenarioErpEntitySelector) => void
}

export const useDeleteScenarioErpEntity = (scenarioId: UUID): UseDeleteScenarioErpEntityHooker => {
  const {
    deleteScenarioErpComponentErpProduct,
    deleteScenarioErpComponentErpProductLoading
  } = useDeleteScenarioErpComponentErpProduct(scenarioId)
  const {deleteScenarioErpComponent, deleteScenarioErpComponentLoading} = useDeleteScenarioErpComponent(scenarioId)
  const {deleteScenarioErpCustomer, deleteScenarioErpCustomerLoading} = useDeleteScenarioErpCustomer(scenarioId)
  const {deleteScenarioErpEmployee, deleteScenarioErpEmployeeLoading} = useDeleteScenarioErpEmployee(scenarioId)
  const {deleteScenarioErpInvoice, deleteScenarioErpInvoiceLoading} = useDeleteScenarioErpInvoice(scenarioId)
  const {deleteScenarioErpOrderItem, deleteScenarioErpOrderItemLoading} = useDeleteScenarioErpOrderItem(scenarioId)
  const {deleteScenarioErpOrder, deleteScenarioErpOrderLoading} = useDeleteScenarioErpOrder(scenarioId)
  const {deleteScenarioErpProduct, deleteScenarioErpProductLoading} = useDeleteScenarioErpProduct(scenarioId)
  const {deleteScenarioErpSupplier, deleteScenarioErpSupplierLoading} = useDeleteScenarioErpSupplier(scenarioId)

  const deleteErpComponentErpProduct = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpComponentErpProduct(selector.componentProductId)
  }
  const deleteErpComponent = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpComponent(selector.componentId)
  }
  const deleteErpCustomer = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpCustomer(selector.customerId)
  }
  const deleteErpEmployee = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpEmployee(selector.employeeId)
  }
  const deleteErpInvoice = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpInvoice(selector.invoiceId)
  }
  const deleteErpOrderItem = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpOrderItem(selector.orderItemId)
  }
  const deleteErpOrder = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpOrder(selector.orderId)
  }
  const deleteErpProduct = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpProduct(selector.productId)
  }
  const deleteErpSupplier = (selector: ScenarioErpEntitySelector) => {
    deleteScenarioErpSupplier(selector.supplierId)
  }

  const deleteScenarioErpEntity = (type: ErpType, selector: ScenarioErpEntitySelector) => {
    switch (type) {
      case ErpType.Component:
        deleteErpComponent(selector)
        break
      case ErpType.Customer:
        deleteErpCustomer(selector)
        break
      case ErpType.Employee:
        deleteErpEmployee(selector)
        break
      case ErpType.Invoice:
        deleteErpInvoice(selector)
        break
      case ErpType.Order:
        deleteErpOrder(selector)
        break
      case ErpType.OrderItem:
        deleteErpOrderItem(selector)
        break
      case ErpType.Product:
        deleteErpProduct(selector)
        break
      case ErpType.Supplier:
        deleteErpSupplier(selector)
        break
      case ErpType.ComponentProduct:
        deleteErpComponentErpProduct(selector)
    }
  }

  return {
    loading:
      deleteScenarioErpComponentErpProductLoading ||
      deleteScenarioErpComponentLoading ||
      deleteScenarioErpCustomerLoading ||
      deleteScenarioErpEmployeeLoading ||
      deleteScenarioErpInvoiceLoading ||
      deleteScenarioErpOrderItemLoading ||
      deleteScenarioErpOrderLoading ||
      deleteScenarioErpProductLoading ||
      deleteScenarioErpSupplierLoading,
    deleteScenarioErpEntity
  }
}
