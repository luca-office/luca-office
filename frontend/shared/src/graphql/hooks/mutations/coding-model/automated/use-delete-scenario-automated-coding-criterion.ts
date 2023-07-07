import {useMutation} from "@apollo/client"
import {AutomatedCodingCriterion, DeleteEntityHook} from "../../../../../models"
import {deleteIdEntityFromCache} from "../../../../cache"
import {
  DeleteScenarioCodingAutomatedCriterionMutation,
  DeleteScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/DeleteScenarioCodingAutomatedCriterionMutation"
import {
  ScenarioCodingAutomatedCriteriaQuery,
  ScenarioCodingAutomatedCriteriaQueryVariables
} from "../../../../generated/ScenarioCodingAutomatedCriteriaQuery"
import {deleteScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"
import {automatedCodingCriteriaQuery, codingDimensionsQuery} from "../../../../queries"

export const useDeleteAutomatedCodingCriterion = (itemId: UUID, modelId: UUID): DeleteEntityHook => {
  const [deleteScenarioAutomatedCodingCriterion, {loading: deleteEntityLoading}] = useMutation<
    DeleteScenarioCodingAutomatedCriterionMutation,
    DeleteScenarioCodingAutomatedCriterionMutationVariables
  >(deleteScenarioCodingAutomatedCriterionMutation)

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteScenarioAutomatedCodingCriterion({
        variables: {id},
        update: deleteIdEntityFromCache<
          ScenarioCodingAutomatedCriteriaQuery,
          DeleteScenarioCodingAutomatedCriterionMutation,
          ScenarioCodingAutomatedCriteriaQueryVariables,
          AutomatedCodingCriterion
        >(automatedCodingCriteriaQuery, "scenarioCodingAutomatedCriteria", id, {itemId}),
        refetchQueries: [{query: codingDimensionsQuery, variables: {modelId}}]
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
