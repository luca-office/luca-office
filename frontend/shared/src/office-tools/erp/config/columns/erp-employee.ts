import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpEmployeeColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.PrimaryKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_employee_id"),
      propertyKey: "id"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Salutation,
      label: t("erp__table_label_salutation"),
      propertyKey: "salutation"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_first_name"),
      propertyKey: "firstName"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_last_name"),
      propertyKey: "lastName"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_address_line"),
      propertyKey: "addressLine"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_postal_code"),
      propertyKey: "postalCode"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_city"),
      propertyKey: "city"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_country"),
      propertyKey: "country"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_email"),
      propertyKey: "email"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_phone"),
      propertyKey: "phone"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_employee_label_department"),
      propertyKey: "department"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_employee_label_job_title"),
      propertyKey: "jobTitle"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.EmploymentMode,
      label: t("erp__table_employee_label_employment_mode"),
      propertyKey: "employmentMode"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Date,
      label: t("erp__table_employee_label_employed_at"),
      propertyKey: "employedAt"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Date,
      label: t("erp__table_employee_label_employment_ends_at"),
      propertyKey: "employmentEndsAt"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_employee_label_site"),
      propertyKey: "site"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_employee_label_graduation"),
      propertyKey: "graduation"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.TextArray,
      label: t("erp__table_employee_label_further_education"),
      propertyKey: "furtherEducation"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_employee_label_tax_class"),
      propertyKey: "taxClass"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.FamilyStatus,
      label: t("erp__table_employee_label_family_status"),
      propertyKey: "familyStatus"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_employee_label_child_count"),
      propertyKey: "childCount"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_note"),
      propertyKey: "note"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.BinaryFile,
      label: t("erp__table_label_binary_file_id"),
      propertyKey: "binaryFileId"
    }
  ]
}
