import {ErpType} from "../../../../enums"
import {DeliveryStatus} from "../../../../graphql/generated/globalTypes"
import {ErpOrder} from "../../../../models"
import {now} from "../../../../utils/date"

export interface ErpOrderTemplate extends Omit<ErpOrder, "id" | "customerId" | "employeeId"> {
  readonly id?: number
  readonly customerId?: number
  readonly employeeId?: number
}

const dateString = now().toISOString()

export const getErpOrderTemplate = (sampleCompanyId: UUID): ErpOrderTemplate => ({
  type: ErpType.Order,
  id: undefined,
  cashbackInCents: null,
  discountInCents: null,
  deliveryChargeInCents: 0,
  deliveryStatus: DeliveryStatus.InProcess,
  deliveryDate: dateString,
  note: null,
  sampleCompanyId,
  customerId: undefined,
  employeeId: undefined,
  binaryFileId: null,
  binaryFile: null
})
