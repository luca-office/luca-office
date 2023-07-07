import {ErpType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"

export interface ErpOrderItemTemplate extends Omit<ErpOrderItem, "id" | "orderId" | "productId"> {
  readonly id?: number
  readonly orderId?: number
  readonly productId?: number
}

export const getErpOrderItemTemplate = (sampleCompanyId: UUID): ErpOrderItemTemplate => ({
  type: ErpType.OrderItem,
  id: undefined,
  quantity: 0,
  sampleCompanyId,
  orderId: undefined,
  productId: undefined,
  totalNetInCents: 0,
  binaryFileId: null,
  binaryFile: null
})
