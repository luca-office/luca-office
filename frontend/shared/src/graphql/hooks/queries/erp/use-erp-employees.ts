import {useQuery} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpEmployee} from "../../../../models"
import {addErpType, removeTypename} from "../../../../utils"
import {GetErpEmployeesQuery, GetErpEmployeesQueryVariables} from "../../../generated/GetErpEmployeesQuery"
import {erpEmployeesQuery} from "../../../queries"

export interface ErpEmployeesProps {
  readonly erpEmployees: ErpEmployee[]
  readonly areErpEmployeesLoading: boolean
}

export const useErpEmployees = (sampleCompanyId: UUID): ErpEmployeesProps => {
  const {data, loading} = useQuery<GetErpEmployeesQuery, GetErpEmployeesQueryVariables>(erpEmployeesQuery, {
    variables: {sampleCompanyId}
  })

  return {
    erpEmployees: data?.erpEmployees.map(removeTypename).map(addErpType(ErpType.Employee)) ?? [],
    areErpEmployeesLoading: loading
  }
}
