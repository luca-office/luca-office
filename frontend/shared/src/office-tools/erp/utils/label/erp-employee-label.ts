import {ErpEmployee} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpEmployeeLabel = (
  t: LucaTFunction,
  key: keyof ErpEmployee,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_employee_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "salutation":
      return `${t("erp__table_label_salutation")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_salutation")})` : ""
      }`
    case "firstName":
      return `${t("erp__table_label_first_name")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "lastName":
      return `${t("erp__table_label_last_name")}${keyFlagLabel}${
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
    case "department":
      return `${t("erp__table_employee_label_department")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "jobTitle":
      return `${t("erp__table_employee_label_job_title")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "employmentMode":
      return `${t("erp__table_employee_label_employment_mode")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_employment")})` : ""
      }`
    case "employedAt":
      return `${t("erp__table_employee_label_employed_at")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_date")})` : ""
      }`
    case "employmentEndsAt":
      return `${t("erp__table_employee_label_employment_ends_at")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_date")})` : ""
      }`
    case "site":
      return `${t("erp__table_employee_label_site")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "graduation":
      return `${t("erp__table_employee_label_graduation")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "furtherEducation":
      return `${t("erp__table_employee_label_further_education")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "taxClass":
      return `${t("erp__table_employee_label_tax_class")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "familyStatus":
      return `${t("erp__table_employee_label_family_status")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_family_status")})` : ""
      }`
    case "childCount":
      return `${t("erp__table_employee_label_child_count")}${keyFlagLabel}${
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
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    default:
      return `${key}`
  }
}
