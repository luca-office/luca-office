import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpComponentsQuery, GetErpComponentsQueryVariables} from "../../../generated/GetErpComponentsQuery"
import {erpComponentsQuery} from "../../../queries"

export interface ErpComponentsProps {
  readonly erpComponents: ErpComponent[]
  readonly areErpComponentsLoading: boolean
}

export const useErpComponents = (sampleCompanyId: UUID): ErpComponentsProps => {
  const {data, loading} = useQuery<GetErpComponentsQuery, GetErpComponentsQueryVariables>(erpComponentsQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpComponents: data?.erpComponents.map(removeTypename).map(addErpType(ErpType.Component)) ?? [],
    areErpComponentsLoading: loading
  }
}
