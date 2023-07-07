import {ErpType} from "../../../../enums"
import {EmploymentMode, FamilyStatus, Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpEmployee} from "../../../../models"
import {now} from "../../../../utils/date"

export interface ErpEmployeeTemplate extends Omit<ErpEmployee, "id"> {
  readonly id?: number
}

const dateString = now().toISOString()

export const getErpEmployeeTemplate = (sampleCompanyId: UUID): ErpEmployeeTemplate => ({
  type: ErpType.Employee,
  id: undefined,
  salutation: Salutation.Mrs,
  firstName: "",
  lastName: "",
  addressLine: "",
  postalCode: "",
  city: "",
  country: "",
  email: null,
  phone: null,
  department: "",
  jobTitle: "",
  employmentMode: EmploymentMode.FullTime,
  employedAt: dateString,
  employmentEndsAt: null,
  site: "",
  graduation: null,
  furtherEducation: [],
  taxClass: "",
  familyStatus: FamilyStatus.Single,
  childCount: null,
  sampleCompanyId,
  binaryFileId: null,
  note: null,
  binaryFile: null
})
