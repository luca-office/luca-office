import {ErpType} from "../../../../enums"
import {ErpEntity} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {getErpComponentClipboardString} from "./erp-component-clipboard"
import {getErpComponentErpProductClipboardString} from "./erp-component-erp-product-clipboard"
import {getErpCustomerClipboardString} from "./erp-customer-clipboard"
import {getErpEmployeeClipboardString} from "./erp-employee-clipboard"
import {getErpInvoiceClipboardString} from "./erp-invoice-clipboard"
import {getErpOrderClipboardString} from "./erp-order-clipboard"
import {getErpOrderItemClipboardString} from "./erp-order-item"
import {getErpProductClipboardString} from "./erp-product-clipboard"
import {getErpSupplierClipboardString} from "./erp-supplier-clipboard"

export const getErpClipboardString = (t: LucaTFunction, data: ErpEntity) => {
  switch (data.type) {
    case ErpType.Component:
      return getErpComponentClipboardString(t, data)
    case ErpType.Customer:
      return getErpCustomerClipboardString(t, data)
    case ErpType.Employee:
      return getErpEmployeeClipboardString(t, data)
    case ErpType.Invoice:
      return getErpInvoiceClipboardString(t, data)
    case ErpType.Order:
      return getErpOrderClipboardString(t, data)
    case ErpType.OrderItem:
      return getErpOrderItemClipboardString(t, data)
    case ErpType.Product:
      return getErpProductClipboardString(t, data)
    case ErpType.Supplier:
      return getErpSupplierClipboardString(t, data)
    case ErpType.ComponentProduct:
      return getErpComponentErpProductClipboardString(t, data)
    default:
      return ""
  }
}
