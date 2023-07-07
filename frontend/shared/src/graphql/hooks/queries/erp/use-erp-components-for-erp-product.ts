import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {
  GetErpComponentsForErpProductQuery,
  GetErpComponentsForErpProductQueryVariables
} from "../../../generated/GetErpComponentsForErpProductQuery"
import {erpComponentsForErpProductQuery} from "../../../queries"

export interface ErpComponentsForErpProductProps {
  readonly erpComponentsForErpProduct: ErpComponent[]
  readonly areErpComponentsForErpProductLoading: boolean
}

export const useErpComponentsForErpProduct = (
  productId: number,
  sampleCompanyId: UUID
): ErpComponentsForErpProductProps => {
  const {data, loading} = useQuery<GetErpComponentsForErpProductQuery, GetErpComponentsForErpProductQueryVariables>(
    erpComponentsForErpProductQuery,
    {variables: {productId, sampleCompanyId}}
  )

  return {
    erpComponentsForErpProduct:
      data?.erpComponentsForErpProduct.map(removeTypename).map(addErpType(ErpType.Component)) ?? [],
    areErpComponentsForErpProductLoading: loading
  }
}
