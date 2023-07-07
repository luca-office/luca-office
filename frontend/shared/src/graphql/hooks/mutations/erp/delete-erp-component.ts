import {useMutation} from "@apollo/client"
import {
  DeleteErpComponentMutation,
  DeleteErpComponentMutationVariables
} from "../../../generated/DeleteErpComponentMutation"
import {deleteErpComponentMutation} from "../../../mutations"
import {erpComponentsQuery} from "../../../queries"

export interface DeleteErpComponentProps {
  readonly deleteErpComponent: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpComponentLoading: boolean
}

export const useDeleteErpComponent = (): DeleteErpComponentProps => {
  const [deleteErpComponent, {loading}] = useMutation<DeleteErpComponentMutation, DeleteErpComponentMutationVariables>(
    deleteErpComponentMutation
  )

  return {
    deleteErpComponent: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpComponent({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpComponentsQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpComponentLoading: loading
  }
}
