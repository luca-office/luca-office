import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpCustomer} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpCustomersQuery, GetErpCustomersQueryVariables} from "../../../generated/GetErpCustomersQuery"
import {erpCustomersQuery} from "../../../queries"

export interface ErpCustomersProps {
  readonly erpCustomers: ErpCustomer[]
  readonly areErpCustomersLoading: boolean
}

export const useErpCustomers = (sampleCompanyId: UUID): ErpCustomersProps => {
  const {data, loading} = useQuery<GetErpCustomersQuery, GetErpCustomersQueryVariables>(erpCustomersQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpCustomers: data?.erpCustomers.map(removeTypename).map(addErpType(ErpType.Customer)) ?? [],
    areErpCustomersLoading: loading
  }
}
