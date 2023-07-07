import {ErpType} from "../../../../enums"
import {LucaTFunction} from "../../../../translations"
import {getErpComponentColumns} from "./erp-component"
import {getErpComponentErpProductColumns} from "./erp-component-erp-product"
import {getErpCustomerColumns} from "./erp-customer"
import {getErpEmployeeColumns} from "./erp-employee"
import {getErpInvoiceColumns} from "./erp-invoice"
import {getErpOrderColumns} from "./erp-order"
import {getErpOrderItemColumns} from "./erp-order-item"
import {getErpProductColumns} from "./erp-product"
import {getErpSupplierColumns} from "./erp-supplier"

export const getColumnsByType = (t: LucaTFunction, type: ErpType) => {
  switch (type) {
    case ErpType.Component:
      return getErpComponentColumns(t)

    case ErpType.Customer:
      return getErpCustomerColumns(t)

    case ErpType.Employee:
      return getErpEmployeeColumns(t)

    case ErpType.Invoice:
      return getErpInvoiceColumns(t)

    case ErpType.Order:
      return getErpOrderColumns(t)

    case ErpType.OrderItem:
      return getErpOrderItemColumns(t)

    case ErpType.Product:
      return getErpProductColumns(t)

    case ErpType.Supplier:
      return getErpSupplierColumns(t)

    case ErpType.ComponentProduct:
      return getErpComponentErpProductColumns(t)
    default:
      return []
  }
}
