import {ErpType} from "../../../src/enums"
import {ErpComponentErpProductFragment} from "../../../src/graphql/generated/ErpComponentErpProductFragment"
import {ErpComponentErpProduct} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"
import {erpComponentsMockGraphQl} from "./erp-components"
import {erpProductsMockGraphQl} from "./erp-products"

export const erpComponentErpProductsMockGraphQl: ErpComponentErpProductFragment[] = [
  {
    __typename: "ErpComponentErpProduct",
    id: 0,
    componentId: erpComponentsMockGraphQl[0].id,
    productId: erpProductsMockGraphQl[0].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 5
  },
  {
    __typename: "ErpComponentErpProduct",
    id: 1,
    componentId: erpComponentsMockGraphQl[1].id,
    productId: erpProductsMockGraphQl[0].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 10
  },
  {
    __typename: "ErpComponentErpProduct",
    id: 2,
    componentId: erpComponentsMockGraphQl[0].id,
    productId: erpProductsMockGraphQl[1].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 15
  }
]

export const erpComponentErpProductsMock: ErpComponentErpProduct[] = [
  {
    type: ErpType.ComponentProduct,
    id: 0,
    componentId: erpComponentsMockGraphQl[0].id,
    productId: erpProductsMockGraphQl[0].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 5
  },
  {
    type: ErpType.ComponentProduct,
    id: 1,
    componentId: erpComponentsMockGraphQl[1].id,
    productId: erpProductsMockGraphQl[0].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 10
  },
  {
    type: ErpType.ComponentProduct,
    id: 2,
    componentId: erpComponentsMockGraphQl[0].id,
    productId: erpProductsMockGraphQl[1].id,
    sampleCompanyId: sampleCompanyIdMock,
    quantity: 15
  }
]
