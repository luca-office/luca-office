import {has, omit} from "lodash-es"
import {ErpNavigationEntryId, ErpType} from "../../../enums"
import {
  DeliveryStatus,
  EmploymentMode,
  FamilyStatus,
  PaymentStatus,
  Salutation
} from "../../../graphql/generated/globalTypes"
import {ErpEntity, ErpEntityByType, ErpKeyEntity, ErpStackEntity} from "../../../models"
import {LucaTFunction} from "../../../translations"
import {contains, removeTypename} from "../../../utils"

export const getForeignKeys = <T extends ErpType>(foreignKeys: ErpKeyEntity<T>[]): (keyof ErpEntityByType<T>)[] =>
  foreignKeys.map(foreignKey => foreignKey.key)

export const isForeignKey = <T extends ErpType>(
  foreignKeys: (keyof ErpEntityByType<T>)[],
  key: keyof ErpEntityByType<T>
): boolean => contains(key, foreignKeys)

// eslint-disable-next-line consistent-return
export const getSalutationLabel = (t: LucaTFunction, salutation: Salutation): string => {
  switch (salutation) {
    case Salutation.Mr:
      return t("erp__salutation_label_mr")
    case Salutation.Mrs:
      return t("erp__salutation_label_mrs")
    case Salutation.NonBinary:
      return t("erp__salutation_label_non_binary")
  }
}

// eslint-disable-next-line consistent-return
export const getEmploymentModeLabel = (t: LucaTFunction, mode: EmploymentMode): string => {
  switch (mode) {
    case EmploymentMode.Assistance:
      return t("erp__employment_mode_label_assistance")
    case EmploymentMode.FullTime:
      return t("erp__employment_mode_label_full_time")
    case EmploymentMode.PartTime:
      return t("erp__employment_mode_label_part_time")
    case EmploymentMode.Student:
      return t("erp__employment_mode_label_student")
  }
}

// eslint-disable-next-line consistent-return
export const getFamilyStatusLabel = (t: LucaTFunction, status: FamilyStatus): string => {
  switch (status) {
    case FamilyStatus.Divorced:
      return t("erp__family_status_label_divorced")
    case FamilyStatus.Married:
      return t("erp__family_status_label_married")
    case FamilyStatus.Single:
      return t("erp__family_status_label_single")
  }
}

// eslint-disable-next-line consistent-return
export const getPaymentStatusLabel = (t: LucaTFunction, status: PaymentStatus): string => {
  switch (status) {
    case PaymentStatus.Paid:
      return t("erp__payment_status_label_paid")
    case PaymentStatus.Unpaid:
      return t("erp__payment_status_label_unpaid")
  }
}

// eslint-disable-next-line consistent-return
export const getDeliveryStatusLabel = (t: LucaTFunction, status: DeliveryStatus): string => {
  switch (status) {
    case DeliveryStatus.Completed:
      return t("erp__delivery_status_label_completed")
    case DeliveryStatus.InProcess:
      return t("erp__delivery_status_label_in_process")
  }
}

export const columnValueListToString = (values: (string | number)[]) => values.join(", ")

export const toErpStackEntity = (
  data: ErpEntity,
  foreignKeys: ErpKeyEntity<typeof data.type>[],
  index: number
): ErpStackEntity => ({
  data: (has(data, "__typename") ? removeTypename(data as ErpEntity & {__typename: string}) : data) as ErpEntity,
  foreignKeys,
  index
})

export const cleanupStackEntity = (entity: ErpStackEntity) => ({
  ...entity,
  data: omit(entity.data, ["type", "binaryFile"])
})

export const navigationIdToType = (navigationId: ErpNavigationEntryId): ErpType | null => {
  switch (navigationId) {
    case ErpNavigationEntryId.Suppliers:
      return ErpType.Supplier
    case ErpNavigationEntryId.Customers:
      return ErpType.Customer
    case ErpNavigationEntryId.Products:
      return ErpType.Product
    case ErpNavigationEntryId.OrderItems:
      return ErpType.OrderItem
    case ErpNavigationEntryId.Offers:
      return ErpType.Order
    case ErpNavigationEntryId.Invoices:
      return ErpType.Invoice
    case ErpNavigationEntryId.Components:
      return ErpType.Component
    case ErpNavigationEntryId.ComponentsForProducts:
      return ErpType.ComponentProduct
    case ErpNavigationEntryId.StaffTable:
      return ErpType.Employee
    default:
      return null
  }
}

export const getAccordionLabelByKey = (t: LucaTFunction, key: string) => {
  switch (key) {
    case "id":
      return t("erp__table_label_id")
    case "componentId":
      return t("erp__table_label_component_id")
    case "productId":
      return t("erp__table_label_product_id")
    default:
      return key
  }
}
