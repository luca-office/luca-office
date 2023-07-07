import {ErpType} from "../../../enums"
import {Relevance} from "../../../graphql/generated/globalTypes"
import {
  useCreateScenarioErpComponent,
  useCreateScenarioErpComponentErpProduct,
  useCreateScenarioErpCustomer,
  useCreateScenarioErpEmployee,
  useCreateScenarioErpInvoice,
  useCreateScenarioErpOrder,
  useCreateScenarioErpOrderItem,
  useCreateScenarioErpProduct,
  useCreateScenarioErpSupplier
} from "../../../graphql/hooks"
import {ScenarioErpEntitySelector} from "../../../models"

export interface UseCreateScenarioErpEntityHook {
  readonly loading: boolean
  readonly createScenarioErpEntity: (type: ErpType, selector: ScenarioErpEntitySelector, relevance: Relevance) => void
}

export const useCreateScenarioErpEntity = (scenarioId: UUID, sampleCompanyId: UUID): UseCreateScenarioErpEntityHook => {
  const {
    createScenarioErpComponentErpProduct,
    createScenarioErpComponentErpProductLoading
  } = useCreateScenarioErpComponentErpProduct()
  const {createScenarioErpComponent, createScenarioErpComponentLoading} = useCreateScenarioErpComponent()
  const {createScenarioErpCustomer, createScenarioErpCustomerLoading} = useCreateScenarioErpCustomer()
  const {createScenarioErpEmployee, createScenarioErpEmployeeLoading} = useCreateScenarioErpEmployee()
  const {createScenarioErpInvoice, createScenarioErpInvoiceLoading} = useCreateScenarioErpInvoice()
  const {createScenarioErpOrderItem, createScenarioErpOrderItemLoading} = useCreateScenarioErpOrderItem()
  const {createScenarioErpOrder, createScenarioErpOrderLoading} = useCreateScenarioErpOrder()
  const {createScenarioErpProduct, createScenarioErpProductLoading} = useCreateScenarioErpProduct()
  const {createScenarioErpSupplier, createScenarioErpSupplierLoading} = useCreateScenarioErpSupplier()

  const createErpComponentErpProduct = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpComponentErpProduct({
      scenarioId,
      componentProductId: selector.componentProductId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpComponent = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpComponent({
      scenarioId,
      componentId: selector.componentId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpCustomer = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpCustomer({
      scenarioId,
      customerId: selector.customerId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpEmployee = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpEmployee({
      scenarioId,
      employeeId: selector.employeeId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpInvoice = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpInvoice({
      scenarioId,
      invoiceId: selector.invoiceId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpOrderItem = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpOrderItem({
      scenarioId,
      orderItemId: selector.orderItemId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpOrder = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpOrder({
      scenarioId,
      orderId: selector.orderId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpProduct = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpProduct({
      scenarioId,
      productId: selector.productId,
      sampleCompanyId,
      relevance
    })
  }
  const createErpSupplier = (selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    createScenarioErpSupplier({
      scenarioId,
      supplierId: selector.supplierId,
      sampleCompanyId,
      relevance
    })
  }

  const createScenarioErpEntity = (type: ErpType, selector: ScenarioErpEntitySelector, relevance: Relevance) => {
    switch (type) {
      case ErpType.Component:
        createErpComponent(selector, relevance)
        break
      case ErpType.Customer:
        createErpCustomer(selector, relevance)
        break
      case ErpType.Employee:
        createErpEmployee(selector, relevance)
        break
      case ErpType.Invoice:
        createErpInvoice(selector, relevance)
        break
      case ErpType.Order:
        createErpOrder(selector, relevance)
        break
      case ErpType.OrderItem:
        createErpOrderItem(selector, relevance)
        break
      case ErpType.Product:
        createErpProduct(selector, relevance)
        break
      case ErpType.Supplier:
        createErpSupplier(selector, relevance)
        break
      case ErpType.ComponentProduct:
        createErpComponentErpProduct(selector, relevance)
    }
  }

  return {
    loading:
      createScenarioErpComponentErpProductLoading ||
      createScenarioErpComponentLoading ||
      createScenarioErpCustomerLoading ||
      createScenarioErpEmployeeLoading ||
      createScenarioErpInvoiceLoading ||
      createScenarioErpOrderItemLoading ||
      createScenarioErpOrderLoading ||
      createScenarioErpProductLoading ||
      createScenarioErpSupplierLoading,
    createScenarioErpEntity
  }
}
