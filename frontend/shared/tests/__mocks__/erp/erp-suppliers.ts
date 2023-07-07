import {ErpType} from "../../../src/enums"
import {ErpSupplierFragment} from "../../../src/graphql/generated/ErpSupplierFragment"
import {Salutation} from "../../../src/graphql/generated/globalTypes"
import {ErpSupplier} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpSuppliersMockGraphQl: ErpSupplierFragment[] = [
  {
    __typename: "ErpSupplier",
    id: 1,
    firstName: "Karolin",
    lastName: "Baumgärtner",
    company: "Nan Duskin",
    addressLine: "An Der Urania 75",
    postalCode: "25504",
    city: "Itzehoe",
    country: "Germany",
    email: "KarolinBaumgaertner@armyspy.com",
    phone: "04821636682",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mrs,
    binaryFile: null
  },
  {
    __typename: "ErpSupplier",
    id: 2,
    firstName: "Ines",
    lastName: "Osterhagen",
    company: "Stratapro",
    addressLine: "Hollander Strasse 76",
    postalCode: "56379",
    city: "Holzappel",
    country: "Germany",
    email: "InesOsterhagen@armyspy.com",
    phone: "06439516527",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mrs,
    binaryFile: null
  },
  {
    __typename: "ErpSupplier",
    id: 3,
    firstName: "Matthias",
    lastName: "Koch",
    company: "Thrift Auto Parts",
    addressLine: "Rudolstädter Straße 42",
    postalCode: "63781",
    city: "Obernburg",
    country: "Germany",
    email: "MatthiasKoch@armyspy.com",
    phone: "06022501716",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mr,
    binaryFile: null
  }
]

export const erpSuppliersMock: ErpSupplier[] = [
  {
    type: ErpType.Supplier,
    id: 1,
    firstName: "Karolin",
    lastName: "Baumgärtner",
    company: "Nan Duskin",
    addressLine: "An Der Urania 75",
    postalCode: "25504",
    city: "Itzehoe",
    country: "Germany",
    email: "KarolinBaumgaertner@armyspy.com",
    phone: "04821636682",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mrs,
    binaryFile: null
  },
  {
    type: ErpType.Supplier,
    id: 2,
    firstName: "Ines",
    lastName: "Osterhagen",
    company: "Stratapro",
    addressLine: "Hollander Strasse 76",
    postalCode: "56379",
    city: "Holzappel",
    country: "Germany",
    email: "InesOsterhagen@armyspy.com",
    phone: "06439516527",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mrs,
    binaryFile: null
  },
  {
    type: ErpType.Supplier,
    id: 3,
    firstName: "Matthias",
    lastName: "Koch",
    company: "Thrift Auto Parts",
    addressLine: "Rudolstädter Straße 42",
    postalCode: "63781",
    city: "Obernburg",
    country: "Germany",
    email: "MatthiasKoch@armyspy.com",
    phone: "06022501716",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    salutation: Salutation.Mr,
    binaryFile: null
  }
]
