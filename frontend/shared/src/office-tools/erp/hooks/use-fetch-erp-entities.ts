import {useApolloClient} from "@apollo/client"
import {FetchPolicy} from "@apollo/client/core/watchQueryOptions"
import * as React from "react"
import {ErpType} from "../../../enums"
import {
  ErpComponentErpProductsQuery,
  ErpComponentErpProductsQueryVariables
} from "../../../graphql/generated/ErpComponentErpProductsQuery"
import {GetErpComponentsQuery, GetErpComponentsQueryVariables} from "../../../graphql/generated/GetErpComponentsQuery"
import {GetErpCustomersQuery, GetErpCustomersQueryVariables} from "../../../graphql/generated/GetErpCustomersQuery"
import {GetErpEmployeesQuery, GetErpEmployeesQueryVariables} from "../../../graphql/generated/GetErpEmployeesQuery"
import {GetErpInvoicesQuery, GetErpInvoicesQueryVariables} from "../../../graphql/generated/GetErpInvoicesQuery"
import {GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables} from "../../../graphql/generated/GetErpOrderItemsQuery"
import {GetErpOrdersQuery, GetErpOrdersQueryVariables} from "../../../graphql/generated/GetErpOrdersQuery"
import {GetErpProductsQuery, GetErpProductsQueryVariables} from "../../../graphql/generated/GetErpProductsQuery"
import {GetErpSuppliersQuery, GetErpSuppliersQueryVariables} from "../../../graphql/generated/GetErpSuppliersQuery"
import {
  erpComponentErpProductsQuery,
  erpComponentsQuery,
  erpCustomersQuery,
  erpEmployeesQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery
} from "../../../graphql/queries"
import {ErpEntityByType} from "../../../models"
import {addErpType, removeTypename} from "../../../utils"

export interface UseFetchErpEntitiesHook {
  readonly fetchErpEntities: (erpType: ErpType) => Promise<ErpEntityByType<ErpType>[]>
  readonly refetchAllErpEntities: () => Promise<void>
  readonly isLoading: boolean
}

export const useFetchErpEntities = (sampleCompanyId: UUID): UseFetchErpEntitiesHook => {
  const [isFetchingErpEntities, setIsFetchingErpEntities] = React.useState<boolean>(false)
  const [isRefetchingErpEntities, setIsRefetchingErpEntities] = React.useState<boolean>(false)

  const client = useApolloClient()

  const fetchErpEntities = (
    erpType: ErpType,
    fetchPolicy?: FetchPolicy
  ): Promise<ErpEntityByType<typeof erpType>[]> => {
    setIsFetchingErpEntities(true)
    switch (erpType) {
      case ErpType.Component: {
        return client
          .query<GetErpComponentsQuery, GetErpComponentsQueryVariables>({
            query: erpComponentsQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpComponents.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Customer: {
        return client
          .query<GetErpCustomersQuery, GetErpCustomersQueryVariables>({
            query: erpCustomersQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpCustomers.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Employee: {
        return client
          .query<GetErpEmployeesQuery, GetErpEmployeesQueryVariables>({
            query: erpEmployeesQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpEmployees.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Invoice: {
        return client
          .query<GetErpInvoicesQuery, GetErpInvoicesQueryVariables>({
            query: erpInvoicesQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpInvoices.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Order: {
        return client
          .query<GetErpOrdersQuery, GetErpOrdersQueryVariables>({
            query: erpOrdersQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpOrders.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.OrderItem: {
        return client
          .query<GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables>({
            query: erpOrderItemsQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpOrderItems.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Product: {
        return client
          .query<GetErpProductsQuery, GetErpProductsQueryVariables>({
            query: erpProductsQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpProducts.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.Supplier: {
        return client
          .query<GetErpSuppliersQuery, GetErpSuppliersQueryVariables>({
            query: erpSuppliersQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpSuppliers.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      }
      case ErpType.ComponentProduct:
        return client
          .query<ErpComponentErpProductsQuery, ErpComponentErpProductsQueryVariables>({
            query: erpComponentErpProductsQuery,
            variables: {sampleCompanyId},
            fetchPolicy
          })
          .then(result => {
            setIsFetchingErpEntities(false)
            return result.data?.erpComponentErpProducts.map(removeTypename).map(addErpType(erpType)) ?? []
          })
          .catch(error => {
            setIsFetchingErpEntities(false)
            return error
          })
      default:
        return Promise.reject()
    }
  }

  const erpTypes = Object.values(ErpType).map(erpType => erpType as ErpType)
  const refetchAllErpEntities = () => {
    setIsRefetchingErpEntities(true)
    return Promise.all(erpTypes.map(erpType => fetchErpEntities(erpType, "network-only")))
      .then(() => {
        setIsRefetchingErpEntities(false)
      })
      .catch(error => {
        setIsRefetchingErpEntities(false)
        return error
      })
  }

  return {
    fetchErpEntities,
    refetchAllErpEntities,
    isLoading: isFetchingErpEntities || isRefetchingErpEntities
  }
}
