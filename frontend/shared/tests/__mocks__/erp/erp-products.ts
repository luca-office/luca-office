import {ErpType} from "../../../src/enums"
import {ErpProductFragment} from "../../../src/graphql/generated/ErpProductFragment"
import {ErpProduct} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpProductsMockGraphQl: ErpProductFragment[] = [
  {
    __typename: "ErpProduct",
    id: 1,
    name: "Car exhaust gas recirculation valve",
    netPriceInCents: 49000,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  },
  {
    __typename: "ErpProduct",
    id: 2,
    name: "Bicycle seat post",
    netPriceInCents: 1500,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  },
  {
    __typename: "ErpProduct",
    id: 3,
    name: "Computer graphics card",
    netPriceInCents: 14400,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  }
]

export const erpProductsMock: ErpProduct[] = [
  {
    type: ErpType.Product,
    id: 1,
    name: "Car exhaust gas recirculation valve",
    netPriceInCents: 49000,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  },
  {
    type: ErpType.Product,
    id: 2,
    name: "Bicycle seat post",
    netPriceInCents: 1500,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  },
  {
    type: ErpType.Product,
    id: 3,
    name: "Computer graphics card",
    netPriceInCents: 14400,
    taxRate: 19,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    unit: "€",
    note: "note",
    availableStock: 10,
    packSize: 20,
    stockCostPerUnitInCents: 120,
    stockCostTotalInCents: 1200,
    binaryFile: null
  }
]
