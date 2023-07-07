import {ErpOrderItem} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpOrderItemLabel = (
  t: LucaTFunction,
  key: keyof ErpOrderItem,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_order_item_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "quantity":
      return `${t("erp__table_label_quantity")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "sampleCompanyId":
      return `${t("erp__table_label_sample_company_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "orderId":
      return `${t("erp__table_label_order_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "productId":
      return `${t("erp__table_label_product_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "totalNetInCents":
      return `${t("erp__table_label_total_net")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "binaryFileId":
      return `${t("erp__table_label_binary_file_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_binary")})` : ""
      }`
    default:
      return `${key}`
  }
}
