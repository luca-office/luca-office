import {ErpType} from "../../../enums"
import {ErpEntity} from "../../../models"

const hasSalutation = (erpEntity: ErpEntity) => {
  switch (erpEntity.type) {
    case ErpType.Customer:
    case ErpType.Employee:
    case ErpType.Supplier:
      return true
    default:
      return false
  }
}

export const getErpEntityKeys = (erpEntity: ErpEntity): string[] => {
  const keys = Object.keys(erpEntity)

  // if entity has salutation it also contains firstName and lastName
  return hasSalutation(erpEntity)
    ? [
        "salutation",
        "firstName",
        "lastName",
        ...keys.filter(key => key !== "salutation" && key !== "firstName" && key !== "lastName")
      ]
    : keys
}
