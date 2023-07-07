import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpEmployee} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpEmployeeMutation,
  CreateErpEmployeeMutationVariables
} from "../../../generated/CreateErpEmployeeMutation"
import {ErpEmployeeCreation} from "../../../generated/globalTypes"
import {createErpEmployeeMutation} from "../../../mutations"
import {erpEmployeesQuery} from "../../../queries"

export interface CreateErpEmployeeProps {
  readonly createErpEmployee: (creation: ErpEmployeeCreation) => Promise<Option<ErpEmployee>>
  readonly isCreateErpEmployeeLoading: boolean
}

export const useCreateErpEmployee = (): CreateErpEmployeeProps => {
  const [createErpEmployee, {loading}] = useMutation<CreateErpEmployeeMutation, CreateErpEmployeeMutationVariables>(
    createErpEmployeeMutation
  )

  return {
    createErpEmployee: (creation: ErpEmployeeCreation) =>
      new Promise<Option<ErpEmployee>>((resolve, reject) => {
        createErpEmployee({
          variables: {creation},
          refetchQueries: [{query: erpEmployeesQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpEmployee
                ? Option.of(addErpType(ErpType.Employee)(removeTypename(result.data.createErpEmployee)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpEmployeeLoading: loading
  }
}
