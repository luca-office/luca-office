import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {FileOpeningInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateFileOpeningInterventionMutation,
  UpdateFileOpeningInterventionMutationVariables
} from "../../../generated/UpdateFileOpeningInterventionMutation"
import {updateFileOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateFileOpeningInterventionProps {
  readonly updateFileOpeningIntervention: (
    id: UUID,
    update: FileOpeningInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateFileOpeningInterventionLoading: boolean
}

export const useUpdateFileOpeningIntervention = (scenarioId: UUID): UpdateFileOpeningInterventionProps => {
  const [updateFileOpeningIntervention, {loading}] = useMutation<
    UpdateFileOpeningInterventionMutation,
    UpdateFileOpeningInterventionMutationVariables
  >(updateFileOpeningInterventionMutation)

  return {
    updateFileOpeningIntervention: (id: UUID, update: FileOpeningInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateFileOpeningIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateFileOpeningInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateFileOpeningIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateFileOpeningIntervention)))
          .catch(reject)
      }),
    updateFileOpeningInterventionLoading: loading
  }
}
