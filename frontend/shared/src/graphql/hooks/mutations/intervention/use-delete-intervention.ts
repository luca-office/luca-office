import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache/updates"
import {
  DeleteInterventionMutation,
  DeleteInterventionMutationVariables
} from "../../../generated/DeleteInterventionMutation"
import {InterventionFragment} from "../../../generated/InterventionFragment"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {deleteInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export const useDeleteIntervention = (scenarioId: UUID): DeleteEntityHook => {
  const [deleteIntervention, {loading}] = useMutation<DeleteInterventionMutation, DeleteInterventionMutationVariables>(
    deleteInterventionMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteIntervention({
          variables: {id},
          update: deleteIdEntityFromCache<
            InterventionsQuery,
            DeleteInterventionMutation,
            InterventionsQueryVariables,
            InterventionFragment
          >(interventionsQuery, "interventions", id, {scenarioId})
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
