import {ErpComponent} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpComponentLabel = (
  t: LucaTFunction,
  key: keyof ErpComponent,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_component_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "name":
      return `${t("erp__table_label_name")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "category":
      return `${t("erp__table_component_label_category")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "purchasingPriceInCents":
      return `${t("erp__table_component_label_purchasing_price")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "margin":
      return `${t("erp__table_component_label_margin")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "supplierId":
      return `${t("erp__table_label_supplier_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
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
    case "binaryFileId":
      return `${t("erp__table_label_binary_file_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_binary")})` : ""
      }`
    case "unit":
      return `${t("erp__table_label_unit")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    default:
      return `${key}`
  }
}
