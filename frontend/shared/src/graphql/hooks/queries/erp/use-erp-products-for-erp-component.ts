import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {
  GetErpProductsForErpComponentQuery,
  GetErpProductsForErpComponentQueryVariables
} from "../../../generated/GetErpProductsForErpComponentQuery"
import {erpProductsForErpComponentQuery} from "../../../queries"

export interface ErpProductsForErpComponentProps {
  readonly erpProductsForErpComponent: ErpProduct[]
  readonly areErpProductsForErpComponentLoading: boolean
}

export const useErpProductsForErpComponent = (
  componentId: number,
  sampleCompanyId: UUID
): ErpProductsForErpComponentProps => {
  const {data, loading} = useQuery<GetErpProductsForErpComponentQuery, GetErpProductsForErpComponentQueryVariables>(
    erpProductsForErpComponentQuery,
    {variables: {componentId, sampleCompanyId}}
  )

  return {
    erpProductsForErpComponent:
      data?.erpProductsForErpComponent.map(removeTypename).map(addErpType(ErpType.Product)) ?? [],
    areErpProductsForErpComponentLoading: loading
  }
}
