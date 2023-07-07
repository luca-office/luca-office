import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponentErpProduct} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {
  ErpComponentErpProductsQuery,
  ErpComponentErpProductsQueryVariables
} from "../../../generated/ErpComponentErpProductsQuery"
import {erpComponentErpProductsQuery} from "../../../queries"

export interface ErpComponentErpProductsHook {
  readonly erpComponentErpProducts: ErpComponentErpProduct[]
  readonly areErpComponentErpProductsLoading: boolean
}

export const useErpComponentErpProducts = (sampleCompanyId: UUID): ErpComponentErpProductsHook => {
  const {data, loading} = useQuery<ErpComponentErpProductsQuery, ErpComponentErpProductsQueryVariables>(
    erpComponentErpProductsQuery,
    {
      variables: {sampleCompanyId}
    }
  )

  return {
    erpComponentErpProducts:
      data?.erpComponentErpProducts.map(removeTypename).map(addErpType(ErpType.ComponentProduct)) ?? [],
    areErpComponentErpProductsLoading: loading
  }
}
