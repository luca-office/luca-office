import * as React from "react"
import {ErpType} from "../../../enums"
import {
  useErpComponentsLazy,
  useErpCustomersLazy,
  useErpEmployeesLazy,
  useErpOrdersLazy,
  useErpProductsLazy,
  useErpSuppliersLazy
} from "../../../graphql/hooks/queries"
import {ErpEntity} from "../../../models"

export interface UseErpForeignKeysHook {
  readonly loading: boolean
  readonly foreignKeys: Partial<Record<ErpType, string[]>>
}

export const useErpForeignKeys = (sampleCompanyId: UUID, type: ErpType): UseErpForeignKeysHook => {
  const {getErpSuppliers, areErpSuppliersLoading, erpSuppliers} = useErpSuppliersLazy(sampleCompanyId)
  const {getErpOrders, areErpOrdersLoading, erpOrders} = useErpOrdersLazy(sampleCompanyId)
  const {getErpCustomers, areErpCustomersLoading, erpCustomers} = useErpCustomersLazy(sampleCompanyId)
  const {getErpEmployees, areErpEmployeesLoading, erpEmployees} = useErpEmployeesLazy(sampleCompanyId)
  const {getErpProducts, areErpProductsLoading, erpProducts} = useErpProductsLazy(sampleCompanyId)
  const {getErpComponents, areErpComponentsLoading, erpComponents} = useErpComponentsLazy(sampleCompanyId)

  const foreignKeys = React.useMemo<TypeOf<UseErpForeignKeysHook, "foreignKeys">>(() => {
    switch (type) {
      case ErpType.Invoice:
        return {[ErpType.Order]: toIdList(erpOrders)}
      case ErpType.OrderItem:
        return {[ErpType.Order]: toIdList(erpOrders), [ErpType.Product]: toIdList(erpProducts)}
      case ErpType.Component:
        return {[ErpType.Supplier]: toIdList(erpSuppliers)}
      case ErpType.Order:
        return {[ErpType.Customer]: toIdList(erpCustomers), [ErpType.Employee]: toIdList(erpEmployees)}
      case ErpType.ComponentProduct:
        return {[ErpType.Component]: toIdList(erpComponents), [ErpType.Product]: toIdList(erpProducts)}
      default:
        return {}
    }
  }, [type, erpOrders, erpProducts, erpSuppliers, erpCustomers, erpEmployees, erpComponents])

  React.useEffect(() => {
    if (type === ErpType.Invoice || ErpType.OrderItem) {
      getErpOrders()
    }

    if (type === ErpType.Component) {
      getErpSuppliers()
    }

    if (type === ErpType.Order) {
      getErpCustomers()
      getErpEmployees()
    }

    if (type === ErpType.OrderItem || type === ErpType.ComponentProduct) {
      getErpProducts()
    }

    if (type === ErpType.ComponentProduct) {
      getErpComponents()
    }
  }, [sampleCompanyId, type])

  return {
    loading:
      areErpComponentsLoading ||
      areErpCustomersLoading ||
      areErpEmployeesLoading ||
      areErpOrdersLoading ||
      areErpProductsLoading ||
      areErpSuppliersLoading,
    foreignKeys
  }
}

const toIdList = <T extends ErpEntity>(entities: T[]): string[] => entities.map(entity => `${entity.id}`)
