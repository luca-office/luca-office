import {ErpType} from "../../../enums"
import {ErpComponentErpProduct, ErpEntity, ScenarioErpEntitySelector} from "../../../models"

export const getScenarioErpEntitySelector = <T extends ErpEntity>(
  type: ErpType,
  data: T
): ScenarioErpEntitySelector => {
  switch (type) {
    case ErpType.Component:
      return {componentId: data.id}
    case ErpType.Customer:
      return {customerId: data.id}
    case ErpType.Employee:
      return {employeeId: data.id}
    case ErpType.Invoice:
      return {invoiceId: data.id}
    case ErpType.Order:
      return {orderId: data.id}
    case ErpType.OrderItem:
      return {orderItemId: data.id}
    case ErpType.Product:
      return {productId: data.id}
    case ErpType.Supplier:
      return {supplierId: data.id}
    case ErpType.ComponentProduct: {
      const entity = (data as unknown) as ErpComponentErpProduct
      return {componentId: entity.componentId, productId: entity.productId}
    }
    default:
      return {}
  }
}
