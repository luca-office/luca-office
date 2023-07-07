import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpOrderItemColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.PrimaryKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_order_product_id"),
      propertyKey: "id"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_quantity"),
      propertyKey: "quantity"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_label_total_net"),
      propertyKey: "totalNetInCents"
    },
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_order_id"),
      propertyKey: "orderId"
    },
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_product_id"),
      propertyKey: "productId"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.BinaryFile,
      label: t("erp__table_label_binary_file_id"),
      propertyKey: "binaryFileId"
    }
  ]
}
