import {omit} from "lodash-es"
import {ErpType} from "../../../enums"
import {
  ErpComponentErpProductUpdate,
  ErpComponentUpdate,
  ErpCustomerUpdate,
  ErpEmployeeUpdate,
  ErpInvoiceUpdate,
  ErpOrderItemUpdate,
  ErpOrderUpdate,
  ErpProductUpdate,
  ErpSupplierUpdate
} from "../../../graphql/generated/globalTypes"
import {
  useUpdateErpComponent,
  useUpdateErpComponentErpProduct,
  useUpdateErpCustomer,
  useUpdateErpEmployee,
  useUpdateErpInvoice,
  useUpdateErpOrder,
  useUpdateErpOrderItem,
  useUpdateErpProduct,
  useUpdateErpSupplier
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

type UpdateHandler<T extends ErpEntity> = (data: T) => Promise<Option<T>>

export interface UseUpdateErpHook<T extends ErpEntity> {
  readonly updateErpEntity: UpdateHandler<T>
  readonly isUpdateErpEntityLoading: boolean
}

export const useUpdateErpEntity = <T extends ErpEntity>(sampleCompanyId: UUID, type: ErpType): UseUpdateErpHook<T> => {
  const {updateErpComponent, isUpdateErpComponentLoading} = useUpdateErpComponent()
  const {updateErpCustomer, isUpdateErpCustomerLoading} = useUpdateErpCustomer()
  const {updateErpEmployee, isUpdateErpEmployeeLoading} = useUpdateErpEmployee()
  const {updateErpInvoice, isUpdateErpInvoiceLoading} = useUpdateErpInvoice()
  const {updateErpOrder, isUpdateErpOrderLoading} = useUpdateErpOrder()
  const {updateErpOrderItem, isUpdateErpOrderItemLoading} = useUpdateErpOrderItem()
  const {updateErpProduct, isUpdateErpProductLoading} = useUpdateErpProduct()
  const {updateErpSupplier, isUpdateErpSupplierLoading} = useUpdateErpSupplier()
  const {updateErpComponentErpProduct, isUpdateErpComponentErpProductLoading} = useUpdateErpComponentErpProduct()

  switch (type) {
    case ErpType.Component:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpComponent
          return !data.id
            ? Promise.reject()
            : updateErpComponent(
                data.id,
                sampleCompanyId,
                omit<ErpComponent, keyof Omit<ErpComponent, keyof ErpComponentUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ])
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpComponentLoading
      }
    case ErpType.Customer:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpCustomer
          return !data.id
            ? Promise.reject()
            : updateErpCustomer(
                data.id,
                sampleCompanyId,
                omit<ErpCustomer, keyof Omit<ErpCustomer, keyof ErpCustomerUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ])
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpCustomerLoading
      }
    case ErpType.Employee:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpEmployee
          return !data.id
            ? Promise.reject()
            : updateErpEmployee(data.id, sampleCompanyId, {
                ...omit<ErpEmployee, keyof Omit<ErpEmployee, keyof ErpEmployeeUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ]),
                employedAt: serialize(parseDateString(entityData.employedAt)),
                employmentEndsAt: entityData.employmentEndsAt
                  ? serialize(parseDateString(entityData.employmentEndsAt))
                  : null
              })
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpEmployeeLoading
      }
    case ErpType.Invoice:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpInvoice
          return !data.id
            ? Promise.reject()
            : updateErpInvoice(data.id, sampleCompanyId, {
                ...omit<ErpInvoice, keyof Omit<ErpInvoice, keyof ErpInvoiceUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ]),
                invoiceDate: serialize(parseDateString(entityData.invoiceDate)),
                dueDate: serialize(parseDateString(entityData.dueDate))
              })
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpInvoiceLoading
      }
    case ErpType.Order:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpOrder
          return !data.id
            ? Promise.reject()
            : updateErpOrder(data.id, sampleCompanyId, {
                ...omit<ErpOrder, keyof Omit<ErpOrder, keyof ErpOrderUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ]),
                deliveryDate: serialize(parseDateString(entityData.deliveryDate))
              })
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpOrderLoading
      }
    case ErpType.OrderItem:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpOrderItem
          return !data.id
            ? Promise.reject()
            : updateErpOrderItem(
                data.id,
                sampleCompanyId,
                omit<ErpOrderItem, keyof Omit<ErpOrderItem, keyof ErpOrderItemUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "orderId",
                  "productId",
                  "binaryFile"
                ])
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpOrderItemLoading
      }
    case ErpType.Product:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpProduct
          return !data.id
            ? Promise.reject()
            : updateErpProduct(
                data.id,
                sampleCompanyId,
                omit<ErpProduct, keyof Omit<ErpProduct, keyof ErpProductUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ])
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpProductLoading
      }
    case ErpType.Supplier:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpSupplier
          return !data.id
            ? Promise.reject()
            : updateErpSupplier(
                data.id,
                sampleCompanyId,
                omit<ErpSupplier, keyof Omit<ErpSupplier, keyof ErpSupplierUpdate>>(entityData, [
                  "type",
                  "id",
                  "sampleCompanyId",
                  "binaryFile"
                ])
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpSupplierLoading
      }
    case ErpType.ComponentProduct:
      return {
        updateErpEntity: (((data: T) => {
          const entityData = (data as unknown) as ErpComponentErpProduct
          return !data.id
            ? Promise.reject()
            : updateErpComponentErpProduct(
                data.id,
                sampleCompanyId,
                omit<ErpComponentErpProduct, keyof Omit<ErpComponentErpProduct, keyof ErpComponentErpProductUpdate>>(
                  entityData,
                  ["type", "componentId", "productId", "sampleCompanyId"]
                )
              )
        }) as unknown) as UpdateHandler<T>,
        isUpdateErpEntityLoading: isUpdateErpComponentErpProductLoading
      }
    default:
      return {
        updateErpEntity: () => Promise.reject(),
        isUpdateErpEntityLoading: false
      }
  }
}
