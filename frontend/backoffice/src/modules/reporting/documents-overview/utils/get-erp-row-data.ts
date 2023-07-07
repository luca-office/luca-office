import {ErpType} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"
import {LucaTFunction} from "shared/translations"

export const getErpOpenRowEvent = (surveyEvents: SurveyEvent[], erpType: ErpType, rowId: number) => {
  return surveyEvents.find(
    event =>
      event.eventType === SurveyEventType.ErpOpenRow && event.data?.tableType === erpType && event.data?.rowId === rowId
  )
}

export const getErpRowName = (erpType: ErpType, id: number, t: LucaTFunction) =>
  `${getErpRowTranslationKey(erpType)} ${id} ${t("document_overview__erp_row")}`

export const getErpRowTranslationKey = (erpType: ErpType) => {
  switch (erpType) {
    case ErpType.Invoice:
      return "erp__table_label_invoice_id"
    case ErpType.Supplier:
      return "erp__table_label_supplier_id"
    case ErpType.Component:
      return "erp__table_label_component_id"
    case ErpType.ComponentProduct:
      return "erp__table_label_order_product_id"
    case ErpType.Customer:
      return "erp__table_order_label_customer_id"
    case ErpType.Employee:
      return "erp__table_label_employee_id"
    case ErpType.Order:
      return "erp__table_label_order_id"
    case ErpType.OrderItem:
      return "erp__table_label_order_item_id"
    case ErpType.Product:
      return "erp__table_label_product_id"
    default:
      return "erp__table_label_unknown"
  }
}
