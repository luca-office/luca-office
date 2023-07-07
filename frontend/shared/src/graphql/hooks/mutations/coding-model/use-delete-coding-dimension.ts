import {useMutation} from "@apollo/client"
import {CodingDimension, DeleteEntityHook} from "../../../../models"
import {useErrorHandler} from "../../../../utils"
import {deleteIdEntityFromCache} from "../../../cache"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "../../../generated/CodingDimensionsQuery"
import {
  DeleteCodingDimensionMutation,
  DeleteCodingDimensionMutationVariables
} from "../../../generated/DeleteCodingDimensionMutation"
import {deleteCodingDimensionMutation} from "../../../mutations"
import {codingDimensionsQuery, scenarioQuery} from "../../../queries"

export const useDeleteCodingDimension = (modelId: UUID, scenarioId: UUID): DeleteEntityHook => {
  const [deleteCodingDimension, {loading: deleteEntityLoading}] = useMutation<
    DeleteCodingDimensionMutation,
    DeleteCodingDimensionMutationVariables
  >(deleteCodingDimensionMutation, {
    onError: err => handleError(err.graphQLErrors[0], "coding_models__coding_dimension_deletion_fk_error")
  })

  const handleError = useErrorHandler()

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteCodingDimension({
        variables: {id},
        update: deleteIdEntityFromCache<
          CodingDimensionsQuery,
          DeleteCodingDimensionMutation,
          CodingDimensionsQueryVariables,
          CodingDimension
        >(codingDimensionsQuery, "codingDimensions", id, {modelId}),
        refetchQueries: [
          {
            query: scenarioQuery,
            variables: {
              id: scenarioId
            }
          }
        ]
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
