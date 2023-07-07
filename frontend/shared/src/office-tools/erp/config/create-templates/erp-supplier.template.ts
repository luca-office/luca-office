import {ErpType} from "../../../../enums"
import {Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpSupplier} from "../../../../models"

export interface ErpSupplierTemplate extends Omit<ErpSupplier, "id"> {
  readonly id?: number
}

export const getErpSupplierTemplate = (sampleCompanyId: UUID): ErpSupplierTemplate => ({
  type: ErpType.Supplier,
  id: undefined,
  firstName: "",
  lastName: "",
  company: "",
  addressLine: "",
  postalCode: "",
  city: "",
  country: "",
  email: "",
  phone: "",
  note: null,
  sampleCompanyId,
  binaryFileId: null,
  salutation: Salutation.Mrs,
  binaryFile: null
})
