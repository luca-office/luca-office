import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpProductsQuery, GetErpProductsQueryVariables} from "../../../generated/GetErpProductsQuery"
import {erpProductsQuery} from "../../../queries"

export interface ErpProductsProps {
  readonly erpProducts: ErpProduct[]
  readonly areErpProductsLoading: boolean
}

export const useErpProducts = (sampleCompanyId: UUID): ErpProductsProps => {
  const {data, loading} = useQuery<GetErpProductsQuery, GetErpProductsQueryVariables>(erpProductsQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpProducts: data?.erpProducts.map(removeTypename).map(addErpType(ErpType.Product)) ?? [],
    areErpProductsLoading: loading
  }
}
