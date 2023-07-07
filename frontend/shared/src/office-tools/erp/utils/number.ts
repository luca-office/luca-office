import {ErpType} from "../../../enums"
import {ErpComponent, ErpEntityByType, ErpProduct} from "../../../models"

const isFloatByErpComponent = (key: keyof ErpComponent): boolean => key === "margin"
const isFloatByErpProduct = (key: keyof ErpProduct): boolean => key === "taxRate"

export const isFloat = <T extends ErpType>(type: T, key: keyof ErpEntityByType<T>): boolean => {
  switch (type) {
    case ErpType.Component:
      return isFloatByErpComponent(key as keyof ErpComponent)
    case ErpType.Product:
      return isFloatByErpProduct(key as keyof ErpProduct)
    case ErpType.Customer:
    case ErpType.Employee:
    case ErpType.Invoice:
    case ErpType.Order:
    case ErpType.OrderItem:
    case ErpType.Supplier:
    case ErpType.ComponentProduct:
    default:
      return false
  }
}
