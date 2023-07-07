import * as React from "react"
import {ErpType} from "../../../enums"
import {
  useErpComponentErpProductsLazy,
  useErpComponentsLazy,
  useErpInvoicesLazy,
  useErpOrderItemsLazy,
  useErpOrdersLazy
} from "../../../graphql/hooks"
import {ErpComponentErpProduct, ErpEntity} from "../../../models"

export interface UseErpReferencingPrimaryKeysHook {
  readonly loading: boolean
  readonly primaryKeys: Partial<Record<ErpType, Record<string, number[]>>>
}

export const useErpReferencingPrimaryKeys = (
  sampleCompanyId: UUID,
  type: ErpType,
  id?: number
): UseErpReferencingPrimaryKeysHook => {
  const {getErpOrders, areErpOrdersLoading, erpOrders} = useErpOrdersLazy(sampleCompanyId)
  const {getErpInvoices, areErpInvoicesLoading, erpInvoices} = useErpInvoicesLazy(sampleCompanyId)
  const {getErpOrderItems, areErpOrderItemsLoading, erpOrderItems} = useErpOrderItemsLazy(sampleCompanyId)
  const {getErpComponents, areErpComponentsLoading, erpComponents} = useErpComponentsLazy(sampleCompanyId)
  const {
    getErpComponentErpProducts,
    areErpComponentErpProductsLoading,
    erpComponentErpProducts
  } = useErpComponentErpProductsLazy(sampleCompanyId)

  const primaryKeys = React.useMemo<TypeOf<UseErpReferencingPrimaryKeysHook, "primaryKeys">>(() => {
    switch (type) {
      case ErpType.Component:
        return {
          [ErpType.ComponentProduct]: erpComponentErpProductsToRecord(
            erpComponentErpProducts,
            erpComponentErpProduct => erpComponentErpProduct.componentId === id
          )
        }
      case ErpType.Customer:
        return {[ErpType.Order]: toRecord(erpOrders, order => order.customerId === id)}
      case ErpType.Order:
        return {
          [ErpType.Invoice]: toRecord(erpInvoices, invoice => invoice.orderId === id),
          [ErpType.OrderItem]: toRecord(erpOrderItems, orderItem => orderItem.orderId === id)
        }
      case ErpType.Product:
        return {
          [ErpType.OrderItem]: toRecord(erpOrderItems, orderItem => orderItem.productId === id),
          [ErpType.ComponentProduct]: erpComponentErpProductsToRecord(
            erpComponentErpProducts,
            erpComponentErpProduct => erpComponentErpProduct.productId === id
          )
        }
      case ErpType.Supplier:
        return {[ErpType.Component]: toRecord(erpComponents, component => component.supplierId === id)}
      default:
        return {}
    }
  }, [type, erpOrders, erpOrderItems, erpInvoices, erpComponents, erpComponentErpProducts])

  React.useEffect(() => {
    if (type === ErpType.Component || type === ErpType.Product) {
      getErpComponentErpProducts()
    }

    if (type === ErpType.Customer || type === ErpType.Employee) {
      getErpOrders()
    }

    if (type === ErpType.Order || type === ErpType.Product) {
      getErpOrderItems()
    }

    if (type === ErpType.Order) {
      getErpInvoices()
    }

    if (type === ErpType.Supplier) {
      getErpComponents()
    }
  }, [sampleCompanyId, type])

  return {
    loading:
      areErpComponentErpProductsLoading ||
      areErpComponentsLoading ||
      areErpInvoicesLoading ||
      areErpOrderItemsLoading ||
      areErpOrdersLoading,
    primaryKeys
  }
}

const toRecord = <T extends ErpEntity>(entities: T[], selector: (entity: T) => boolean): Record<string, number[]> =>
  entities
    .filter(selector)
    .reduce((accumulator, entity) => ({id: [...accumulator.id, entity.id ?? -1]}), {id: [] as number[]})

const erpComponentErpProductsToRecord = (
  entities: ErpComponentErpProduct[],
  selector: (entity: ErpComponentErpProduct) => boolean
): Record<string, number[]> =>
  entities.filter(selector).reduce(
    (accumulator, entity) => ({
      componentId: [...accumulator.componentId, entity.componentId],
      productId: [...accumulator.productId, entity.productId]
    }),
    {componentId: [] as number[], productId: [] as number[]}
  )
