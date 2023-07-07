import {ErpType} from "../../../src/enums"
import {ErpComponentFragment} from "../../../src/graphql/generated/ErpComponentFragment"
import {ErpComponent} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpComponentsMockGraphQl: ErpComponentFragment[] = [
  {
    __typename: "ErpComponent",
    id: 1,
    name: "Seat post",
    category: "Bicycle",
    purchasingPriceInCents: 1500,
    margin: 1.5,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 1,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  },
  {
    __typename: "ErpComponent",
    id: 2,
    name: "Exhaust gas recirculation valve",
    category: "Automotive",
    purchasingPriceInCents: 49000,
    margin: 15,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 2,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  },
  {
    __typename: "ErpComponent",
    id: 3,
    name: "Graphics card",
    category: "Computer",
    purchasingPriceInCents: 14400,
    margin: 50,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 3,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  }
]

export const erpComponentsMock: ErpComponent[] = [
  {
    type: ErpType.Component,
    id: 1,
    name: "Seat post",
    category: "Bicycle",
    purchasingPriceInCents: 1500,
    margin: 1.5,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 1,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  },
  {
    type: ErpType.Component,
    id: 2,
    name: "Exhaust gas recirculation valve",
    category: "Automotive",
    purchasingPriceInCents: 49000,
    margin: 15,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 2,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  },
  {
    type: ErpType.Component,
    id: 3,
    name: "Graphics card",
    category: "Computer",
    purchasingPriceInCents: 14400,
    margin: 50,
    packSize: 1,
    availableStock: 5,
    stockCostPerUnitInCents: 60,
    stockCostTotalInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    supplierId: 3,
    binaryFileId: null,
    note: "note",
    unit: "€",
    binaryFile: null
  }
]
