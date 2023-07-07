import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {SpreadsheetCellContentInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateSpreadsheetCellContentInterventionMutation,
  UpdateSpreadsheetCellContentInterventionMutationVariables
} from "../../../generated/UpdateSpreadsheetCellContentInterventionMutation"
import {updateSpreadsheetCellContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateSpreadsheetCellContentInterventionProps {
  readonly updateSpreadsheetCellContentIntervention: (
    id: UUID,
    update: SpreadsheetCellContentInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateSpreadsheetCellContentInterventionLoading: boolean
}

export const useUpdateSpreadsheetCellContentIntervention = (
  scenarioId: UUID
): UpdateSpreadsheetCellContentInterventionProps => {
  const [updateSpreadsheetCellContentIntervention, {loading}] = useMutation<
    UpdateSpreadsheetCellContentInterventionMutation,
    UpdateSpreadsheetCellContentInterventionMutationVariables
  >(updateSpreadsheetCellContentInterventionMutation)

  return {
    updateSpreadsheetCellContentIntervention: (id: UUID, update: SpreadsheetCellContentInterventionUpdate) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateSpreadsheetCellContentIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateSpreadsheetCellContentInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateSpreadsheetCellContentIntervention", {
            scenarioId
          })
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.updateSpreadsheetCellContentIntervention)))
          .catch(reject)
      }),
    updateSpreadsheetCellContentInterventionLoading: loading
  }
}
