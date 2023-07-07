import {ErpOrder} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpOrderLabel = (
  t: LucaTFunction,
  key: keyof ErpOrder,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_order_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "cashbackInCents":
      return `${t("erp__table_order_label_cashback")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "discountInCents":
      return `${t("erp__table_order_label_discount")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "deliveryChargeInCents":
      return `${t("erp__table_order_label_delivery_charge")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "deliveryStatus":
      return `${t("erp__table_order_label_delivery_status")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_delivery_status")})` : ""
      }`
    case "deliveryDate":
      return `${t("erp__table_order_label_delivery_date")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_date")})` : ""
      }`
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "sampleCompanyId":
      return `${t("erp__table_label_sample_company_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "customerId":
      return `${t("erp__table_order_label_customer_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "employeeId":
      return `${t("erp__table_label_employee_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "binaryFileId":
      return `${t("erp__table_label_binary_file_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_binary")})` : ""
      }`
    default:
      return `${key}`
  }
}
