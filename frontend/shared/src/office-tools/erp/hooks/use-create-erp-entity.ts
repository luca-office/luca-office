import {omit, pick} from "lodash-es"
import {ErpType} from "../../../enums"
import {
  ErpComponentCreation,
  ErpComponentErpProductCreation,
  ErpCustomerCreation,
  ErpEmployeeCreation,
  ErpInvoiceCreation,
  ErpOrderCreation,
  ErpOrderItemCreation,
  ErpProductCreation,
  ErpSupplierCreation
} from "../../../graphql/generated/globalTypes"
import {
  useCreateErpComponent,
  useCreateErpComponentErpProduct,
  useCreateErpCustomer,
  useCreateErpEmployee,
  useCreateErpInvoice,
  useCreateErpOrder,
  useCreateErpOrderItem,
  useCreateErpProduct,
  useCreateErpSupplier
} from "../../../graphql/hooks"
import {
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpEntity,
  ErpInvoice,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../models"
import {Option, parseDateString, serialize} from "../../../utils"

type CreateHandler<T extends ErpEntity> = (data: T) => Promise<Option<T>>

export interface UseCreateErpEntityHook<T extends ErpEntity> {
  readonly createErpEntity: CreateHandler<T>
  readonly isCreateErpEntityLoading: boolean
}

export const useCreateErpEntity = <T extends ErpEntity>(
  sampleCompanyId: UUID,
  type: ErpType
): UseCreateErpEntityHook<T> => {
  const {createErpComponent, isCreateErpComponentLoading} = useCreateErpComponent()
  const {createErpCustomer, isCreateErpCustomerLoading} = useCreateErpCustomer()
  const {createErpEmployee, isCreateErpEmployeeLoading} = useCreateErpEmployee()
  const {createErpInvoice, isCreateErpInvoiceLoading} = useCreateErpInvoice()
  const {createErpOrder, isCreateErpOrderLoading} = useCreateErpOrder()
  const {createErpOrderItem, isCreateErpOrderItemLoading} = useCreateErpOrderItem()
  const {createErpProduct, isCreateErpProductLoading} = useCreateErpProduct()
  const {createErpSupplier, isCreateErpSupplierLoading} = useCreateErpSupplier()
  const {createErpComponentErpProduct, isCreateErpComponentErpProductLoading} = useCreateErpComponentErpProduct()

  switch (type) {
    case ErpType.Component:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpComponent
          return createErpComponent({
            ...omit<ErpComponent, keyof Omit<ErpComponent, keyof ErpComponentCreation>>(entityData, [
              "id",
              "binaryFile"
            ]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpComponentLoading
      }
    case ErpType.Customer:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpCustomer
          return createErpCustomer({
            ...omit<ErpCustomer, keyof Omit<ErpCustomer, keyof ErpCustomerCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpCustomerLoading
      }
    case ErpType.Employee:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpEmployee
          return createErpEmployee({
            ...omit<ErpEmployee, keyof Omit<ErpEmployee, keyof ErpEmployeeCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId,
            employedAt: serialize(parseDateString(entityData.employedAt)),
            employmentEndsAt: entityData.employmentEndsAt
              ? serialize(parseDateString(entityData.employmentEndsAt))
              : null
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpEmployeeLoading
      }
    case ErpType.Invoice:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpInvoice
          return createErpInvoice({
            ...omit<ErpInvoice, keyof Omit<ErpInvoice, keyof ErpInvoiceCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId,
            invoiceDate: serialize(parseDateString(entityData.invoiceDate)),
            dueDate: serialize(parseDateString(entityData.dueDate))
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpInvoiceLoading
      }
    case ErpType.Order:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpOrder
          return createErpOrder({
            ...omit<ErpOrder, keyof Omit<ErpOrder, keyof ErpOrderCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId,
            deliveryDate: serialize(parseDateString(entityData.deliveryDate))
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpOrderLoading
      }
    case ErpType.OrderItem:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpOrderItem
          return createErpOrderItem({
            ...omit<ErpOrderItem, keyof Omit<ErpOrderItem, keyof ErpOrderItemCreation>>(entityData, [
              "id",
              "binaryFile"
            ]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpOrderItemLoading
      }
    case ErpType.Product:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpProduct
          return createErpProduct({
            ...omit<ErpProduct, keyof Omit<ErpProduct, keyof ErpProductCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpProductLoading
      }
    case ErpType.Supplier:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpSupplier
          return createErpSupplier({
            ...omit<ErpSupplier, keyof Omit<ErpSupplier, keyof ErpSupplierCreation>>(entityData, ["id", "binaryFile"]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpSupplierLoading
      }
    case ErpType.ComponentProduct:
      return {
        createErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpComponentErpProduct
          return createErpComponentErpProduct({
            ...pick<ErpComponentErpProduct, keyof ErpComponentErpProductCreation>(entityData, [
              "componentId",
              "productId",
              "quantity"
            ]),
            sampleCompanyId
          })
        }) as unknown) as CreateHandler<T>,
        isCreateErpEntityLoading: isCreateErpComponentErpProductLoading
      }
    default:
      return {
        createErpEntity: () => Promise.reject(),
        isCreateErpEntityLoading: false
      }
  }
}
