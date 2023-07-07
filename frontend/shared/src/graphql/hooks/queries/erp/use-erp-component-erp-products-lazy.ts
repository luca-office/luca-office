import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponentErpProduct} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {
  ErpComponentErpProductsQuery,
  ErpComponentErpProductsQueryVariables
} from "../../../generated/ErpComponentErpProductsQuery"
import {erpComponentErpProductsQuery} from "../../../queries"

export interface ErpComponentErpProductsLazyHook {
  readonly erpComponentErpProducts: ErpComponentErpProduct[]
  readonly areErpComponentErpProductsLoading: boolean
  readonly getErpComponentErpProducts: () => void
}

export const useErpComponentErpProductsLazy = (sampleCompanyId: UUID): ErpComponentErpProductsLazyHook => {
  const [getErpComponentErpProducts, {data, loading}] = useLazyQuery<
    ErpComponentErpProductsQuery,
    ErpComponentErpProductsQueryVariables
  >(erpComponentErpProductsQuery)

  return {
    erpComponentErpProducts:
      data?.erpComponentErpProducts.map(removeTypename).map(addErpType(ErpType.ComponentProduct)) ?? [],
    areErpComponentErpProductsLoading: loading,
    getErpComponentErpProducts: () => getErpComponentErpProducts({variables: {sampleCompanyId}})
  }
}
