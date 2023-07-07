import {ErpType} from "../../../src/enums"
import {ErpCustomerFragment} from "../../../src/graphql/generated/ErpCustomerFragment"
import {Salutation} from "../../../src/graphql/generated/globalTypes"
import {ErpCustomer} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpCustomersMockGraphQl: ErpCustomerFragment[] = [
  {
    __typename: "ErpCustomer",
    id: 1,
    salutation: Salutation.Mrs,
    firstName: "Sara",
    lastName: "Drechsler",
    company: "Total Yard Management",
    addressLine: "Marseiller Straße 66",
    postalCode: "86756",
    city: "Reimlingen",
    country: "Germany",
    email: "SaraDrechsler@rhyta.com",
    phone: "09081626667",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpCustomer",
    id: 2,
    salutation: Salutation.Mr,
    firstName: "Benjamin",
    lastName: "Hartmann",
    company: "Mission G",
    addressLine: "Gubener Str. 57",
    postalCode: "83053",
    city: "Kolbermoor",
    country: "Germany",
    email: "BenjaminHartmann@rhyta.com",
    phone: "08031433021",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpCustomer",
    id: 3,
    salutation: Salutation.Mr,
    firstName: "Dominik",
    lastName: "Kirsch",
    company: "StopGrey",
    addressLine: "Brandenburgische Str 28",
    postalCode: "55596",
    city: "Schloßböckelheim",
    country: "Germany",
    email: "DominikKirsch@dayrep.com",
    phone: "06758816738",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  }
]

export const erpCustomersMock: ErpCustomer[] = [
  {
    type: ErpType.Customer,
    id: 1,
    salutation: Salutation.Mrs,
    firstName: "Sara",
    lastName: "Drechsler",
    company: "Total Yard Management",
    addressLine: "Marseiller Straße 66",
    postalCode: "86756",
    city: "Reimlingen",
    country: "Germany",
    email: "SaraDrechsler@rhyta.com",
    phone: "09081626667",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Customer,
    id: 2,
    salutation: Salutation.Mr,
    firstName: "Benjamin",
    lastName: "Hartmann",
    company: "Mission G",
    addressLine: "Gubener Str. 57",
    postalCode: "83053",
    city: "Kolbermoor",
    country: "Germany",
    email: "BenjaminHartmann@rhyta.com",
    phone: "08031433021",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Customer,
    id: 3,
    salutation: Salutation.Mr,
    firstName: "Dominik",
    lastName: "Kirsch",
    company: "StopGrey",
    addressLine: "Brandenburgische Str 28",
    postalCode: "55596",
    city: "Schloßböckelheim",
    country: "Germany",
    email: "DominikKirsch@dayrep.com",
    phone: "06758816738",
    note: null,
    sampleCompanyId: sampleCompanyIdMock,
    binaryFileId: null,
    binaryFile: null
  }
]
