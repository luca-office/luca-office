import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpComponentsQuery, GetErpComponentsQueryVariables} from "../../../generated/GetErpComponentsQuery"
import {erpComponentsQuery} from "../../../queries"

export interface UseErpComponentsLazyHook {
  readonly erpComponents: ErpComponent[]
  readonly areErpComponentsLoading: boolean
  readonly getErpComponents: () => void
}

export const useErpComponentsLazy = (sampleCompanyId: UUID): UseErpComponentsLazyHook => {
  const [getData, {data, loading}] = useLazyQuery<GetErpComponentsQuery, GetErpComponentsQueryVariables>(
    erpComponentsQuery
  )

  return {
    erpComponents: data?.erpComponents.map(removeTypename).map(addErpType(ErpType.Component)) ?? [],
    areErpComponentsLoading: loading,
    getErpComponents: () =>
      getData({
        variables: {sampleCompanyId}
      })
  }
}
