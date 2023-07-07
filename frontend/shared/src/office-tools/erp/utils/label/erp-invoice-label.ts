import {ErpInvoice} from "../../../../models"
import {LucaTFunction} from "../../../../translations"

export const getErpInvoiceLabel = (
  t: LucaTFunction,
  key: keyof ErpInvoice,
  showType: boolean,
  keyFlag?: string
): string => {
  const keyFlagLabel = keyFlag !== undefined ? ` (${keyFlag})` : ""
  switch (key) {
    case "id":
      return `${t("erp__table_label_invoice_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "invoiceDate":
      return `${t("erp__table_invoice_label_invoice_date")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_date")})` : ""
      }`
    case "dueDate":
      return `${t("erp__table_invoice_label_due_date")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_date")})` : ""
      }`
    case "paymentTerms":
      return `${t("erp__table_invoice_label_payment_terms")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "amountPaidInCents":
      return `${t("erp__table_invoice_label_amount_paid")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "paymentStatus":
      return `${t("erp__table_invoice_label_payment_status")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_payment_status")})` : ""
      }`
    case "reminderFeeInCents":
      return `${t("erp__table_invoice_label_reminder_fee")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "defaultChargesInCents":
      return `${t("erp__table_invoice_label_default_charges")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "note":
      return `${t("erp__table_label_note")}${keyFlagLabel}${showType ? ` (${t("erp__table_label_value_string")})` : ""}`
    case "sampleCompanyId":
      return `${t("erp__table_label_sample_company_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_string")})` : ""
      }`
    case "orderId":
      return `${t("erp__table_label_order_id")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_number")})` : ""
      }`
    case "totalNetInCents":
      return `${t("erp__table_label_total_net")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "totalGrossInCents":
      return `${t("erp__table_invoice_label_total_gross")}${keyFlagLabel}${
        showType ? ` (${t("erp__table_label_value_currency")})` : ""
      }`
    case "taxAmountInCents":
      return `${t("erp__table_invoice_label_tax_amount")}${keyFlagLabel}${
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
