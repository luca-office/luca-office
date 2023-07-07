import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpOrderColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.PrimaryKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_order_id"),
      propertyKey: "id"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_order_label_cashback"),
      propertyKey: "cashbackInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_order_label_discount"),
      propertyKey: "discountInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_order_label_delivery_charge"),
      propertyKey: "deliveryChargeInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.DeliveryStatus,
      label: t("erp__table_order_label_delivery_status"),
      propertyKey: "deliveryStatus"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Date,
      label: t("erp__table_order_label_delivery_date"),
      propertyKey: "deliveryDate"
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
      label: t("erp__table_order_label_customer_id"),
      propertyKey: "customerId"
    },
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_employee_id"),
      propertyKey: "employeeId"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.BinaryFile,
      label: t("erp__table_label_binary_file_id"),
      propertyKey: "binaryFileId"
    }
  ]
}
