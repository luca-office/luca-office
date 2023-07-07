import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables} from "../../../generated/GetErpOrderItemsQuery"
import {erpOrderItemsQuery} from "../../../queries"

export interface UseErpOrderItemsLazyHook {
  readonly erpOrderItems: ErpOrderItem[]
  readonly areErpOrderItemsLoading: boolean
  readonly getErpOrderItems: () => void
}

export const useErpOrderItemsLazy = (sampleCompanyId: UUID): UseErpOrderItemsLazyHook => {
  const [getErpOrderItems, {data, loading}] = useLazyQuery<GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables>(
    erpOrderItemsQuery
  )

  return {
    erpOrderItems: data?.erpOrderItems.map(removeTypename).map(addErpType(ErpType.OrderItem)) ?? [],
    areErpOrderItemsLoading: loading,
    getErpOrderItems: () => getErpOrderItems({variables: {sampleCompanyId}})
  }
}
