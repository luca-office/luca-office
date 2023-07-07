import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpProductColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.PrimaryKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_product_id"),
      propertyKey: "id"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_name"),
      propertyKey: "name"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_product_label_net_price"),
      propertyKey: "netPriceInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_product_label_tax_rate"),
      propertyKey: "taxRate"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_pack_size"),
      propertyKey: "packSize"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Text,
      label: t("erp__table_label_unit"),
      propertyKey: "unit"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_available_stock"),
      propertyKey: "availableStock"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_label_stock_cost_per_unit"),
      propertyKey: "stockCostPerUnitInCents"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Currency,
      label: t("erp__table_label_stock_cost_total"),
      propertyKey: "stockCostTotalInCents"
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
