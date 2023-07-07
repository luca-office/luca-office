import {ErpEntity} from "../../../../models"
import {ErpTableEntity, ErpTableRowData} from "../../erp-table"

export const erpEntityToTableEntity = (erpEntity: ErpEntity): ErpTableEntity =>
  Object.keys(erpEntity).reduce((acc, cur) => {
    return ["sampleCompanyId", "binaryFile"].includes(cur) ? acc : {...acc, [cur]: (erpEntity as any)[cur]}
  }, {} as ErpTableEntity)

export const erpEntityToTableRow = (erpEntity: ErpEntity, index: number): ErpTableRowData => ({
  entityId: erpEntity.id,
  index,
  entity: erpEntityToTableEntity(erpEntity)
})
