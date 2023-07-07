import {ErpProduct} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpProductLabel = (
  t: LucaTFunction,
  key: keyof ErpProduct,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_product_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "name":
      return `${t("erp__table_label_name")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "netPriceInCents":
      return `${t("erp__table_product_label_net_price")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "taxRate":
      return `${t("erp__table_product_label_tax_rate")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "sampleCompanyId":
      return `${t("erp__table_label_sample_company_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "binaryFileId":
      return `${t("erp__table_label_binary_file_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_binary")})` : ""
      }`
    case "unit":
      return `${t("erp__table_label_unit")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "packSize":
      return `${t("erp__table_label_pack_size")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "availableStock":
      return `${t("erp__table_label_available_stock")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "stockCostPerUnitInCents":
      return `${t("erp__table_label_stock_cost_per_unit")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "stockCostTotalInCents":
      return `${t("erp__table_label_stock_cost_total")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    default:
      return `${key}`
  }
}
