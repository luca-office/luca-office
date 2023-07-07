import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpEmployee} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpEmployeeUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpEmployeeMutation,
  UpdateErpEmployeeMutationVariables
} from "../../../generated/UpdateErpEmployeeMutation"
import {updateErpEmployeeMutation} from "../../../mutations"

export interface UpdateErpEmployeeProps {
  readonly updateErpEmployee: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpEmployeeUpdate
  ) => Promise<Option<ErpEmployee>>
  readonly isUpdateErpEmployeeLoading: boolean
}

export const useUpdateErpEmployee = (): UpdateErpEmployeeProps => {
  const [updateErpEmployee, {loading}] = useMutation<UpdateErpEmployeeMutation, UpdateErpEmployeeMutationVariables>(
    updateErpEmployeeMutation
  )

  return {
    updateErpEmployee: (id: number, sampleCompanyId: UUID, update: ErpEmployeeUpdate) =>
      new Promise<Option<ErpEmployee>>((resolve, reject) => {
        updateErpEmployee({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpEmployee
                ? Option.of(addErpType(ErpType.Employee)(removeTypename(result.data.updateErpEmployee)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpEmployeeLoading: loading
  }
}
