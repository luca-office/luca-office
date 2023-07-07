import {ErpComponentErpProduct} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpComponentForProductLabel = (
  t: LucaTFunction,
  key: keyof ErpComponentErpProduct,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "componentId":
      return `${t("erp__table_label_component_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "productId":
      return `${t("erp__table_label_product_id")}${keyFlagLabel}${
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
    default:
      return `${key}`
  }
}
