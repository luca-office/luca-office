import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrder} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpOrdersQuery, GetErpOrdersQueryVariables} from "../../../generated/GetErpOrdersQuery"
import {erpOrdersQuery} from "../../../queries"

export interface ErpOrdersProps {
  readonly erpOrders: ErpOrder[]
  readonly areErpOrdersLoading: boolean
}

export const useErpOrders = (sampleCompanyId: UUID): ErpOrdersProps => {
  const {data, loading} = useQuery<GetErpOrdersQuery, GetErpOrdersQueryVariables>(erpOrdersQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpOrders: data?.erpOrders.map(removeTypename).map(addErpType(ErpType.Order)) ?? [],
    areErpOrdersLoading: loading
  }
}
