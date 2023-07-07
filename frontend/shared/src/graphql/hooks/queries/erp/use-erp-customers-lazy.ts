import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpCustomer} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpCustomersQuery, GetErpCustomersQueryVariables} from "../../../generated/GetErpCustomersQuery"
import {erpCustomersQuery} from "../../../queries"

export interface UseErpCustomersLazyHook {
  readonly erpCustomers: ErpCustomer[]
  readonly areErpCustomersLoading: boolean
  readonly getErpCustomers: () => void
}

export const useErpCustomersLazy = (sampleCompanyId: UUID): UseErpCustomersLazyHook => {
  const [getData, {data, loading}] = useLazyQuery<GetErpCustomersQuery, GetErpCustomersQueryVariables>(
    erpCustomersQuery
  )

  return {
    erpCustomers: data?.erpCustomers.map(removeTypename).map(addErpType(ErpType.Customer)) ?? [],
    areErpCustomersLoading: loading,
    getErpCustomers: () =>
      getData({
        variables: {sampleCompanyId}
      })
  }
}
