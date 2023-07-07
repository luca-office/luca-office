import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpSupplier} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpSuppliersQuery, GetErpSuppliersQueryVariables} from "../../../generated/GetErpSuppliersQuery"
import {erpSuppliersQuery} from "../../../queries"

export interface ErpSuppliersProps {
  readonly erpSuppliers: ErpSupplier[]
  readonly areErpSuppliersLoading: boolean
}

export const useErpSuppliers = (sampleCompanyId: UUID): ErpSuppliersProps => {
  const {data, loading} = useQuery<GetErpSuppliersQuery, GetErpSuppliersQueryVariables>(erpSuppliersQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpSuppliers: data?.erpSuppliers.map(removeTypename).map(addErpType(ErpType.Supplier)) ?? [],
    areErpSuppliersLoading: loading
  }
}
