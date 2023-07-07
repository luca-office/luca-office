import {useLazyQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpEmployee} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpEmployeesQuery, GetErpEmployeesQueryVariables} from "../../../generated/GetErpEmployeesQuery"
import {erpEmployeesQuery} from "../../../queries"

export interface UseErpEmployeesLazyHook {
  readonly erpEmployees: ErpEmployee[]
  readonly areErpEmployeesLoading: boolean
  readonly getErpEmployees: () => void
}

export const useErpEmployeesLazy = (sampleCompanyId: UUID): UseErpEmployeesLazyHook => {
  const [getErpEmployees, {data, loading}] = useLazyQuery<GetErpEmployeesQuery, GetErpEmployeesQueryVariables>(
    erpEmployeesQuery
  )

  return {
    erpEmployees: data?.erpEmployees.map(removeTypename).map(addErpType(ErpType.Employee)) ?? [],
    areErpEmployeesLoading: loading,
    getErpEmployees: () =>
      getErpEmployees({
        variables: {sampleCompanyId}
      })
  }
}
