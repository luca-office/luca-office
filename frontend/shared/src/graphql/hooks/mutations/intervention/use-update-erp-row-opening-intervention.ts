import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {ErpRowOpeningInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateErpRowOpeningInterventionMutation,
  UpdateErpRowOpeningInterventionMutationVariables
} from "../../../generated/UpdateErpRowOpeningInterventionMutation"
import {updateErpRowOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateErpRowOpeningInterventionProps {
  readonly updateErpRowOpeningIntervention: (
    id: UUID,
    update: ErpRowOpeningInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateErpRowOpeningInterventionLoading: boolean
}

export const useUpdateErpRowOpeningIntervention = (scenarioId: UUID): UpdateErpRowOpeningInterventionProps => {
  const [updateErpRowOpeningIntervention, {loading}] = useMutation<
    UpdateErpRowOpeningInterventionMutation,
    UpdateErpRowOpeningInterventionMutationVariables
  >(updateErpRowOpeningInterventionMutation)

  return {
    updateErpRowOpeningIntervention: (id: UUID, update: ErpRowOpeningInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateErpRowOpeningIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateErpRowOpeningInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateErpRowOpeningIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateErpRowOpeningIntervention)))
          .catch(reject)
      }),
    updateErpRowOpeningInterventionLoading: loading
  }
}
