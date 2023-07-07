import {ErpType} from "../../enums"
import {ErpComponent} from "./erp-component"
import {ErpComponentErpProduct} from "./erp-component-erp-product"
import {ErpCustomer} from "./erp-customer"
import {ErpEmployee} from "./erp-employee"
import {ErpInvoice} from "./erp-invoice"
import {ErpOrder} from "./erp-order"
import {ErpOrderItem} from "./erp-order-item"
import {ErpProduct} from "./erp-product"
import {ErpSupplier} from "./erp-supplier"

export type ErpEntity =
  | ErpComponentErpProduct
  | ErpComponent
  | ErpCustomer
  | ErpEmployee
  | ErpInvoice
  | ErpOrderItem
  | ErpOrder
  | ErpProduct
  | ErpSupplier

export type ErpEntityByType<T extends ErpType> = T extends ErpType.Component
  ? ErpComponent
  : T extends ErpType.ComponentProduct
  ? ErpComponentErpProduct
  : T extends ErpType.Customer
  ? ErpCustomer
  : T extends ErpType.Employee
  ? ErpEmployee
  : T extends ErpType.Invoice
  ? ErpInvoice
  : T extends ErpType.Order
  ? ErpOrder
  : T extends ErpType.OrderItem
  ? ErpOrderItem
  : T extends ErpType.Product
  ? ErpProduct
  : T extends ErpType.Supplier
  ? ErpSupplier
  : never
