import {EmploymentMode, FamilyStatus, Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpEmployee} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {formatDate, isDefined, parseDateString} from "../../../../utils"
import {getEmploymentModeLabel, getFamilyStatusLabel, getSalutationLabel} from "../common"
import {getErpEmployeeLabel} from "../label/erp-employee-label"
import {toDataString} from "./common"

export const getErpEmployeeClipboardString = (t: LucaTFunction, data: ErpEmployee): string => {
  const erpEmployeeData = Object.keys(data)
    .map(key => key as keyof ErpEmployee)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isDateValue = key === "employedAt" || key === "employmentEndsAt"
      const isSalutation = key === "salutation"
      const isEmploymentMode = key === "employmentMode"
      const isFamilyStatus = key === "familyStatus"

      const label = getErpEmployeeLabel(t, key, false)
      const value = data[key]
      return {
        ...accumulator,
        [label]: isSalutation
          ? getSalutationLabel(t, value as Salutation)
          : isEmploymentMode
          ? getEmploymentModeLabel(t, value as EmploymentMode)
          : isFamilyStatus
          ? getFamilyStatusLabel(t, value as FamilyStatus)
          : isDateValue && isDefined(value)
          ? formatDate(parseDateString(value as string))
          : value
      }
    }, {})

  return toDataString(erpEmployeeData)
}
