import {LucaTFunction} from "../../../../translations"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const getErpComponentErpProductColumns = (t: LucaTFunction): Array<ErpTableColumn> => {
  return [
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_product_id"),
      propertyKey: "productId"
    },
    {
      type: ErpTableColumnType.ForeignKey,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_component_id"),
      propertyKey: "componentId"
    },
    {
      type: ErpTableColumnType.Default,
      contentType: ErpTableContentType.Number,
      label: t("erp__table_label_quantity_per_product"),
      propertyKey: "quantity"
    }
  ]
}
