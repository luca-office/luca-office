import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrder} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpOrdersQuery, GetErpOrdersQueryVariables} from "../../../generated/GetErpOrdersQuery"
import {erpOrdersQuery} from "../../../queries"

export interface UseErpOrdersLazyHook {
  readonly erpOrders: ErpOrder[]
  readonly areErpOrdersLoading: boolean
  readonly getErpOrders: () => void
}

export const useErpOrdersLazy = (sampleCompanyId: UUID): UseErpOrdersLazyHook => {
  const [getErpOrders, {data, loading}] = useLazyQuery<GetErpOrdersQuery, GetErpOrdersQueryVariables>(erpOrdersQuery)

  return {
    erpOrders: data?.erpOrders.map(removeTypename).map(addErpType(ErpType.Order)) ?? [],
    areErpOrdersLoading: loading,
    getErpOrders: () =>
      getErpOrders({
        variables: {sampleCompanyId}
      })
  }
}
