import {ErpType} from "../../../src/enums"
import {ErpOrderItemFragment} from "../../../src/graphql/generated/ErpOrderItemFragment"
import {ErpOrderItem} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpOrderItemsMockGraphQl: ErpOrderItemFragment[] = [
  {
    __typename: "ErpOrderItem",
    id: 1,
    quantity: 15,
    totalNetInCents: 60,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 1,
    productId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpOrderItem",
    id: 2,
    quantity: 30,
    totalNetInCents: 90,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 2,
    productId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpOrderItem",
    id: 3,
    quantity: 60,
    totalNetInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 3,
    productId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]

export const erpOrderItemsMock: ErpOrderItem[] = [
  {
    type: ErpType.OrderItem,
    id: 1,
    quantity: 15,
    totalNetInCents: 60,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 1,
    productId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.OrderItem,
    id: 2,
    quantity: 30,
    totalNetInCents: 90,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 2,
    productId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.OrderItem,
    id: 3,
    quantity: 60,
    totalNetInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 3,
    productId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]
