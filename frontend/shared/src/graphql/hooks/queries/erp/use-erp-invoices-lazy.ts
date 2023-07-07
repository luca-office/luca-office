import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpInvoice} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpInvoicesQuery, GetErpInvoicesQueryVariables} from "../../../generated/GetErpInvoicesQuery"
import {erpInvoicesQuery} from "../../../queries"

export interface UseErpInvoicesLazyHook {
  readonly erpInvoices: ErpInvoice[]
  readonly areErpInvoicesLoading: boolean
  readonly getErpInvoices: () => void
}

export const useErpInvoicesLazy = (sampleCompanyId: UUID): UseErpInvoicesLazyHook => {
  const [getData, {data, loading}] = useLazyQuery<GetErpInvoicesQuery, GetErpInvoicesQueryVariables>(erpInvoicesQuery)

  return {
    erpInvoices: data?.erpInvoices.map(removeTypename).map(addErpType(ErpType.Invoice)) ?? [],
    areErpInvoicesLoading: loading,
    getErpInvoices: () =>
      getData({
        variables: {sampleCompanyId}
      })
  }
}
