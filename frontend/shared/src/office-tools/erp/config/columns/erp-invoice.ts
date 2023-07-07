import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpInvoiceColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.PrimaryKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_invoice_id"),
      propertyKey: "id"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Date,
      label: t("erp__table_invoice_label_invoice_date"),
      propertyKey: "invoiceDate"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_invoice_label_payment_terms"),
      propertyKey: "paymentTerms"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_label_total_net"),
      propertyKey: "totalNetInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_invoice_label_tax_amount"),
      propertyKey: "taxAmountInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_invoice_label_total_gross"),
      propertyKey: "totalGrossInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Date,
      label: t("erp__table_invoice_label_due_date"),
      propertyKey: "dueDate"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_invoice_label_amount_paid"),
      propertyKey: "amountPaidInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.PaymentStatus,
      label: t("erp__table_invoice_label_payment_status"),
      propertyKey: "paymentStatus"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_invoice_label_reminder_fee"),
      propertyKey: "reminderFeeInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_invoice_label_default_charges"),
      propertyKey: "defaultChargesInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_note"),
      propertyKey: "note"
    },
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_order_id"),
      propertyKey: "orderId"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.BinaryFile,
      label: t("erp__table_label_binary_file_id"),
      propertyKey: "binaryFileId"
    }
  ]
}
