import {ErpType} from "../../../../enums"
import {ErpEntity, ErpKeyEntity} from "../../../../models"

export const getForeignKeysForEntity = (data: ErpEntity): Array<ErpKeyEntity<typeof data.type>> => {
  switch (data.type) {
    case ErpType.Component: {
      return [{id: data.supplierId, key: "supplierId", type: ErpType.Supplier}] as Array<ErpKeyEntity<typeof data.type>>
    }
    case ErpType.ComponentProduct: {
      return [
        {id: data.productId, key: "productId", type: ErpType.Product},
        {id: data.componentId, key: "componentId", type: ErpType.Component}
      ] as Array<ErpKeyEntity<typeof data.type>>
    }
    case ErpType.Invoice: {
      return [{id: data.orderId, key: "orderId", type: ErpType.Order}] as Array<ErpKeyEntity<typeof data.type>>
    }
    case ErpType.Order: {
      return [
        {id: data.customerId, key: "customerId", type: ErpType.Customer},
        {id: data.employeeId, key: "employeeId", type: ErpType.Employee}
      ] as Array<ErpKeyEntity<typeof data.type>>
    }
    case ErpType.OrderItem: {
      return [
        {id: data.orderId, key: "orderId", type: ErpType.Order},
        {id: data.productId, key: "productId", type: ErpType.Product}
      ] as Array<ErpKeyEntity<typeof data.type>>
    }
    default:
      return []
  }
}
