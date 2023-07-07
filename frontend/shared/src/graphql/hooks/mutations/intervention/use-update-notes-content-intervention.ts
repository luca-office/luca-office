import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {NotesContentInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateNotesContentInterventionMutation,
  UpdateNotesContentInterventionMutationVariables
} from "../../../generated/UpdateNotesContentInterventionMutation"
import {updateNotesContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateNotesContentInterventionProps {
  readonly updateNotesContentIntervention: (
    id: UUID,
    update: NotesContentInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateNotesContentInterventionLoading: boolean
}

export const useUpdateNotesContentIntervention = (scenarioId: UUID): UpdateNotesContentInterventionProps => {
  const [updateNotesContentIntervention, {loading}] = useMutation<
    UpdateNotesContentInterventionMutation,
    UpdateNotesContentInterventionMutationVariables
  >(updateNotesContentInterventionMutation)

  return {
    updateNotesContentIntervention: (id: UUID, update: NotesContentInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateNotesContentIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateNotesContentInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateNotesContentIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateNotesContentIntervention)))
          .catch(reject)
      }),
    updateNotesContentInterventionLoading: loading
  }
}
