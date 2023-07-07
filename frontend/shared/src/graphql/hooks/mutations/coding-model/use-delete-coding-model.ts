import {PureQueryOptions, RefetchQueriesFunction, useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {useErrorHandler} from "../../../../utils"
import {
  DeleteCodingModelMutation,
  DeleteCodingModelMutationVariables
} from "../../../generated/DeleteCodingModelMutation"
import {deleteCodingModelMutation} from "../../../mutations"

export const useDeleteCodingModel = (
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction | undefined
): DeleteEntityHook => {
  const [deleteCodingModel, {loading: deleteEntityLoading}] = useMutation<
    DeleteCodingModelMutation,
    DeleteCodingModelMutationVariables
  >(deleteCodingModelMutation, {
    onError: err => handleError(err.graphQLErrors[0], "coding_models__coding_model_deletion_fk_error")
  })

  const handleError = useErrorHandler()

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteCodingModel({
        variables: {id},
        refetchQueries,
        awaitRefetchQueries: true
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
