import {ErpType} from "../../../../enums"
import {Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpCustomer} from "../../../../models"

export interface ErpCustomerTemplate extends Omit<ErpCustomer, "id"> {
  readonly id?: number
}

export const getErpCustomerTemplate = (sampleCompanyId: UUID): ErpCustomerTemplate => ({
  type: ErpType.Customer,
  id: undefined,
  salutation: Salutation.Mrs,
  firstName: "",
  lastName: "",
  company: null,
  addressLine: "",
  postalCode: "",
  city: "",
  country: "",
  email: null,
  phone: null,
  note: null,
  sampleCompanyId,
  binaryFileId: null,
  binaryFile: null
})
