import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpProductsQuery, GetErpProductsQueryVariables} from "../../../generated/GetErpProductsQuery"
import {erpProductsQuery} from "../../../queries"

export interface UseErpProductsLazyHook {
  readonly erpProducts: ErpProduct[]
  readonly areErpProductsLoading: boolean
  readonly getErpProducts: () => void
}

export const useErpProductsLazy = (sampleCompanyId: UUID): UseErpProductsLazyHook => {
  const [getErpProducts, {data, loading}] = useLazyQuery<GetErpProductsQuery, GetErpProductsQueryVariables>(
    erpProductsQuery
  )

  return {
    erpProducts: data?.erpProducts.map(removeTypename).map(addErpType(ErpType.Product)) ?? [],
    areErpProductsLoading: loading,
    getErpProducts: () =>
      getErpProducts({
        variables: {sampleCompanyId}
      })
  }
}
