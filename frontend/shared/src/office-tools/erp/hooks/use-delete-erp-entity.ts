import {ErpType} from "../../../enums"
import {
  useDeleteErpComponent,
  useDeleteErpComponentErpProduct,
  useDeleteErpCustomer,
  useDeleteErpEmployee,
  useDeleteErpInvoice,
  useDeleteErpOrder,
  useDeleteErpOrderItem,
  useDeleteErpProduct,
  useDeleteErpSupplier
} from "../../../graphql/hooks"
import {ErpComponentErpProduct, ErpEntity} from "../../../models"

export interface UseDeleteErpHook {
  readonly deleteErpEntity: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpEntityLoading: boolean
}

export const useDeleteErpEntity = <T extends ErpEntity>(
  sampleCompanyId: UUID,
  type: ErpType,
  data: T
): UseDeleteErpHook => {
  const {deleteErpComponent, isDeleteErpComponentLoading} = useDeleteErpComponent()
  const {deleteErpCustomer, isDeleteErpCustomerLoading} = useDeleteErpCustomer()
  const {deleteErpEmployee, isDeleteErpEmployeeLoading} = useDeleteErpEmployee()
  const {deleteErpInvoice, isDeleteErpInvoiceLoading} = useDeleteErpInvoice()
  const {deleteErpOrder, isDeleteErpOrderLoading} = useDeleteErpOrder()
  const {deleteErpOrderItem, isDeleteErpOrderItemLoading} = useDeleteErpOrderItem()
  const {deleteErpProduct, isDeleteErpProductLoading} = useDeleteErpProduct()
  const {deleteErpSupplier, isDeleteErpSupplierLoading} = useDeleteErpSupplier()
  const {deleteErpComponentErpProduct, isDeleteErpComponentErpProductLoading} = useDeleteErpComponentErpProduct()

  switch (type) {
    case ErpType.Component:
      return {deleteErpEntity: deleteErpComponent, isDeleteErpEntityLoading: isDeleteErpComponentLoading}
    case ErpType.Customer:
      return {deleteErpEntity: deleteErpCustomer, isDeleteErpEntityLoading: isDeleteErpCustomerLoading}
    case ErpType.Employee:
      return {deleteErpEntity: deleteErpEmployee, isDeleteErpEntityLoading: isDeleteErpEmployeeLoading}
    case ErpType.Invoice:
      return {deleteErpEntity: deleteErpInvoice, isDeleteErpEntityLoading: isDeleteErpInvoiceLoading}
    case ErpType.Order:
      return {deleteErpEntity: deleteErpOrder, isDeleteErpEntityLoading: isDeleteErpOrderLoading}
    case ErpType.OrderItem:
      return {deleteErpEntity: deleteErpOrderItem, isDeleteErpEntityLoading: isDeleteErpOrderItemLoading}
    case ErpType.Product:
      return {deleteErpEntity: deleteErpProduct, isDeleteErpEntityLoading: isDeleteErpProductLoading}
    case ErpType.Supplier:
      return {deleteErpEntity: deleteErpSupplier, isDeleteErpEntityLoading: isDeleteErpSupplierLoading}
    case ErpType.ComponentProduct: {
      const entityData = (data as unknown) as ErpComponentErpProduct
      return {
        deleteErpEntity: () => deleteErpComponentErpProduct(entityData.id, sampleCompanyId),
        isDeleteErpEntityLoading: isDeleteErpComponentErpProductLoading
      }
    }
    default:
      return {deleteErpEntity: () => Promise.reject(), isDeleteErpEntityLoading: false}
  }
}
