import {ErpType} from "../../../../enums"
import {
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpEntityByType,
  ErpInvoice,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../../models"
import {LucaI18nLangKey, LucaTFunction} from "../../../../translations"
import {isForeignKey} from "../common"
import {getErpComponentForProductLabel} from "./erp-component-erp-product-label"
import {getErpComponentLabel} from "./erp-component-label"
import {getErpCustomerLabel} from "./erp-customer-label"
import {getErpEmployeeLabel} from "./erp-employee-label"
import {getErpInvoiceLabel} from "./erp-invoice-label"
import {getErpOrderItemLabel} from "./erp-order-item-label"
import {getErpOrderLabel} from "./erp-order-label"
import {getErpProductLabel} from "./erp-product-label"
import {getErpSupplierLabel} from "./erp-supplier-label"

interface GetErpLabelParams<T extends ErpType> {
  readonly t: LucaTFunction
  readonly type: T
  readonly key: keyof ErpEntityByType<T>
  readonly foreignKeys: (keyof ErpEntityByType<T>)[]
  readonly showKeyHints?: boolean
  readonly showType?: boolean
}

export const getErpLabel = <T extends ErpType>({
  t,
  type,
  key,
  foreignKeys,
  showKeyHints = true,
  showType = true
}: GetErpLabelParams<T>): string => {
  const keyFlag = showKeyHints
    ? key === "id"
      ? t("erp_dataset__primary_key")
      : isForeignKey(foreignKeys, key)
      ? t("erp_dataset__foreign_key")
      : undefined
    : undefined

  switch (type) {
    case ErpType.Component:
      return getErpComponentLabel(t, key as keyof ErpComponent, showType, keyFlag)
    case ErpType.Customer:
      return getErpCustomerLabel(t, key as keyof ErpCustomer, showType, keyFlag)
    case ErpType.Employee:
      return getErpEmployeeLabel(t, key as keyof ErpEmployee, showType, keyFlag)
    case ErpType.Invoice:
      return getErpInvoiceLabel(t, key as keyof ErpInvoice, showType, keyFlag)
    case ErpType.Order:
      return getErpOrderLabel(t, key as keyof ErpOrder, showType, keyFlag)
    case ErpType.OrderItem:
      return getErpOrderItemLabel(t, key as keyof ErpOrderItem, showType, keyFlag)
    case ErpType.Product:
      return getErpProductLabel(t, key as keyof ErpProduct, showType, keyFlag)
    case ErpType.Supplier:
      return getErpSupplierLabel(t, key as keyof ErpSupplier, showType, keyFlag)
    case ErpType.ComponentProduct:
      return getErpComponentForProductLabel(t, key as keyof ErpComponentErpProduct, showType, keyFlag)
    default:
      return `${String(key)}`
  }
}

// eslint-disable-next-line consistent-return
export const erpTypeLabel = (erpType: ErpType): LucaI18nLangKey => {
  switch (erpType) {
    case ErpType.Component:
      return "erp__navigation_label_components"
    case ErpType.ComponentProduct:
      return "erp__navigation_label_components_for_products"
    case ErpType.Employee:
      return "erp__navigation_label_staff_table"
    case ErpType.Invoice:
      return "erp__navigation_label_invoices"
    case ErpType.Order:
      return "erp__navigation_label_orders"
    case ErpType.Supplier:
      return "erp__navigation_label_suppliers"
    case ErpType.Customer:
      return "erp__navigation_label_customers"
    case ErpType.OrderItem:
      return "erp__navigation_label_order_items"
    case ErpType.Product:
      return "erp__navigation_label_products"
  }
}
