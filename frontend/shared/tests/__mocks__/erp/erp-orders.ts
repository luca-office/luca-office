import {ErpType} from "../../../src/enums"
import {ErpOrderFragment} from "../../../src/graphql/generated/ErpOrderFragment"
import {DeliveryStatus} from "../../../src/graphql/generated/globalTypes"
import {ErpOrder} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpOrdersMockGraphQl: ErpOrderFragment[] = [
  {
    __typename: "ErpOrder",
    id: 1,
    cashbackInCents: 5000,
    discountInCents: 2500,
    deliveryChargeInCents: 490,
    deliveryStatus: DeliveryStatus.Completed,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 1,
    employeeId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpOrder",
    id: 2,
    cashbackInCents: 0,
    discountInCents: 0,
    deliveryChargeInCents: 0,
    deliveryStatus: DeliveryStatus.InProcess,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 2,
    employeeId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpOrder",
    id: 3,
    cashbackInCents: 10000,
    discountInCents: 5000,
    deliveryChargeInCents: 250,
    deliveryStatus: DeliveryStatus.InProcess,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 3,
    employeeId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]

export const erpOrdersMock: ErpOrder[] = [
  {
    type: ErpType.Order,
    id: 1,
    cashbackInCents: 5000,
    discountInCents: 2500,
    deliveryChargeInCents: 490,
    deliveryStatus: DeliveryStatus.Completed,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 1,
    employeeId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Order,
    id: 2,
    cashbackInCents: 0,
    discountInCents: 0,
    deliveryChargeInCents: 0,
    deliveryStatus: DeliveryStatus.InProcess,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 2,
    employeeId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Order,
    id: 3,
    cashbackInCents: 10000,
    discountInCents: 5000,
    deliveryChargeInCents: 250,
    deliveryStatus: DeliveryStatus.InProcess,
    deliveryDate: "2020-09-13 11:32:10.578000 +00:00",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    customerId: 3,
    employeeId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]
