import {getStoryTranslation} from "../../../../utils/stories"
import {ErpTableColumn, ErpTableColumnType, ErpTableContentType} from "../../erp-table"

export const erpColumnsMock: ErpTableColumn[] = [
  {
    type: ErpTableColumnType.PrimaryKey,
    contentType: ErpTableContentType.Number,
    label: getStoryTranslation("erp__table_label_id"),
    propertyKey: "id"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Text,
    label: getStoryTranslation("erp__table_label_name"),
    propertyKey: "name"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Text,
    label: getStoryTranslation("erp__table_component_label_category"),
    propertyKey: "category"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Currency,
    label: getStoryTranslation("erp__table_component_label_purchasing_price"),
    propertyKey: "purchasingPriceInCents"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Currency,
    label: getStoryTranslation("erp__table_component_label_margin"),
    propertyKey: "margin"
  },
  {
    type: ErpTableColumnType.ForeignKey,
    contentType: ErpTableContentType.Number,
    label: getStoryTranslation("erp__table_label_supplier_id"),
    propertyKey: "supplierId"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Number,
    label: getStoryTranslation("erp__table_label_pack_size"),
    propertyKey: "packSize"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Number,
    label: getStoryTranslation("erp__table_label_available_stock"),
    propertyKey: "availableStock"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Currency,
    label: getStoryTranslation("erp__table_label_stock_cost_per_unit"),
    propertyKey: "stockCostPerUnitInCents"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Currency,
    label: getStoryTranslation("erp__table_label_stock_cost_total"),
    propertyKey: "stockCostTotalInCents"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.BinaryFile,
    label: getStoryTranslation("erp__table_label_binary_file_id"),
    propertyKey: "binaryFileId"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Text,
    label: getStoryTranslation("erp__table_label_unit"),
    propertyKey: "unit"
  },
  {
    type: ErpTableColumnType.Default,
    contentType: ErpTableContentType.Text,
    label: getStoryTranslation("erp__table_label_note"),
    propertyKey: "note"
  }
]
