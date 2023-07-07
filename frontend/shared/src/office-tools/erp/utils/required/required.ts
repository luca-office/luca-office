import {ErpType} from "../../../../enums"
import {
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpEntityByType,
  ErpInvoice,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../../models"
import {contains} from "../../../../utils"

export const isErpComponentErpProductKeyRequired = (key: keyof ErpComponentErpProduct): boolean =>
  key === "componentId" || key === "productId"

export const isErpComponentKeyRequired = (key: keyof ErpComponent): boolean => key !== "note" && key !== "binaryFileId"

export const isErpCustomerKeyRequired = (key: keyof ErpCustomer): boolean => {
  const optionalKeys = ["company", "phone", "note", "email", "binaryFileId"]
  return !contains(key, optionalKeys)
}

export const isErpEmployeeKeyRequired = (key: keyof ErpEmployee): boolean => {
  const optionalKeys = [
    "childCount",
    "phone",
    "graduation",
    "furtherEducation",
    "note",
    "email",
    "employmentEndsAt",
    "binaryFileId"
  ]
  return !contains(key, optionalKeys)
}

export const isErpInvoiceKeyRequired = (key: keyof ErpInvoice): boolean => {
  const optionalKeys = ["amountPaidInCents", "reminderFeeInCents", "defaultChargesInCents", "note", "binaryFileId"]
  return !contains(key, optionalKeys)
}

export const isErpOrderItemKeyRequired = (key: keyof ErpOrderItem): boolean => key !== "binaryFileId"

export const isErpOrderKeyRequired = (key: keyof ErpOrder): boolean => {
  const optionalKeys = ["cashbackInCents", "discountInCents", "note", "binaryFileId"]
  return !contains(key, optionalKeys)
}

export const isErpProductKeyRequired = (key: keyof ErpProduct): boolean => key !== "note" && key !== "binaryFileId"

export const isErpSupplierKeyRequired = (key: keyof ErpSupplier): boolean => key !== "note" && key !== "binaryFileId"

interface IsRequiredParams<T extends ErpType> {
  readonly type: T
  readonly key: keyof ErpEntityByType<T>
}

export const isRequired = <T extends ErpType>({type, key}: IsRequiredParams<T>): boolean => {
  let required: boolean

  switch (type) {
    case ErpType.Component:
      required = isErpComponentKeyRequired(key as keyof ErpComponent)
      break
    case ErpType.Customer:
      required = isErpCustomerKeyRequired(key as keyof ErpCustomer)
      break
    case ErpType.Employee:
      required = isErpEmployeeKeyRequired(key as keyof ErpEmployee)
      break
    case ErpType.Invoice:
      required = isErpInvoiceKeyRequired(key as keyof ErpInvoice)
      break
    case ErpType.Order:
      required = isErpOrderKeyRequired(key as keyof ErpOrder)
      break
    case ErpType.OrderItem:
      required = isErpOrderItemKeyRequired(key as keyof ErpOrderItem)
      break
    case ErpType.Product:
      required = isErpProductKeyRequired(key as keyof ErpProduct)
      break
    case ErpType.Supplier:
      required = isErpSupplierKeyRequired(key as keyof ErpSupplier)
      break
    case ErpType.ComponentProduct:
      required = isErpComponentErpProductKeyRequired(key as keyof ErpComponentErpProduct)
      break
    default:
      required = false
  }

  return required
}
