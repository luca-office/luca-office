import {ErpType} from "../../../../enums"
import {ErpComponentErpProduct} from "../../../../models"

export interface ErpComponentErpProductTemplate
  extends Omit<ErpComponentErpProduct, "id" | "componentId" | "productId"> {
  readonly id?: number
  readonly componentId?: number
  readonly productId?: number
}

export const getErpComponentErpProductTemplate = (sampleCompanyId: UUID): ErpComponentErpProductTemplate => ({
  type: ErpType.ComponentProduct,
  id: undefined,
  componentId: undefined,
  productId: undefined,
  sampleCompanyId,
  quantity: 0
})
