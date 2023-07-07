import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"

export interface ErpProductTemplate extends Omit<ErpProduct, "id"> {
  readonly id?: number
}

export const getErpProductTemplate = (sampleCompanyId: UUID): ErpProductTemplate => ({
  type: ErpType.Product,
  id: undefined,
  name: "",
  netPriceInCents: 0,
  taxRate: 0,
  sampleCompanyId,
  binaryFileId: null,
  unit: "",
  note: null,
  packSize: 0,
  availableStock: 0,
  stockCostPerUnitInCents: 0,
  stockCostTotalInCents: 0,
  binaryFile: null
})
