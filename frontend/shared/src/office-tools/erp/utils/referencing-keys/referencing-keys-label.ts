import {ErpType} from "../../../../enums"
import {LucaTFunction} from "../../../../translations"

// eslint-disable-next-line consistent-return
export const getAccordionLabel = (t: LucaTFunction, type: ErpType): string => {
  switch (type) {
    case ErpType.Component:
      return t("erp_accordion__component_label")
    case ErpType.Customer:
      return t("erp_accordion__customer_label")
    case ErpType.Employee:
      return t("erp_accordion__employee_label")
    case ErpType.Invoice:
      return t("erp_accordion__invoice_label")
    case ErpType.Order:
      return t("erp_accordion__order_label")
    case ErpType.OrderItem:
      return t("erp_accordion__order_item_label")
    case ErpType.Product:
      return t("erp_accordion__product_label")
    case ErpType.Supplier:
      return t("erp_accordion__supplier_label")
    case ErpType.ComponentProduct:
      return t("erp_accordion__component_for_product_label_simple")
  }
}

// eslint-disable-next-line consistent-return
export const getAdditionalAccordionLabel = (t: LucaTFunction, type: ErpType, count: number): string => {
  switch (type) {
    case ErpType.Component:
      return t("erp_accordion__component_additional_label", {count})
    case ErpType.Customer:
      return t("erp_accordion__customer_additional_label", {count})
    case ErpType.Employee:
      return t("erp_accordion__employee_additional_label", {count})
    case ErpType.Invoice:
      return t("erp_accordion__invoice_additional_label", {count})
    case ErpType.Order:
      return t("erp_accordion__order_additional_label", {count})
    case ErpType.OrderItem:
      return t("erp_accordion__order_item_additional_label", {count})
    case ErpType.Product:
      return t("erp_accordion__product_additional_label", {count})
    case ErpType.Supplier:
      return t("erp_accordion__supplier_additional_label", {count})
    case ErpType.ComponentProduct:
      return t("erp_accordion__component_for_product_additional_label", {count})
  }
}
