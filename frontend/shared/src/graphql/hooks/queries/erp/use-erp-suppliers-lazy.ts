import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpSupplier} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpSuppliersQuery, GetErpSuppliersQueryVariables} from "../../../generated/GetErpSuppliersQuery"
import {erpSuppliersQuery} from "../../../queries"

export interface UseErpSuppliersLazyHook {
  readonly erpSuppliers: ErpSupplier[]
  readonly areErpSuppliersLoading: boolean
  readonly getErpSuppliers: () => void
}

export const useErpSuppliersLazy = (sampleCompanyId: UUID): UseErpSuppliersLazyHook => {
  const [getErpSuppliers, {data, loading}] = useLazyQuery<GetErpSuppliersQuery, GetErpSuppliersQueryVariables>(
    erpSuppliersQuery
  )

  return {
    erpSuppliers: data?.erpSuppliers.map(removeTypename).map(addErpType(ErpType.Supplier)) ?? [],
    areErpSuppliersLoading: loading,
    getErpSuppliers: () =>
      getErpSuppliers({
        variables: {sampleCompanyId}
      })
  }
}
