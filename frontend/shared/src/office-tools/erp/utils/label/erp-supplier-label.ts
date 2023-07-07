import {ErpSupplier} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpSupplierLabel = (
  t: LucaTFunction,
  key: keyof ErpSupplier,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_supplier_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "firstName":
      return `${t("erp__table_label_first_name")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "lastName":
      return `${t("erp__table_label_last_name")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "company":
      return `${t("erp__table_label_company")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "addressLine":
      return `${t("erp__table_label_address_line")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "postalCode":
      return `${t("erp__table_label_postal_code")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_postal_code")})` : ""
      }`
    case "city":
      return `${t("erp__table_label_city")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "country":
      return `${t("erp__table_label_country")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "email":
      return `${t("erp__table_label_email")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_email")})` : ""}`
    case "phone":
      return `${t("erp__table_label_phone")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_phone")})` : ""}`
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "sampleCompanyId":
      return `${t("erp__table_label_sample_company_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "binaryFileId":
      return `${t("erp__table_label_binary_file_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_binary")})` : ""
      }`
    case "salutation":
      return `${t("erp__table_label_salutation")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_salutation")})` : ""
      }`
    default:
      return `${key}`
  }
}
