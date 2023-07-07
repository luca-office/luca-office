import {useMutation} from "@apollo/client"
import {
  DeleteErpEmployeeMutation,
  DeleteErpEmployeeMutationVariables
} from "../../../generated/DeleteErpEmployeeMutation"
import {deleteErpEmployeeMutation} from "../../../mutations"
import {erpEmployeesQuery} from "../../../queries"

export interface DeleteErpEmployeeProps {
  readonly deleteErpEmployee: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpEmployeeLoading: boolean
}

export const useDeleteErpEmployee = (): DeleteErpEmployeeProps => {
  const [deleteErpEmployee, {loading}] = useMutation<DeleteErpEmployeeMutation, DeleteErpEmployeeMutationVariables>(
    deleteErpEmployeeMutation
  )

  return {
    deleteErpEmployee: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpEmployee({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpEmployeesQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpEmployeeLoading: loading
  }
}
