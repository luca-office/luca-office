import {ErpType} from "../../../enums"
import {
  useErpComponentErpProductsLazy,
  useErpComponentsLazy,
  useErpCustomersLazy,
  useErpEmployeesLazy,
  useErpInvoicesLazy,
  useErpOrderItemsLazy,
  useErpOrdersLazy,
  useErpProductsLazy,
  useErpSuppliersLazy
} from "../../../graphql/hooks"
import {ErpEntity, ErpKeyEntity, ErpStackEntity} from "../../../models"
import {isEmpty} from "../../../utils"
import {getForeignKeysForEntity} from "../config/data/keys"
import {toErpStackEntity} from "../utils"
import {useFetchErpEntities} from "./use-fetch-erp-entities"

export const useErpEntity = (sampleCompanyId: UUID) => {
  const {erpComponents, getErpComponents, areErpComponentsLoading} = useErpComponentsLazy(sampleCompanyId)
  const {erpCustomers, getErpCustomers, areErpCustomersLoading} = useErpCustomersLazy(sampleCompanyId)
  const {erpEmployees, getErpEmployees, areErpEmployeesLoading} = useErpEmployeesLazy(sampleCompanyId)
  const {erpInvoices, getErpInvoices, areErpInvoicesLoading} = useErpInvoicesLazy(sampleCompanyId)
  const {erpOrders, getErpOrders, areErpOrdersLoading} = useErpOrdersLazy(sampleCompanyId)
  const {erpOrderItems, getErpOrderItems, areErpOrderItemsLoading} = useErpOrderItemsLazy(sampleCompanyId)
  const {erpProducts, getErpProducts, areErpProductsLoading} = useErpProductsLazy(sampleCompanyId)
  const {erpSuppliers, getErpSuppliers, areErpSuppliersLoading} = useErpSuppliersLazy(sampleCompanyId)
  const {
    erpComponentErpProducts,
    getErpComponentErpProducts,
    areErpComponentErpProductsLoading
  } = useErpComponentErpProductsLazy(sampleCompanyId)

  const {fetchErpEntities, isLoading: isFetchErpEntitiesLoading} = useFetchErpEntities(sampleCompanyId)

  const getEntities = (erpType: ErpType) => {
    switch (erpType) {
      case ErpType.Component:
        getErpComponents()
        break
      case ErpType.Customer:
        getErpCustomers()
        break
      case ErpType.Employee:
        getErpEmployees()
        break
      case ErpType.Invoice:
        getErpInvoices()
        break
      case ErpType.Order:
        getErpOrders()
        break
      case ErpType.OrderItem:
        getErpOrderItems()
        break
      case ErpType.Product:
        getErpProducts()
        break
      case ErpType.Supplier:
        getErpSuppliers()
        break
      case ErpType.ComponentProduct:
        getErpComponentErpProducts()
        break
    }
  }

  const getEntity = (erpType: ErpType, ids: number[], sourceErpEntity: ErpEntity): Promise<ErpStackEntity> => {
    const findStackEntity = (entities: ErpEntity[], foreignKeys: Array<ErpKeyEntity<ErpType>>) => {
      let entity: ErpEntity | undefined
      let entityIndex = -1

      entities.some((e, index) => {
        if (ids.length === 1 && e.id === ids[0]) {
          entity = e
          entityIndex = index
          return true
        } else if (ids.length === 2) {
          // combined primary key
          if (e.type === ErpType.ComponentProduct && ids.includes(e.componentId) && ids.includes(e.productId)) {
            entity = e
            entityIndex = index
            return true
          }
        }
        return false
      })

      return entity ? Promise.resolve(toErpStackEntity(entity, foreignKeys, entityIndex)) : Promise.reject()
    }

    const foreignKeys = getForeignKeysForEntity(sourceErpEntity)

    switch (erpType) {
      case ErpType.Component: {
        return isEmpty(erpComponents)
          ? fetchErpEntities(ErpType.Component).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpComponents, foreignKeys)
      }
      case ErpType.Customer: {
        return isEmpty(erpCustomers)
          ? fetchErpEntities(ErpType.Customer).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpCustomers, foreignKeys)
      }
      case ErpType.Employee: {
        return isEmpty(erpEmployees)
          ? fetchErpEntities(ErpType.Employee).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpEmployees, foreignKeys)
      }
      case ErpType.Invoice: {
        return isEmpty(erpInvoices)
          ? fetchErpEntities(ErpType.Invoice).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpInvoices, foreignKeys)
      }
      case ErpType.Order: {
        return isEmpty(erpOrders)
          ? fetchErpEntities(ErpType.Order).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpOrders, foreignKeys)
      }
      case ErpType.OrderItem: {
        return isEmpty(erpOrderItems)
          ? fetchErpEntities(ErpType.OrderItem).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpOrderItems, foreignKeys)
      }
      case ErpType.Product: {
        return isEmpty(erpProducts)
          ? fetchErpEntities(ErpType.Product).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpProducts, foreignKeys)
      }
      case ErpType.Supplier: {
        return isEmpty(erpSuppliers)
          ? fetchErpEntities(ErpType.Supplier).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpSuppliers, foreignKeys)
      }
      case ErpType.ComponentProduct: {
        return isEmpty(erpComponentErpProducts)
          ? fetchErpEntities(ErpType.ComponentProduct).then(result => findStackEntity(result, foreignKeys))
          : findStackEntity(erpComponentErpProducts, foreignKeys)
      }
      default:
        return Promise.reject()
    }
  }

  return {
    components: erpComponents,
    customers: erpCustomers,
    employees: erpEmployees,
    invoices: erpInvoices,
    orders: erpOrders,
    orderItems: erpOrderItems,
    products: erpProducts,
    suppliers: erpSuppliers,
    componentProducts: erpComponentErpProducts,
    getEntities,
    getEntity,
    isLoading:
      areErpComponentsLoading ||
      areErpCustomersLoading ||
      areErpEmployeesLoading ||
      areErpInvoicesLoading ||
      areErpOrdersLoading ||
      areErpOrderItemsLoading ||
      areErpProductsLoading ||
      areErpSuppliersLoading ||
      areErpComponentErpProductsLoading ||
      isFetchErpEntitiesLoading
  }
}
