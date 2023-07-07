import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {TextDocumentContentInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateTextDocumentContentInterventionMutation,
  UpdateTextDocumentContentInterventionMutationVariables
} from "../../../generated/UpdateTextDocumentContentInterventionMutation"
import {updateTextDocumentContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateTextDocumentContentInterventionProps {
  readonly updateTextDocumentContentIntervention: (
    id: UUID,
    update: TextDocumentContentInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateTextDocumentContentInterventionLoading: boolean
}

export const useUpdateTextDocumentContentIntervention = (
  scenarioId: UUID
): UpdateTextDocumentContentInterventionProps => {
  const [updateTextDocumentContentIntervention, {loading}] = useMutation<
    UpdateTextDocumentContentInterventionMutation,
    UpdateTextDocumentContentInterventionMutationVariables
  >(updateTextDocumentContentInterventionMutation)

  return {
    updateTextDocumentContentIntervention: (id: UUID, update: TextDocumentContentInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateTextDocumentContentIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateTextDocumentContentInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateTextDocumentContentIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateTextDocumentContentIntervention)))
          .catch(reject)
      }),
    updateTextDocumentContentInterventionLoading: loading
  }
}
