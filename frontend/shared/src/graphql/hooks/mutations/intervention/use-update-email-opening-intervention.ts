import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {EmailOpeningInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateEmailOpeningInterventionMutation,
  UpdateEmailOpeningInterventionMutationVariables
} from "../../../generated/UpdateEmailOpeningInterventionMutation"
import {updateEmailOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateEmailOpeningInterventionProps {
  readonly updateEmailOpeningIntervention: (
    id: UUID,
    update: EmailOpeningInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateEmailOpeningInterventionLoading: boolean
}

export const useUpdateEmailOpeningIntervention = (scenarioId: UUID): UpdateEmailOpeningInterventionProps => {
  const [updateEmailOpeningIntervention, {loading}] = useMutation<
    UpdateEmailOpeningInterventionMutation,
    UpdateEmailOpeningInterventionMutationVariables
  >(updateEmailOpeningInterventionMutation)

  return {
    updateEmailOpeningIntervention: (id: UUID, update: EmailOpeningInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateEmailOpeningIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateEmailOpeningInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateEmailOpeningIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateEmailOpeningIntervention)))
          .catch(reject)
      }),
    updateEmailOpeningInterventionLoading: loading
  }
}
