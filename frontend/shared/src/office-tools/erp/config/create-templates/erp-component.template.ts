import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"

export interface ErpComponentTemplate extends Omit<ErpComponent, "id" | "supplierId"> {
  readonly id?: number
  readonly supplierId?: number
}

export const getErpComponentTemplate = (sampleCompanyId: UUID): ErpComponentTemplate => ({
  type: ErpType.Component,
  id: undefined,
  name: "",
  category: "",
  purchasingPriceInCents: 0,
  margin: 0,
  sampleCompanyId,
  supplierId: undefined,
  packSize: 0,
  availableStock: 0,
  stockCostPerUnitInCents: 0,
  stockCostTotalInCents: 0,
  binaryFileId: null,
  unit: "",
  note: null,
  binaryFile: null
})
