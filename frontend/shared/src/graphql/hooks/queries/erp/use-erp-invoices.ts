import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpInvoice} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpInvoicesQuery, GetErpInvoicesQueryVariables} from "../../../generated/GetErpInvoicesQuery"
import {erpInvoicesQuery} from "../../../queries"

export interface ErpInvoicesProps {
  readonly erpInvoices: ErpInvoice[]
  readonly areErpInvoicesLoading: boolean
}

export const useErpInvoices = (sampleCompanyId: UUID): ErpInvoicesProps => {
  const {data, loading} = useQuery<GetErpInvoicesQuery, GetErpInvoicesQueryVariables>(erpInvoicesQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpInvoices: data?.erpInvoices.map(removeTypename).map(addErpType(ErpType.Invoice)) ?? [],
    areErpInvoicesLoading: loading
  }
}
