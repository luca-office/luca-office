import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables} from "../../../generated/GetErpOrderItemsQuery"
import {erpOrderItemsQuery} from "../../../queries"

export interface ErpOrderItemsProps {
  readonly erpOrderItems: ErpOrderItem[]
  readonly areErpOrderItemsLoading: boolean
}

export const useErpOrderItems = (sampleCompanyId: UUID): ErpOrderItemsProps => {
  const {data, loading} = useQuery<GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables>(erpOrderItemsQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpOrderItems: data?.erpOrderItems.map(removeTypename).map(addErpType(ErpType.OrderItem)) ?? [],
    areErpOrderItemsLoading: loading
  }
}
